import IBaseSignal = require("./IBaseSignal");

/**
 * Defines a signal for creating new branches
 */
interface ISignal<T extends unknown[]> extends IBaseSignal {
    /**
     * Disconnects all connections
     */
    DisconnectAll(): void;

    /**
     * Fires the signal
     * @param args The arguments to be used for firing the signal
     */
    Fire(...args : T): void;

    /**
     * Waits for the signal to be fired and then returns the parameters that were supplied
     */
    Wait(): LuaTuple<T>;
}

export = ISignal;