import { IConnectionManager } from "../Interfaces/IConnectionManager";
import { IReadOnlySignal } from "../Interfaces/IReadOnlySignal";
import { AnyArgs } from "../types";
export declare class ConnectionManager implements IConnectionManager {
    private _connectionData;
    AddConnectionData<T extends AnyArgs>(signal: IReadOnlySignal<T>, handlerFunction: T): void;
    ConnectAll(): void;
    ConnectToEvent<T extends AnyArgs>(signal: IReadOnlySignal<T>, handlerFunction: T): void;
    DisconnectAll(): void;
    Reset(): void;
}
