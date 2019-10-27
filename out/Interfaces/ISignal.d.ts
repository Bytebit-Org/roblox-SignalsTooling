/// <reference types="@rbxts/types" />
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
    /**
     * Waits for the signal to be fired and then returns the parameters that were supplied
     */
    Wait(): LuaTuple<T>;
}
