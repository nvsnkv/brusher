import * as React from "react";
import CircularProgressbar from "react-circular-progressbar";

import {IMultiTimer} from "../timer/IMultiTimer";
import {TimerState} from "../timer/TimerState";

interface ITimerProps { timer: IMultiTimer; }
interface ITimerState { state: TimerState; progress: number; }

export class TimerPage extends React.Component<ITimerProps, ITimerState> {
    private timer: IMultiTimer;
    private debouncedState: ITimerState;

    constructor(props: ITimerProps) {
        super(props);

        this.timer = props.timer;
        this.debouncedState = {
            state: TimerState.Stopped,
            progress: -1
        };

        this.timer.onStateChanged.add((state) => this.updateState(state, null));
        this.timer.onProgressChanged.add((progress) => this.updateState(null, progress));

        this.updateState(null, null);
    }

    private  updateState(timerState?: TimerState, progress?: number): void {
        if (timerState !== null) {
            this.debouncedState.state = timerState;
        }

        if (progress != null) {
            this.debouncedState.progress = progress;
        }

        this.setState(this.debouncedState);
    }

    render(): JSX.Element {
        const state = this.state as ITimerState;
        return <div className="ui-page ui-page-active" id="main">
                    <div className="ui-content content-padding">
                        <img src="assets/toothbrush-360.png" width="242" height="242" className="logo" />
                    </div>
                    <footer className="ui-footer ui-bottom-button" id="footer">
                    {(state.state === TimerState.Stopped) &&
                        <a href="#" className="ui-btn" onClick={() => this.timer.start()}>Start</a>
                    }
                    {(state.state === TimerState.Paused) &&
                        <a href="#" className="ui-btn" onClick={() => this.timer.start()}>Resume</a>
                    }
                    {(state.state === TimerState.Started) &&
                        <a href="#" className="ui-btn" onClick={() => this.timer.pause()}>Pause</a>
                    }
                    </footer>
                    <div id="progressHolder">
                        <CircularProgressbar percentage={state.progress} strokeWidth={4} styles={{trail: { stroke: "black" }}}/>
                    </div>
               </div>;
    }
}
