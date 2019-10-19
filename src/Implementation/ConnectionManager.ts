import ISignalConnection = require("../Interfaces/ISignalConnection");
import IBaseSignal = require("../Interfaces/IBaseSignal");
import IConnectionManager = require("../Interfaces/IConnectionManager");

interface IConnectionInfo {
    Connection?: ISignalConnection,
    HandlerFunction: (...args: any[]) => void,
    Signal: IBaseSignal
}

/** @inheritDoc */
export class ConnectionManager implements IConnectionManager {
    private _connectionData = new Array<IConnectionInfo>();

	/** @inheritDoc */
    public AddConnectionData(signal: IBaseSignal, handlerFunction: (...args: any[]) => void) {
        this._connectionData.push({
            HandlerFunction: handlerFunction,
            Signal: signal
        });
    }

	/** @inheritDoc */
    public ConnectAll() {
        for (let i = 0; i < this._connectionData.size(); i++) {
            const connectionInfo = this._connectionData[i];
            if (connectionInfo.Connection === undefined) {
                connectionInfo.Connection = connectionInfo.Signal.Connect(connectionInfo.HandlerFunction);
            }
        }
    }

	/** @inheritDoc */
    public ConnectToEvent(signal: IBaseSignal, handlerFunction: (...args: any[]) => void) {
        const connection = signal.Connect(handlerFunction);
        this._connectionData.push({
            Connection: connection,
            HandlerFunction: handlerFunction,
            Signal: signal
        });
    }

	/** @inheritDoc */
    public DisconnectAll() {
        for (let i = 0; i < this._connectionData.size(); i++) {
            const connectionInfo = this._connectionData[i];
            if (connectionInfo.Connection !== undefined) {
                connectionInfo.Connection.Disconnect();
                connectionInfo.Connection = undefined;
            }
        }
    }

	/** @inheritDoc */
    public Reset() {
        this.DisconnectAll();
        this._connectionData = new Array<IConnectionInfo>();
    }
}