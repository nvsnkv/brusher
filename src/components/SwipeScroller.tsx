import * as React from "react";
import * as tau from "../definitions/tau";

enum ScrollDirection {
    Left,
    Right
}

export class SwipeScroller extends React.Component<{}, { page: number, style: React.CSSProperties }> {

    private static width: 360;
    
    private container: HTMLDivElement;
    private readonly swipeHandler: (e: TAU.IEvent<TAU.ISwipeDetails>) => void;

    constructor() {
        super({});

        this.state = {
            page: 0,
            style: {
                left: 0
            }
        };

        const that = this;
        this.swipeHandler = (e: TAU.IEvent<TAU.ISwipeDetails>) => {
            const direction = e.detail.direction == "left" ? ScrollDirection.Left : ScrollDirection.Right;
            that.swipe(direction);
        };
    }

    render(): JSX.Element {
        return <div ref={(elem) => this.container = elem} className="swipe-scroller" style={this.state.style}>
            { this.props.children }
        </div>;
    }

    componentDidMount(): void {
        tau.event.enableGesture(this.container, new tau.event.gesture.Swipe({
            orientation: "horizontal"
        }));

        this.container.addEventListener("swipe", this.swipeHandler);
    }

    componentWillUnmount(): void {
        this.container.removeEventListener("swipe", this.swipeHandler);
        tau.event.disableGesture(this.container);
    }

    back(): boolean {
       return this.swipe(ScrollDirection.Left);
    }
    
    private swipe(direction: ScrollDirection): boolean {

        const multiplier = direction == ScrollDirection.Right ? 1 : -1;
        const page = this.state.page + multiplier;

        if (page == 0 || page == React.Children.count(this.props.children) - 1) {
            return false;
        }

        this.setState({
            page,
            style: {
                left: page * SwipeScroller.width * multiplier
            }
        });
    }
}
