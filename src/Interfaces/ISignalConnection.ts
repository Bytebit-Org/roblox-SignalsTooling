/**
 * Defines a particular signal connection
 */
interface ISignalConnection {
	/**
	 * Whether the connection is still connected
	 * DO NOT MUTATE
	 */
	Connected: boolean;
	
	/**
	 * Disconnnects the signal connection.
	 */
    Disconnect(): void;
}

export = ISignalConnection;