import IBaseSignal = require("./IBaseSignal");

/**
 * Defines a signal that can be connected to but not fired
 */
interface IReadOnlySignal<T extends unknown[]> extends IBaseSignal {
	/**
	 * Connects a callback function to the firing of the signal
	 * @param onFiredCallback The function to associate with the firing of the signal
	 */
	Connect(onFiredCallback: (...args: T) => void): RBXScriptConnection;
}

export = IReadOnlySignal;