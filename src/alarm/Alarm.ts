import * as  tizen from "../definitions/tizen";

export class Alarm {
    private readonly appId: any;
    private alarmId: any;
    
    constructor() {
        this.appId = tizen.application.getCurrentApplication().appInfo.id;
    }

    getStatus(): IAlarmStatus {
        const alarms = tizen.alarm.getAll();
        if (alarms.length == 0) {
            return {
                enabled: false
            };
        }

        const alarm = alarms[0];

        this.alarmId = alarm.id;

        return {
            enabled: true,
            time: {
                hours: alarm.date.getHours(),
                minutes: alarm.date.getMinutes()
            }
        };
    }

    set(time: IAlarmTime): void {
        if (this.alarmId) {
            return;
        }

        const date = new Date();
        date.setHours(time.hours, time.minutes, 0);

        const alarm = new tizen.AlarmAbsolute(date, ["MO", "TU", "WE", "TH", "FR", "SA", "SU"]);
        const appControl = new tizen.ApplicationControl("http://tizen.org/appcontrol/operation/default",
                                              null, "image/jpg", null);

        const notificationDict = {
            content: "Just a friendly reminder to brush your teeth from Brusher!",
            actions: {
                vibration: true,
                appId: this.appId,
                appControl
            }
        };

        const notification = new tizen.UserNotification("SIMPLE", "Brusher's notification",
        notificationDict);

        tizen.alarm.addAlarmNotification(alarm, notification);
    }

    reset(): void  {
        if (!this.alarmId) {
            return;
        }

        tizen.alarm.remove(this.alarmId);
        this.alarmId = null;
    }
}

export interface IAlarmStatus  {
    enabled: boolean;

    time?: IAlarmTime;
}

export interface IAlarmTime {
    hours: number;
    minutes: number;
}
