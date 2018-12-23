declare const tizen: ITizen;

declare interface ITizen {
    application: ITizenApplication;
}

declare interface ITizenApplication {
    getCurrentApplication(): ITizenApplication;
    exit(): void;
}

export = tizen;