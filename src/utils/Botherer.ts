import * as navigator from "../definitions/navigator";
import * as tizen from "../definitions/tizen";

export class Botherer {
    bother(): void {
        this.withScreen(() => navigator.vibrate([200, 100, 200]));
    }

    disturb(): void {
        this.withScreen(() => navigator.vibrate([200, 100, 200, 100, 300]));
    }

    private withScreen(action: () => void) {
        tizen.power.turnScreenOn();
        setTimeout(() => {
            action();
            setTimeout(() => tizen.power.turnScreenOff(), 500);
        }, 300);
    }
}
