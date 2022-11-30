import { gameSize } from 'helper/gameSize';
import { getScreenSize, refreshScreenSize } from 'helper/screen';
import { Application, Container } from 'pixi.js';
import { LAYER_GAME } from 'src/constants/layers';

export class Game {
    app: Application;
    stageContainer: Container;
    gameContainer: Container;
    resizeTimeout: ReturnType<typeof setTimeout>;
    gameScale = 1;

    constructor() {
        const { width, height } = getScreenSize();

        this.onResize = this.onResize.bind(this);
        this.refresh = this.refresh.bind(this);
        this.runResizeTimeout = this.runResizeTimeout.bind(this);
        this.stageContainer = new Container();
        this.gameContainer = new Container();
        this.gameContainer.zIndex = LAYER_GAME;
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
            this.stageContainer.addChild(this.gameContainer);
            window.addEventListener('resize', this.runResizeTimeout);
            window.requestAnimationFrame(this.refresh);
            this.runResizeTimeout();
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
        const ratioX = width / gameSize[0];
        const ratioY = height / gameSize[1];
        this.gameScale = Math.min(ratioX, ratioY);
        this.gameContainer.x = width / 2;
        this.gameContainer.y = height / 2;
        this.gameContainer.scale.x = this.gameScale;
        this.gameContainer.scale.y = this.gameScale;
    }
    refresh() {
        window.requestAnimationFrame(this.refresh);
        this.app.renderer.render(this.app.stage);
    }
}
