import {Delegate} from "./Delegate";

export class HeartbitProvier {
    private readonly workerScriptPath: string;
    private readonly raiseTick: (arg: void) => void; // TS compiler told me to create void parameter :)
    private worker: Worker;

    readonly onTick: Delegate<void>;

    constructor(scriptPath: string) {
        this.workerScriptPath = scriptPath;
        const {delegate, invocator} = Delegate.Create<void>();
        this.onTick = delegate;
        this.raiseTick = invocator;
    }

    start(): void {
        if (!this.worker) {
            this.worker = new Worker(this.workerScriptPath);
            this.worker.onmessage = () => {this.raiseTick(); };
        }
    }

    stop(): void {
        if (this.worker) {
            this.worker.terminate();
            this.worker = null;
        }
    }

    get started(): boolean {
        return !!this.worker;
    }

    static workerMain(): void {
        window.setInterval(() => postMessage(null, "*"), 1000);
    }
}
