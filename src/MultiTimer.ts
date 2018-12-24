export enum TimerState {
    Started,
    Paused,
    Stopped
}

export class MultiTimer {
    private readonly timeouts: number[];
    private readonly total: number = 0;
    private readonly onTimeout: () => void;

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
    }

    start(): void {
        if (this.state == TimerState.Started) {
            return;
        }

        if (this.state == TimerState.Paused) {
            this.state = TimerState.Started;

            if (this.stateChanged) {
                this.stateChanged(this.state);
            }
        }
        else {
            this.index = -1;
            this.countdown = -1;
            this.elapsed = 0;

            this.interval = window.setInterval(() => this.tick(), 1000);
            this.state = TimerState.Started;
            
            if (this.stateChanged) {
                this.stateChanged(this.state);
            }
        }
    }

    stop(): void {
        if (this.state == TimerState.Stopped) {
            return;
        }

        this.state = TimerState.Stopped;
        this.elapsed = 0;
        
        if (this.stateChanged) {
            this.stateChanged(this.state);
        }

        window.clearInterval(this.interval);
        this.interval = null;

        this.index = -1;
        this.countdown = -1;
    }

    pause(): void {
        this.state = TimerState.Paused;

        if (this.stateChanged) {
            this.stateChanged(this.state);
        }
    }

    getState(): TimerState {
        return this.state;
    }

    getProgress(): number {
        return this.elapsed / this.total * 100;
    }

    stateChanged: (state: TimerState) => void;
    progressChanged: (progress: number) => void;

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

        if (this.progressChanged) {
            this.progressChanged(this.getProgress());
        }
        
        if (this.countdown == 0) {
            this.onTimeout();
            this.countdown = -1;
        }
    }
}
