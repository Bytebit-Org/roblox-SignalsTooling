import { IBaseSignal } from "./IBaseSignal";

/**
 * Defines a signal that can be connected to but not fired
 */
export interface IReadOnlySignal<T extends unknown[]> extends IBaseSignal {
	/**
	 * Connects a callback function to the firing of the signal
	 * @param onFiredCallback The function to associate with the firing of the signal
	 */
	Connect(onFiredCallback: (...args: T) => void): RBXScriptConnection;

    /**
     * Waits for the signal to be fired and then returns the parameters that were supplied
     */
    Wait(): LuaTuple<T>;
}