declare const navigator: ITizenNavigator;

declare interface ITizenNavigator {
    vibrate(duration: number): void;
}

export = navigator;