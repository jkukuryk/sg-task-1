import { getScreenSize, refreshScreenSize } from 'helper/screen';
import { Application, Container } from 'pixi.js';

export class Game {
    app: Application;
    stageContainer: Container;
    resizeTimeout: ReturnType<typeof setTimeout>;

    constructor() {
        const { width, height } = getScreenSize();

        this.onResize = this.onResize.bind(this);
        this.refresh = this.refresh.bind(this);
        this.runResizeTimeout = this.runResizeTimeout.bind(this);
        this.stageContainer = new Container();
        this.resizeTimeout = setTimeout(this.onResize, 100);

        this.app = new Application({
            width,
            height,
            resolution: window.devicePixelRatio,
            autoDensity: true,
            antialias: true,
            background: 0xe5ffce,
        });

        const container = document.getElementById('game');
        if (container) {
            container.appendChild(this.app.view);

            this.stageContainer.sortableChildren = true;
            this.app.stage.addChild(this.stageContainer);

            window.addEventListener('resize', this.runResizeTimeout);
            window.requestAnimationFrame(this.refresh);
        } else {
            console.error('cant find #game in body');
        }
    }
    runResizeTimeout() {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(this.onResize, 100);
    }
    onResize() {
        const { width, height } = refreshScreenSize();
        this.app.renderer.resize(width, height);
    }
    refresh() {
        window.requestAnimationFrame(this.refresh);
        this.app.renderer.render(this.app.stage);
    }
}
