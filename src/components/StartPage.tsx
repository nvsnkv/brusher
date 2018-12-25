import * as React from "react";
import CircularProgressbar from "react-circular-progressbar";
import { MultiTimer, TimerState } from "../MultiTimer";

export interface IStartPageProps {
    timer: MultiTimer;
}

interface IStartPageState {
    timerState: TimerState;
    progress: number;
}

export class StartPage extends React.Component<IStartPageProps> {
    private readonly timer: MultiTimer;
    constructor(props: IStartPageProps) {
        super(props);
        this.timer = props.timer;

        this.state = {timerState: this.timer.getState(), progress: 0};

        this.timer.stateChanged.add((timerState) => this.updateState());
        this.timer.progressChanged.add((progress) => this.updateState());
    }

    private updateState(): void {
        this.setState({
                timerState: this.timer.getState(),
                progress: this.timer.getProgress()
            });
    }

    render(): JSX.Element {
        const state = this.state as IStartPageState;
        return <div className="ui-page ui-page-active" id="main">
                    <div className="ui-content content-padding">
                        <img src="assets/toothbrush-360.png" width="242" height="242" className="logo" />
                    </div>
                    <footer className="ui-footer ui-bottom-button" id="footer">
                    {(state.timerState === TimerState.Stopped) &&
                        <a href="#" className="ui-btn" onClick={() => this.timer.start()}>Start</a>
                    }
                    {(state.timerState === TimerState.Paused) &&
                        <a href="#" className="ui-btn" onClick={() => this.timer.start()}>Resume</a>
                    }
                    {(state.timerState === TimerState.Started) &&
                        <a href="#" className="ui-btn" onClick={() => this.timer.pause()}>Pause</a>
                    }
                    </footer>
                    <div id="progressHolder">
                        <CircularProgressbar percentage={state.progress} strokeWidth={4} styles={{trail: { stroke: "black" }}}/>
                    </div>
               </div>;
    }
}
