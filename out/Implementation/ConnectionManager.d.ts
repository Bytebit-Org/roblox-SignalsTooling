import IBaseSignal = require("../Interfaces/IBaseSignal");
import IConnectionManager = require("../Interfaces/IConnectionManager");
/** @inheritDoc */
declare class ConnectionManager implements IConnectionManager {
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
export = ConnectionManager;
