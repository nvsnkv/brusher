import * as navigator from "../definitions/navigator";
import * as tizen from "../definitions/tizen";

export class Botherer {
    bother(): void {
        tizen.power.request("SCREEN", "SCREEN_DIM");
        navigator.vibrate([200, 100, 200]);
        window.setTimeout(() => tizen.power.release("SCREEN"), 500);
    }

    disturb(): void {
        tizen.power.request("SCREEN", "SCREEN_DIM");
        navigator.vibrate([200, 100, 200, 300]);
        window.setTimeout(() => tizen.power.release("SCREEN"), 800);
    }
}
