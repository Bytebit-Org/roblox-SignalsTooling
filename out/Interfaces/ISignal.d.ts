import { IReadOnlySignal } from "./IReadOnlySignal";
/**
 * Defines a signal for creating new branches
 */
export interface ISignal<T extends unknown[]> extends IReadOnlySignal<T> {
    /**
     * Disconnects all connections
     */
    DisconnectAll(): void;
    /**
     * Fires the signal
     * @param args The arguments to be used for firing the signal
     */
    Fire(...args: T): void;
}
