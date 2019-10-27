/**
 * Describes the basics required for any signal
 */
export interface IBaseSignal {
	/**
	 * Connects a handler to the signal
	 * @param args The handler function - described as an any[] for @rbxts/types compatibility
	 */
    Connect(...args: any[]): RBXScriptConnection;

    /**
     * Waits for the signal to be fired and then returns the parameters that were supplied
     */
    Wait(): LuaTuple<any[]>;
}