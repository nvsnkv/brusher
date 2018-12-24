import * as React from "react";
import * as ReactDOM from "react-dom";

import {StartPage} from "./components/StartPage";
import {MultiTimer} from "./MultiTimer";
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

    start(): void {
        window.addEventListener("tizenhwkey", (ev: any) => {
            if (ev.keyName === "back") {
                tizen.application.getCurrentApplication().exit();
           }
        });

        const timer = new MultiTimer(this.timeouts, this.bzzt, (progress) => this.updateProgress(progress));
        ReactDOM.render(<StartPage timer={timer} />, document.getElementById("application"));
    }

    private bzzt(): void {

    }

    private updateProgress(progress: number) {

    }
}

new App().start();
