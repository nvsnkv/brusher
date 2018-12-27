declare const tizen: ITizen;

declare interface ITizen {
    application: ITizenApplication;
    power: IPowerManager;
}

declare interface IPowerManager {
    request(resource: string, state: string): void;
    release(resource: string): void;
}

declare interface ITizenApplication {
    getCurrentApplication(): ITizenApplication;
    exit(): void;
}

export = tizen;