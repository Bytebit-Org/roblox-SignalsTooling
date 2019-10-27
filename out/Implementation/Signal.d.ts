/// <reference types="@rbxts/types" />
import { ISignal } from "../Interfaces/ISignal";
import { ISignalConnection } from "../Interfaces/ISignalConnection";
import { AnyArgs } from "../types";
declare class SignalConnection implements ISignalConnection {
    private readonly _disconnectCallback;
    Connected: boolean;
    constructor(disconnectCallback: () => void);
    Disconnect(): void;
}
export declare class Signal<T extends AnyArgs = () => void> implements ISignal<T> {
    private _connections;
    private _connectionsHandlersMap;
    private _lastFiredTick;
    private _lastFiredArgs?;
    Connect(onFiredCallback: (...args: FunctionArguments<T>) => void): SignalConnection;
    DisconnectAll(): void;
    Fire(...args: FunctionArguments<T>): void;
    Wait(): LuaTuple<FunctionArguments<T>>;
}
export {};
