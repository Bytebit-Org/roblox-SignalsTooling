import IBaseSignal = require("./IBaseSignal");

/**
 * Used to easily manage a list of connections as a group
 */
interface IConnectionManager {
    /**
     * Adds the signal and function as connection data to the manager
     * @param signal The signal
     * @param handlerFunction The handler function
     */
    AddConnectionData(signal: IBaseSignal, handlerFunction: (...args: any[]) => void): void;

    /**
     * Connects all inactive connections
     */
    ConnectAll(): void;

    /**
     * Connects the handler function to the given signal and add the information to the manager's connection data
     * @param signal The signal
     * @param handlerFunction The handler function
     */
    ConnectToEvent(signal: IBaseSignal, handlerFunction: (...args: any[]) => void): void;

    /**
     * Disconnects all active connections
     */
    DisconnectAll(): void;

    /**
     * Resets the connection manager by disconnecting all active connections and throwing away all connection data
     */
    Reset(): void;
}

export = IConnectionManager;