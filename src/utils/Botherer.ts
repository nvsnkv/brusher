import * as navigator from "../definitions/navigator";

export class Botherer {
    bother(): void {
        navigator.vibrate([200, 100, 200]);
    }

    disturb(): void {
        navigator.vibrate([200, 100, 200, 100, 300]);
    }
}
