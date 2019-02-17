

declare const tau: TAU.TizenAdvancedUI
export = tau;
export as namespace TAU;

declare global {
    namespace TAU {
        type TizenAdvancedUI = {
            event : IEventApi
        }
    
        interface IEventApi {
            enableGesture: (node: HTMLElement, strategy: any) => void;
            disableGesture: (node: HTMLElement) => void;
            gesture: IGestureStrategies
        }

        interface IGestureStrategies {
            Swipe: typeof SwipeStrategy;
        }

        class SwipeStrategy {
            constructor(options: {
                orientation?: string,
                velocity?: number,
                timeTreshold?: number
            })
        }

        interface IEvent<T> extends Event {
            readonly detail: T
        }

        interface ISwipeDetails {
            readonly direction: string;
        }

        // TODO: find a proper way to declare event strategies like gesture.Swipe and so on
        // new tau.event.gesture.Swipe()
    }    
}