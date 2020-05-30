import { Players, RunService } from "@rbxts/services";
import { ISignal } from "../Interfaces/ISignal";
import { ISignalConnection } from "../Interfaces/ISignalConnection";
import { AnyArgs } from "../types";

class SignalConnection implements ISignalConnection {
	private readonly disconnectCallback: () => void;

	public Connected = true;

	constructor(disconnectCallback: () => void) {
		this.disconnectCallback = disconnectCallback;
	}

	public Disconnect(): void {
		if (!this.Connected) {
			return;
		}

		this.disconnectCallback();
		this.Connected = false;
	}
}

export class Signal<T extends AnyArgs = () => void> implements ISignal<T> {
	private connections = new Array<SignalConnection>();
	private connectionsHandlersMap = new Map<SignalConnection, (...args: FunctionArguments<T>) => void>();

	private lastFiredTick = 0;
	private lastFiredArgs?: FunctionArguments<T>;

	private isDestroyed = false;

	public Connect(onFiredCallback: (...args: FunctionArguments<T>) => void): SignalConnection {
		if (this.isDestroyed) {
			throw `Attempt to connect to a destroyed signal`;
		}

		const connection = new SignalConnection(() => {
			if (!this.connectionsHandlersMap.has(connection)) {
				return;
			}

			this.connectionsHandlersMap.delete(connection);

			for (let i = 0; i < this.connections.size(); i++) {
				if (this.connections[i] === connection) {
					this.connections.remove(i);
				}
			}
		});

		this.connectionsHandlersMap.set(connection, onFiredCallback);
		this.connections.push(connection);

		return connection;
	}

	public disconnectAll() {
		if (this.isDestroyed) {
			throw `Attempt to disconnect connections to a destroyed signal`;
		}

		// Clear the handlers mapping first so that we don't get an O(n^2) runtime complexity (see disconnect callback)
		this.connectionsHandlersMap.clear();

		for (let i = 0; i < this.connections.size(); i++) {
			this.connections[i].Disconnect();
		}

		this.connections = new Array<SignalConnection>();
	}

	public destroy() {
		if (this.isDestroyed) {
			return;
		}

		this.disconnectAll();
		this.isDestroyed = true;
	}

	public fire(...args: FunctionArguments<T>) {
		if (this.isDestroyed) {
			throw `Attempt to fire a destroyed signal`;
		}

		this.lastFiredArgs = args;
		this.lastFiredTick = tick();

		for (let i = 0; i < this.connections.size(); i++) {
			const handlerFunction = this.connectionsHandlersMap.get(this.connections[i]);
			if (handlerFunction !== undefined) {
				coroutine.wrap(handlerFunction)(...args);
			}
		}
	}

	public Wait(): LuaTuple<FunctionArguments<T>> {
		if (this.isDestroyed) {
			throw `Attempt to for a destroyed signal`;
		}

		const lastFiredTickAtStart = this.lastFiredTick;

		while (this.lastFiredTick === lastFiredTickAtStart) {
			RunService.Heartbeat.Wait();
		}

		// eslint-disable-next-line
		return this.lastFiredArgs! as unknown as LuaTuple<FunctionArguments<T>>;
	}
}
