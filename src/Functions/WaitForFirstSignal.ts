import { IReadOnlySignal } from "../Interfaces/IReadOnlySignal";
import { ISignalConnection } from "../Interfaces/ISignalConnection";
import { Signal } from "../Implementation/Signal";
import { AnyArgs } from "..";

// Credit to Tiffblocks
// Adapted to TypeScript by NoahWillCode
export function waitForFirstSignal(...signals: Array<IReadOnlySignal<AnyArgs>>) {
	const finalSignal = new Signal<(firstSignal: IReadOnlySignal<AnyArgs>, signalArgs: Array<unknown>) => void>();
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
