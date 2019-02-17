import * as React from "react";
import * as ReactDOM from "react-dom";

import {Reminder} from "./components/Reminder";
import {SwipeScroller} from "./components/SwipeScroller";
import {TimerPage} from "./components/TimerPage";
import * as tizen from "./definitions/tizen";
import {IMultiTimer} from "./timer/IMultiTimer";
import {MultiTimer} from "./timer/MultiTimer";
import {TimeoutKind} from "./timer/TimeoutKind";
import {TimerState} from "./timer/TimerState";
import {Botherer} from "./utils/Botherer";
import {HeartbitProvier} from "./utils/Heartbit";

class App {
    private readonly timeouts: number[] = [
        3,
        4, 4, 4, 4, 4, 4,
        4, 4, 4, 4, 4, 4,
        4, 4, 4, 4, 4, 4,
        4, 4, 4, 4, 4,
        4, 4, 4, 4, 4,
    ];

    private readonly timer: IMultiTimer;
    private readonly botherer: Botherer = new Botherer();
    private swipeScroller: SwipeScroller;

    constructor() {
        const heartbit = new HeartbitProvier();
        this.timer = new MultiTimer(this.timeouts, heartbit);

        this.timer.onTimeout.add((kind) => {
            if (kind != TimeoutKind.Subsequent) {
                this.botherer.disturb();
            }
            else {
                this.botherer.bother();
            }
        });
    }

    start(): void {
        window.addEventListener("tizenhwkey", (ev: any) => {
            if (ev.keyName === "back") {
                if (this.swipeScroller && this.swipeScroller.back()) {
                    return;
                }

                switch (this.timer.getState()) {
                    case TimerState.Started:
                        this.timer.pause();
                        break;

                    case TimerState.Paused:
                        this.timer.stop();
                        break;

                    case TimerState.Stopped:
                    tizen.application.getCurrentApplication().exit();
                }
           }
        });

        try {
            ReactDOM.render(<SwipeScroller ref={(elem) => this.swipeScroller = elem}>
                <Reminder></Reminder>
                <TimerPage timer={this.timer} />
            </SwipeScroller>
            , document.getElementById("application"));
        }
        catch (e) {
            console.log("[Brusher] [init] Unhandled exception occured!\n" + JSON.stringify(e));
            tizen.application.getCurrentApplication().exit();
        }
    }
}

new App().start();
