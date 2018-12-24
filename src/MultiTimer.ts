enum TimerState {
    Started,
    Paused,
    Stopped
}

export class MultiTimer {
    private readonly timeouts: number[];
    public readonly total: number;

    private readonly onTimeout: () => void;
    private readonly onTick: (x: number) => void;

    private state: TimerState  = TimerState.Stopped;

    private index: number;
    private countdown: number;
    private elapsed: number;
    private interval: number;

    constructor(timeouts: number[], onTimeout: () => void, onTick: (x: number) => void) {
        this.timeouts = timeouts;
        for (const timeout of timeouts) {
            this.total += timeout;
        }

        this.onTimeout = onTimeout;
        this.onTick = onTick;
    }

    start(): void {
        if (this.state == TimerState.Started) {
            return;
        }

        if (this.state == TimerState.Paused) {
            this.state = TimerState.Started;
        }
        else {
            this.index = -1;
            this.countdown = -1;
            this.elapsed = 0;

            this.interval = window.setInterval(() => this.tick(), 1000);
            this.state = TimerState.Started;
        }
    }

    stop(): void {
        if (this.state == TimerState.Stopped) {
            return;
        }

        this.state = TimerState.Stopped;
        window.clearInterval(this.interval);
        this.interval = null;

        this.index = -1;
        this.countdown = -1;
    }

    pause(): void {
        this.state = TimerState.Paused;
    }

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

        this.onTick(this.elapsed);
        
        if (this.countdown == 0) {
            this.onTimeout();
            this.countdown = -1;
        }
    }

}
