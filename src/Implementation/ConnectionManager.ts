import { ISignalConnection } from "../Interfaces/ISignalConnection";
import { IBaseSignal } from "../Interfaces/IBaseSignal";
import { IConnectionManager } from "../Interfaces/IConnectionManager";

interface IConnectionInfo {
    Connection?: ISignalConnection,
    HandlerFunction: (...args: any[]) => void,
    Signal: IBaseSignal
}

export class ConnectionManager implements IConnectionManager {
    private _connectionData = new Array<IConnectionInfo>();

    public AddConnectionData(signal: IBaseSignal, handlerFunction: (...args: any[]) => void) {
        this._connectionData.push({
            HandlerFunction: handlerFunction,
            Signal: signal
        });
    }

    public ConnectAll() {
        for (let i = 0; i < this._connectionData.size(); i++) {
            const connectionInfo = this._connectionData[i];
            if (connectionInfo.Connection === undefined) {
                connectionInfo.Connection = connectionInfo.Signal.Connect(connectionInfo.HandlerFunction);
            }
        }
    }

    public ConnectToEvent(signal: IBaseSignal, handlerFunction: (...args: any[]) => void) {
        const connection = signal.Connect(handlerFunction);
        this._connectionData.push({
            Connection: connection,
            HandlerFunction: handlerFunction,
            Signal: signal
        });
    }

    public DisconnectAll() {
        for (let i = 0; i < this._connectionData.size(); i++) {
            const connectionInfo = this._connectionData[i];
            if (connectionInfo.Connection !== undefined) {
                connectionInfo.Connection.Disconnect();
                connectionInfo.Connection = undefined;
            }
        }
    }

    public Reset() {
        this.DisconnectAll();
        this._connectionData = new Array<IConnectionInfo>();
    }
}