import { IConnectionManager } from "../Interfaces/IConnectionManager";
import { IReadOnlySignal } from "../Interfaces/IReadOnlySignal";
import { AnyArgs } from "../types";
export declare class ConnectionManager implements IConnectionManager {
    private _connectionData;
    addConnectionData<T extends AnyArgs>(signal: IReadOnlySignal<T>, handlerFunction: T): void;
    connectAll(): void;
    connectToEvent<T extends AnyArgs>(signal: IReadOnlySignal<T>, handlerFunction: T): void;
    disconnectAll(): void;
    reset(): void;
}
