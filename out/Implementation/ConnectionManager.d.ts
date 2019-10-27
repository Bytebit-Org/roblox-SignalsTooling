import { IReadOnlySignal } from "../Interfaces/IReadOnlySignal";
import { IConnectionManager } from "../Interfaces/IConnectionManager";
export declare class ConnectionManager implements IConnectionManager {
    private _connectionData;
    AddConnectionData<T extends () => void>(signal: IReadOnlySignal<T>, handlerFunction: T): void;
    ConnectAll(): void;
    ConnectToEvent<T extends () => void>(signal: IReadOnlySignal<T>, handlerFunction: T): void;
    DisconnectAll(): void;
    Reset(): void;
}
