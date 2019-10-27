import { AnyArgs } from "../types";
import { IReadOnlySignal } from "./IReadOnlySignal";

/**
 * Used to easily manage a list of connections as a group
 */
export interface IConnectionManager {
	/**
	 * Adds the signal and function as connection data to the manager
	 * @param signal The signal
	 * @param handlerFunction The handler function
	 */
	AddConnectionData<T extends AnyArgs>(signal: IReadOnlySignal<T>, handlerFunction: T): void;

	/**
	 * Connects all inactive connections
	 */
	ConnectAll(): void;

	/**
	 * Connects the handler function to the given signal and add the information to the manager's connection data
	 * @param signal The signal
	 * @param handlerFunction The handler function
	 */
	ConnectToEvent<T extends AnyArgs>(signal: IReadOnlySignal<T>, handlerFunction: T): void;

	/**
	 * Disconnects all active connections
	 */
	DisconnectAll(): void;

	/**
	 * Resets the connection manager by disconnecting all active connections and throwing away all connection data
	 */
	Reset(): void;
}
