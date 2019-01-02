import {Delegate} from "./Delegate";

export class HeartbitProvier {
    private readonly raiseTick: (arg: void) => void; // TS compiler told me to create void parameter :)
    private interval: number;
    readonly onTick: Delegate<void>;

    constructor() {
        const {delegate, invocator} = Delegate.Create<void>();
        this.onTick = delegate;
        this.raiseTick = invocator;
    }

    start(): void {
        if (!this.interval) {
            this.interval = setInterval(() => this.raiseTick(), 1000);
        }
    }

    stop(): void {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    get started(): boolean {
        return !!this.interval;
    }
}
