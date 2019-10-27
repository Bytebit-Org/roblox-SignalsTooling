/**
 * Describes the basics required for any signal
 */
export interface IBaseSignal {
	/**
	 * Connects a handler to the signal
	 * @param args The handler function - described as an any[] for @rbxts/types compatibility
	 */
    Connect(...args: any[]): RBXScriptConnection;
}