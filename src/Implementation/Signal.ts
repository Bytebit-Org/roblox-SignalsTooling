import { Players, RunService } from "@rbxts/services";
import { ISignal } from "../Interfaces/ISignal";
import { ISignalConnection } from "../Interfaces/ISignalConnection";
import { AnyArgs } from "../types";

class SignalConnection implements ISignalConnection {
	private readonly _disconnectCallback: () => void;

	public Connected = false;

	constructor(disconnectCallback: () => void) {
		this._disconnectCallback = disconnectCallback;
	}

	public Disconnect(): void {
		if (!this.Connected) {
			return;
		}

		this._disconnectCallback();
		this.Connected = false;
	}
}

export class Signal<T extends AnyArgs = () => void> implements ISignal<T> {
	private _connections = new Array<SignalConnection>();
	private _connectionsHandlersMap = new Map<SignalConnection, (...args: FunctionArguments<T>) => void>();

	private _lastFiredTick = 0;
	private _lastFiredArgs?: FunctionArguments<T>;

	public Connect(onFiredCallback: (...args: FunctionArguments<T>) => void): SignalConnection {
		const connection = new SignalConnection(() => {
			if (!this._connectionsHandlersMap.has(connection)) {
				return;
			}

			this._connectionsHandlersMap.delete(connection);

			for (let i = 0; i < this._connections.size(); i++) {
				if (this._connections[i] === connection) {
					this._connections.remove(i);
					break;
				}
				Players.PlayerAdded.Connect;
			}
		});

		this._connectionsHandlersMap.set(connection, onFiredCallback);
		this._connections.push(connection);

		return connection;
	}

	public DisconnectAll() {
		// Clear the handlers mapping first so that we don't get an O(n^2) runtime complexity (see disconnect callback)
		this._connectionsHandlersMap.clear();

		for (let i = 0; i < this._connections.size(); i++) {
			this._connections[i].Disconnect();
		}

		this._connections = new Array<SignalConnection>();
	}

	public Fire(...args: FunctionArguments<T>) {
		this._lastFiredArgs = args;
		this._lastFiredTick = tick();

		for (let i = 0; i < this._connections.size(); i++) {
			const handlerFunction = this._connectionsHandlersMap.get(this._connections[i]);
			if (handlerFunction !== undefined) {
				coroutine.wrap(handlerFunction)(...args);
			}
		}
	}

	public Wait(): LuaTuple<FunctionArguments<T>> {
		const lastFiredTickAtStart = this._lastFiredTick;

		while (this._lastFiredTick === lastFiredTickAtStart) {
			RunService.Heartbeat.Wait();
		}

		// eslint-disable-next-line
		return this._lastFiredArgs! as LuaTuple<FunctionArguments<T>>;
	}
}
