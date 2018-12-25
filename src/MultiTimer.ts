import { Delegate } from "./Delegete";

export enum TimerState {
    Started,
    Paused,
    Stopped
}

export class MultiTimer {
    private readonly timeouts: number[];
    private readonly total: number = 0;
    private readonly onTimeout: () => void;
    private readonly raiseStateChanged: (arg: TimerState) => void;
    private readonly raiseProgressChanged: (arg: number) => void;

    private state: TimerState  = TimerState.Stopped;

    private index: number;
    private countdown: number;
    private elapsed: number;
    private interval: number;

    constructor(timeouts: number[], onTimeout: () => void) {
        this.timeouts = timeouts;
        for (const timeout of timeouts) {
            this.total += timeout;
        }

        this.onTimeout = onTimeout;
        let { delegate, invocator } = Delegate.Create<TimerState>();
        this.stateChanged = delegate;
        this.raiseStateChanged = invocator;

        ({ delegate, invocator } = Delegate.Create<number>());

        this.progressChanged = delegate;
        this.raiseProgressChanged = invocator;
    }

    start(): void {
        if (this.state == TimerState.Started) {
            return;
        }

        if (this.state == TimerState.Paused) {
            this.state = TimerState.Started;
            this.raiseStateChanged(this.state);
        }
        else {
            this.index = -1;
            this.countdown = -1;
            this.elapsed = 0;

            this.interval = window.setInterval(() => this.tick(), 1000);
            this.state = TimerState.Started;
            this.raiseStateChanged(this.state);
        }
    }

    stop(): void {
        if (this.state == TimerState.Stopped) {
            return;
        }

        this.state = TimerState.Stopped;
        this.elapsed = 0;
        this.raiseStateChanged(this.state);
        
        window.clearInterval(this.interval);
        this.interval = null;

        this.index = -1;
        this.countdown = -1;
    }

    pause(): void {
        this.state = TimerState.Paused;
        this.raiseStateChanged(this.state);
    }

    getState(): TimerState {
        return this.state;
    }

    getProgress(): number {
        return this.elapsed / this.total * 100;
    }

    readonly stateChanged: Delegate<TimerState>;
    readonly progressChanged: Delegate<number>;

    private tick(): void {
        if (this.state != TimerState.Started) {
            return;
        }

        if (this.countdown == -1) {
            this.index++;

            if (this.timeouts.length <= this.index) {
                this.stop();
                return;
            }

            this.countdown = this.timeouts[this.index];
        }

        this.countdown--;
        this.elapsed++;
        this.raiseProgressChanged(this.getProgress());
        
        if (this.countdown == 0) {
            this.onTimeout();
            this.countdown = -1;
        }
    }
}
