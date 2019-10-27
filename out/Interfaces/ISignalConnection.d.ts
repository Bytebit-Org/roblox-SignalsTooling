/**
 * Defines a particular signal connection
 */
export interface ISignalConnection {
    /**
     * Whether the connection is still connected
     */
    readonly Connected: boolean;
    /**
     * Disconnnects the signal connection.
     */
    Disconnect(): void;
}
