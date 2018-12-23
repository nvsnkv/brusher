import * as React from "react";
import * as ReactDOM from "react-dom";

import {IDriver} from "./driver";
import {StartPage} from "./components/StartPage";

const driver: IDriver = new Object();
ReactDOM.render(<StartPage driver={driver} />, document.getElementById("application"));