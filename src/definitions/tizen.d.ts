declare const tizen: ITizen;

declare interface ITizen {
    alarm: IAlarmManager;
    application: ITizenApplication;
    power: IPowerManager;

    AlarmAbsolute: typeof AlarmAbsolute;
    ApplicationControl: typeof ApplicationControl;
    UserNotification: typeof UserNotification;
}

declare interface IAlarmManager {
    addAlarmNotification(alarm: IAlarm, appId: UserNotification): void;
    remove(alarmId: any): void;
    add(alarm: IAlarm, appId: any): void;
    getAll(): IAlarm[];
}

declare interface IAlarm {
    date: Date;
    id: any;

}

declare  class AlarmAbsolute implements IAlarm {
    date: Date;
    id: any;

    constructor(date: Date, daysOfWeek: string[]);
}

declare class ApplicationControl {
    constructor(operation: string, uri: string, mime: string, category: string);
}

declare class UserNotification {
    constructor(userType: string, title: string, notificationDict: any);
}

declare interface IPowerManager {
    turnScreenOff(): any;
    turnScreenOn(): any;
    request(resource: string, state: string): void;
    release(resource: string): void;
}

declare interface ITizenApplication {
    appInfo: ITizenApplicationInfo;
    getCurrentApplication(): ITizenApplication;
    exit(): void;
}

declare interface ITizenApplicationInfo {
    id: any
}

export = tizen;
export as namespace tizen;