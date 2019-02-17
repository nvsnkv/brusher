import * as React from "react";
import {Alarm, IAlarmStatus, IAlarmTime} from "../alarm/Alarm";

export class Reminder extends React.Component<{}, IAlarmStatus> {
    private readonly alarm: Alarm;

    constructor() {
        super({});

        this.alarm = new Alarm();
        this.state = this.alarm.getStatus();

        if (!this.state.enabled) {
            this.state = {
                enabled: false,
                time: this.getRandomTime()
            };
        }
    }

    render(): JSX.Element {
        const state = this.state;
        const timeClass = "timer " + state.enabled ? "on" : "off";
        return <div className="ui-page ui-page-active" id="main">
                 <div className="ui-content content-padding">
                    <div className={timeClass}>
                        <span>{state.time.hours}</span><span>:</span><span>{state.time.minutes}</span>
                    </div>
                 </div>
                 <footer className="ui-footer ui-bottom-button">
                 {state.enabled && <a href="#" className="ui-btn" onClick={() => this.reset()}>Reset</a>}
                 {!state.enabled && <a href="#" className="ui-btn" onClick={() => this.set()}>Set</a>}
                 </footer>
               </div>;
    }

    private set(): void  {
        this.alarm.set(this.state.time);
        this.setState(this.alarm.getStatus());
    }

    private reset(): void {
        this.alarm.reset();
        this.setState({
            enabled: false,
            time: this.getRandomTime()
        });
    }

    private getRandomTime(): IAlarmTime {
        const rnd = Math.random();

        return {
            hours: 22,
            minutes: Math.ceil(15 + 30 * rnd),
        };
    }
}
