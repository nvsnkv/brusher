import {Delegate} from "../utils/Delegate";
import {HeartbitProvier as HeartbitProvier} from "../utils/Heartbit";
import {IMultiTimer} from "./IMultiTimer";
import {TimeoutKind} from "./TimeoutKind";
import {TimerProgress} from "./TimerProgress";
import {TimerState} from "./TimerState";

export class MultiTimer implements IMultiTimer {
    private readonly timeouts: number[];
    private readonly heartbit: HeartbitProvier;
    private readonly duration: number;
    
    private readonly raiseStateChanged: (s: TimerState) => void;
    private readonly raiseProgressChanged: () => void;
    private readonly raiseTimeoutOccured: (k: TimeoutKind) => void;

    private state: TimerState;
    private elapsed: number;
    private timeoutIndex: number;
    private timeout: number;
    
    readonly onTimeout: Delegate<TimeoutKind>;
    readonly onStateChanged: Delegate<TimerState>;
    readonly onProgressChanged: Delegate<TimerProgress>;

    constructor(timeouts: number[], heartbit: HeartbitProvier) {
        this.timeouts = timeouts;
        this.duration = timeouts.length * 2;
        for (const timeout of timeouts) {
            this.duration += timeout;
        }
        this.elapsed = 0;
        this.state = TimerState.Stopped;

        this.timeout = -1;
        this.timeoutIndex = -1;
        this.heartbit = heartbit;
        this.heartbit.onTick.add(() => this.tick());

        {
            const { delegate, invocator } = Delegate.Create<TimerState>();
            this.onStateChanged = delegate;
            this.raiseStateChanged = invocator;
        }

        {
            const { delegate, invocator } = Delegate.Create<TimerProgress>();
            this.onProgressChanged = delegate;
            this.raiseProgressChanged = () => {
                const progress = this.elapsed / this.duration * 100;
                const remaining = this.state != TimerState.Started ? null : this.duration - this.elapsed;
                invocator(new TimerProgress(progress, remaining));
            };
        }

        {
            const { delegate, invocator } = Delegate.Create<TimeoutKind>();
            this.onTimeout = delegate;
            this.raiseTimeoutOccured = invocator;
        }
    }

    start(): void {
        if (this.state == TimerState.Started) {
            return;
        }

        if (this.state == TimerState.Stopped) {
            this.timeoutIndex = -1;
            this.timeout = -1;
            this.elapsed = 0;
            this.raiseProgressChanged();
        }

        this.setState(TimerState.Started);
        this.heartbit.start();
    }

    pause(): void {
        this.setState(TimerState.Paused);
        this.heartbit.stop();
    }

    stop(): void {
        this.setState(TimerState.Stopped);
        this.heartbit.stop();
        this.elapsed = 0;
        this.raiseProgressChanged();
    }

    getState(): TimerState {
        return this.state;
    }

    private setState(state: TimerState): void {
        if (this.state != state) {
            this.state = state;
            this.raiseStateChanged(state);
        }
    }

    private tick(): void {
        if (this.state != TimerState.Started) {
            return;
        }

        if (this.timeout == -1) {
            this.timeoutIndex++;
            if (this.timeoutIndex >= this.timeouts.length) {
                this.stop();
                return;
            }
            this.timeout = this.timeouts[this.timeoutIndex];
            this.elapsed++;
            this.raiseProgressChanged();
        }
        else {
            this.timeout--;
            this.elapsed++;
            this.raiseProgressChanged();

            if (this.timeout == 0) {
                const timeoutKind = this.timeoutIndex == 0
                    ? TimeoutKind.First
                    : this.timeoutIndex == this.timeouts.length - 1
                        ? TimeoutKind.Last
                        : TimeoutKind.Subsequent;

                this.raiseTimeoutOccured(timeoutKind);
            }
        }
    }
}
