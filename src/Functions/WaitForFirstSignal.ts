import { IReadOnlySignal } from "../Interfaces/IReadOnlySignal";
import { ISignalConnection } from "../Interfaces/ISignalConnection";
import { Signal } from "../Implementation/Signal";

// Credit to Tiffblocks
// Adapted to TypeScript by NoahWillCode
export function waitForFirstSignal(...signals: Array<IReadOnlySignal>) {
	const finalSignal = new Signal<(firstSignal: IReadOnlySignal, signalArgs: Array<unknown>) => void>();
	const connections = new Array<ISignalConnection>();

	for (let i = 0; i < signals.size(); i++) {
		const signal = signals[i];

		connections.push(
			signal.Connect((...args: Array<unknown>) => {
				finalSignal.fire(signal, args);
			}),
		);
	}

	const finalArgs = finalSignal.Wait();
	for (let i = 0; i < connections.size(); i++) {
		connections[i].Disconnect();
	}

	return finalArgs;
}
