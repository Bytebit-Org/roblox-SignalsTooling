/// <reference types="@rbxts/types" />
import ISignalConnection = require("../Interfaces/ISignalConnection");
import ISignal = require("../Interfaces/ISignal");
/** @inheritdoc */
declare class SignalConnection implements ISignalConnection {
    private readonly _disconnectCallback;
    /** @inheritdoc */
    Connected: boolean;
    constructor(disconnectCallback: () => void);
    /** @inheritdoc */
    Disconnect(): void;
}
/** @inheritdoc */
export declare class Signal<T extends unknown[]> implements ISignal<T> {
    private _connections;
    private _connectionsHandlersMap;
    private _lastFiredTick;
    private _lastFiredArgs?;
    /** @inheritdoc */
    Connect(onFiredCallback: (...args: T) => void): SignalConnection;
    /** @inheritdoc */
    DisconnectAll(): void;
    /** @inheritdoc */
    Fire(...args: T): void;
    /** @inheritdoc */
    Wait(): LuaTuple<T>;
}
export {};
