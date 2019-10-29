import { IReadOnlySignal } from "../Interfaces/IReadOnlySignal";
import { AnyArgs } from "../types";

export function listenOnce<T extends AnyArgs>(signal: IReadOnlySignal<T>, callback: T): void;
