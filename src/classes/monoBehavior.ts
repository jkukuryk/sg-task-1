import { refreshScreenSize } from 'helper/screen';

type Time = {
    now: number;
    deltaTime: number;
};

export class MonoBehavior {
    time: Time;
    lastTime: number;
    resizeTimeout?: ReturnType<typeof setTimeout>;

    constructor(option?: { resizeListener: boolean }) {
        this.lastTime = performance.now();
        this.time = { now: performance.now(), deltaTime: 0 };

        this.beforeUpdate = this.beforeUpdate.bind(this);
        this.resizeFunction = this.resizeFunction.bind(this);
        this.runResizeTimeout = this.runResizeTimeout.bind(this);

        window.requestAnimationFrame(this.beforeUpdate);

        if (option?.resizeListener) {
            window.addEventListener('resize', this.runResizeTimeout);
        }
    }

    beforeUpdate() {
        window.requestAnimationFrame(this.beforeUpdate);
        const now = performance.now();
        const delta = now - this.lastTime;
        this.time = { deltaTime: delta, now: now };
        this.lastTime = now;
        this.update(delta);
    }
    update(deltaTime: number): void {
        //prototype function;
    }
    resizeFunction() {
        const { width, height } = refreshScreenSize();
        this.onResize(width, height);
    }
    onResize(width: number, height: number): void {
        //prototype function;
    }

    runResizeTimeout() {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(this.resizeFunction, 100);
    }
}
