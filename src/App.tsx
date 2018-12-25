import * as React from "react";
import * as ReactDOM from "react-dom";

import {StartPage} from "./components/StartPage";
import {MultiTimer, TimerState} from "./MultiTimer";
import * as navigator from "./navigator";
import * as tizen from "./tizen";

class App {
    private readonly timeouts: number[] = [
        3,
        5, 5, 5, 5, 5, 5,
        5, 5, 5, 5, 5, 5,
        5, 5, 5, 5, 5, 5,
        5, 5, 5, 5, 5,
        5, 5, 5, 5, 5,
    ];

    private keepScreenRequested: boolean = false;

    start(): void {
        const timer = new MultiTimer(this.timeouts, () => this.bzzt());
        timer.stateChanged.add((state) => {
            if (state == TimerState.Started && !this.keepScreenRequested) {
                this.keepScreenRequested = true;
                tizen.power.request("SCREEN", "SCREEN_NORMAL");
            }
            if (state != TimerState.Started && this.keepScreenRequested) {
                this.keepScreenRequested = false;
                tizen.power.request("SCREEN");
            }
        })
        window.addEventListener("tizenhwkey", (ev: any) => {
            if (ev.keyName === "back") {
                switch (timer.getState()) {
                    case TimerState.Started:
                        timer.pause();
                        break;

                    case TimerState.Paused:
                        timer.stop();

                    case TimerState.Stopped:
                    tizen.application.getCurrentApplication().exit();
                }
           }
        });
        ReactDOM.render(<StartPage timer={timer} />, document.getElementById("application"));
    }

    private bzzt(): void {
        navigator.vibrate(300);
    }
}

new App().start();
