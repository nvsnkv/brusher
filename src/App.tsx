import * as React from "react";
import * as ReactDOM from "react-dom";

import {IDriver} from "./driver";
import {StartPage} from "./components/StartPage";
import * as tizen from "./tizen";

class App {
    start():void {
        window.addEventListener("tizenhwkey", (ev: any) => {
            if (ev.keyName === "back") {
                tizen.application.getCurrentApplication().exit();
           }
        });

        const driver: IDriver = new Object();
        ReactDOM.render(<StartPage driver={driver} />, document.getElementById("application"));
    }
}

new App().start();

