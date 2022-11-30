import { getScreenSize, refreshScreenSize } from 'helper/screen';
import { Application, autoDetectRenderer, ICanvas, IRenderer } from 'pixi.js';

export class Game {
    app: Application;
    renderer: IRenderer<ICanvas>;

    constructor() {
        const { width, height } = getScreenSize();

        this.onResize = this.onResize.bind(this);
        this.refresh = this.refresh.bind(this);

        this.app = new Application({
            width,
            height,
            resolution: window.devicePixelRatio,
            autoDensity: true,
            antialias: true,
            background: 0xe5ffce,
        });
        this.renderer = autoDetectRenderer();

        const container = document.getElementById('game');
        if (container) {
            container.appendChild(this.app.view);
            window.addEventListener('resize', this.onResize);

            window.requestAnimationFrame(this.refresh);
        } else {
            console.error('cant find #game in body');
        }
    }

    onResize() {
        const { width, height } = refreshScreenSize();
        this.app.renderer.view.style.width = width + 'px';
        this.app.renderer.view.style.height = height + 'px';
    }
    refresh() {
        window.requestAnimationFrame(this.refresh);
        this.renderer.render(this.app.stage);
    }
}
