import { IConnectionManager } from "../Interfaces/IConnectionManager";
import { IReadOnlySignal } from "../Interfaces/IReadOnlySignal";
import { ISignalConnection } from "../Interfaces/ISignalConnection";
import { AnyArgs } from "../types";

interface IConnectionInfo {
	Connection?: ISignalConnection;
	HandlerFunction: AnyArgs;
	Signal: IReadOnlySignal<AnyArgs>;
}

export class ConnectionManager implements IConnectionManager {
	private _connectionData = new Array<IConnectionInfo>();

	public AddConnectionData<T extends AnyArgs>(signal: IReadOnlySignal<T>, handlerFunction: T) {
		this._connectionData.push({
			HandlerFunction: handlerFunction,
			Signal: signal,
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

	public ConnectToEvent<T extends AnyArgs>(signal: IReadOnlySignal<T>, handlerFunction: T) {
		const connection = signal.Connect(handlerFunction);
		this._connectionData.push({
			Connection: connection,
			HandlerFunction: handlerFunction,
			Signal: signal,
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
