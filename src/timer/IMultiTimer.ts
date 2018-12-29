import {Delegate} from "../utils/Delegate";
import {TimeoutKind} from "./TimeoutKind";
import {TimerProgress} from "./TimerProgress";
import {TimerState} from "./TimerState";

export interface IMultiTimer {
    start(): void;
    pause(): void;
    stop(): void;

    getState(): TimerState;

    onTimeout: Delegate<TimeoutKind>;
    onStateChanged: Delegate<TimerState>;
    onProgressChanged: Delegate<TimerProgress>;
}
