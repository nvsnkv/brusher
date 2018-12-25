declare const tizen: ITizen;

declare interface ITizen {
    application: ITizenApplication;
    power: ITizenPower;
}

declare interface ITizenPower {
    request(resource: string, option?: string): void;
}

declare interface ITizenApplication {
    getCurrentApplication(): ITizenApplication;
    exit(): void;
}

export = tizen;