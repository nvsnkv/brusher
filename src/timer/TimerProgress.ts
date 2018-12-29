export class TimerProgress {
    constructor(percentage: number, remaining: number) {
        this.percentage = percentage;
        this.remaining = remaining;
    }

    readonly percentage: number;
    readonly remaining: number;
}
