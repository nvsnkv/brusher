import * as React from "react";
import {IDriver} from "../driver";


export interface IStartPageProps {
    driver: IDriver;
}

export class StartPage extends React.Component<IStartPageProps> {
    render():JSX.Element {
        return <div className="ui-page ui-page-active" id="main">
                    <div className="ui-content content-padding">
                        <img src="assets/toothbrush-360.png" width="242" height="242" className="logo" />
                    </div>
                    <footer className="ui-footer ui-bottom-button">
                        <a href="#" className="ui-btn">Start</a>
                    </footer>
	           </div>;
    }
}