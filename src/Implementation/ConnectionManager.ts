import { IConnectionManager } from "../Interfaces/IConnectionManager";
import { IReadOnlySignal } from "../Interfaces/IReadOnlySignal";
import { ISignalConnection } from "../Interfaces/ISignalConnection";
import { AnyArgs } from "../types";

interface IConnectionInfo {
	Connection?: ISignalConnection;
	HandlerFunction: AnyArgs;
	Signal: IReadOnlySignal;
}

export class ConnectionManager implements IConnectionManager {
	private connectionData = new Array<IConnectionInfo>();

	public addConnectionData<T extends AnyArgs>(signal: IReadOnlySignal<T>, handlerFunction: T) {
		this.connectionData.push({
			HandlerFunction: handlerFunction,
			Signal: signal,
		});
	}

	public connectAll() {
		for (let i = 0; i < this.connectionData.size(); i++) {
			const connectionInfo = this.connectionData[i];
			if (connectionInfo.Connection === undefined) {
				connectionInfo.Connection = connectionInfo.Signal.Connect(connectionInfo.HandlerFunction);
			}
		}
	}

	public connectToEvent<T extends AnyArgs>(signal: IReadOnlySignal<T>, handlerFunction: T) {
		const connection = signal.Connect(handlerFunction);
		this.connectionData.push({
			Connection: connection,
			HandlerFunction: handlerFunction,
			Signal: signal,
		});
	}

	public disconnectAll() {
		for (let i = 0; i < this.connectionData.size(); i++) {
			const connectionInfo = this.connectionData[i];
			if (connectionInfo.Connection !== undefined) {
				connectionInfo.Connection.Disconnect();
				connectionInfo.Connection = undefined;
			}
		}
	}

	public reset() {
		this.disconnectAll();
		this.connectionData = new Array<IConnectionInfo>();
	}
}
