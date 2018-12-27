declare const navigator: ITizenNavigator;

declare interface ITizenNavigator {
    vibrate(duration: number | number[]): void;
}

export = navigator;