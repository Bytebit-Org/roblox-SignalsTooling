import { RunService, Players } from "@rbxts/services";
import ISignalConnection = require("../Interfaces/ISignalConnection");
import ISignal = require("../Interfaces/ISignal");

/** @inheritdoc */
class SignalConnection implements ISignalConnection {
    private readonly _disconnectCallback: () => void;
    
    /** @inheritdoc */
    public Connected = false;

    constructor(disconnectCallback: () => void) {
        this._disconnectCallback = disconnectCallback;
    }
    
    /** @inheritdoc */
    public Disconnect(): void {
        if (!this.Connected) {
            return;
        }

        this._disconnectCallback();
        this.Connected = false;
    }
}

/** @inheritdoc */
export class Signal<T extends unknown[]> implements ISignal<T> {
    private _connections = new Array<SignalConnection>();
    private _connectionsHandlersMap = new Map<SignalConnection, (...args: T) => void>();

    private _lastFiredTick = 0;
    private _lastFiredArgs?: T;

    /** @inheritdoc */
    public Connect(onFiredCallback: (...args: T) => void) : SignalConnection {
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
                Players.PlayerAdded.Connect
            }
        });

        this._connectionsHandlersMap.set(connection, onFiredCallback);
        this._connections.push(connection);

        return connection;
    }

    /** @inheritdoc */
    public DisconnectAll() {
        // Clear the handlers mapping first so that we don't get an O(n^2) runtime complexity (see disconnect callback)
        this._connectionsHandlersMap.clear();

        for (let i = 0; i < this._connections.size(); i++) {
            this._connections[i].Disconnect();
        }

        this._connections = new Array<SignalConnection>();
    }

    /** @inheritdoc */
    public Fire(...args : T) {
        this._lastFiredArgs = args;
        this._lastFiredTick = tick();

        for (let i = 0; i < this._connections.size(); i++) {
            const handlerFunction = this._connectionsHandlersMap.get(this._connections[i]);
            if (handlerFunction !== undefined) {
                coroutine.wrap<Function>(handlerFunction)(...args);
            }
        }
    }

    /** @inheritdoc */
    public Wait() : LuaTuple<T> {
        const lastFiredTickAtStart = this._lastFiredTick;

        while (this._lastFiredTick === lastFiredTickAtStart) {
            RunService.Heartbeat.Wait();
        }

        return this._lastFiredArgs! as LuaTuple<T>;
    }
}