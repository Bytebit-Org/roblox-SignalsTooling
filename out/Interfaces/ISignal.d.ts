import { AnyArgs } from "../types";
import { IReadOnlySignal } from "./IReadOnlySignal";

/**
 * Defines a signal for creating new branches
 */
export interface ISignal<T extends AnyArgs = () => void> extends IReadOnlySignal<T> {
	/**
	 * Disconnects all connections
	 */
	disconnectAll(): void;

	/**
	 * Fires the signal
	 * @param args The arguments to be used for firing the signal
	 */
	fire(...args: FunctionArguments<T>): void;
}
