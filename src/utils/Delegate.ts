export class Delegate<T> {

    private readonly callbacks: Array<(arg: T) => void> = [];

    private constructor() {}

    add(callback: (arg: T) => void) {
        this.callbacks.push(callback);
    }

    static Create<T>(): { delegate: Delegate<T>, invocator: (arg: T) => void } {
        const delegate = new Delegate<T>();

        return {delegate, invocator: (arg) => delegate.call(arg)};
    }

    private call(arg: T) {
        for (const callback of this.callbacks) {
            callback(arg);
        }
    }
}
