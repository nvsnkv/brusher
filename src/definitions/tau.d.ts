

declare const tau: TAU.TizenAdvancedUI
export = tau;
export as namespace TAU;

declare global {
    namespace TAU {
        type TizenAdvancedUI = {
            event : IEventApi
        }
    
        interface IEventApi {
            enableGesture: (node: HTMLElement, event: IEvent<{}>) => void;
            disableGesture: (node: HTMLElement) => void;
            
            gesture: IGestures,
        }

        interface IGestures {
            Swipe: (definition: ISwipeEventDefinition) => IEvent<ISwipeDetails>;
        }

        interface IEvent<T> extends Event {
            readonly detail: T
        }

        interface ISwipeEventDefinition {
            velocity?: number,
            orientation?: string,
            timeTreshold?: number
        }

        interface ISwipeDetails {
            direction: string;
        }
    }    
}