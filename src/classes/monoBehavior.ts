type Time = {
    now: number;
    deltaTime: number;
};

export class MonoBehavior {
    time: Time;
    lastTime: number;

    constructor() {
        this.lastTime = Date.now();
        this.time = { now: Date.now(), deltaTime: 0 };
    }

    update() {
        const now = Date.now();
        const delta = now - this.lastTime;
        this.time = { deltaTime: delta, now: now };
        this.update();
        this.lastTime = now;
    }
}
