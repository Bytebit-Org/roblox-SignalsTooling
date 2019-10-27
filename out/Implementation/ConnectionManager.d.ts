import { IBaseSignal } from "../Interfaces/IBaseSignal";
import { IConnectionManager } from "../Interfaces/IConnectionManager";
/** @inheritDoc */
export declare class ConnectionManager implements IConnectionManager {
    private _connectionData;
    /** @inheritDoc */
    AddConnectionData(signal: IBaseSignal, handlerFunction: (...args: any[]) => void): void;
    /** @inheritDoc */
    ConnectAll(): void;
    /** @inheritDoc */
    ConnectToEvent(signal: IBaseSignal, handlerFunction: (...args: any[]) => void): void;
    /** @inheritDoc */
    DisconnectAll(): void;
    /** @inheritDoc */
    Reset(): void;
}
