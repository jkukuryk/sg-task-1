import { getScreenSize } from 'helper/screen';
import { Container, Sprite } from 'pixi.js';
import { createAbsoluteContainer } from 'src';
import { MonoBehavior } from './monoBehavior';

export class GameBackground extends MonoBehavior {
    container: Container;
    resolution: { width: number; height: number };
    sprite: Sprite;
    spriteWidth: number;
    spriteHeight: number;

    constructor(image: string, spriteWidth: number, spriteHeight: number) {
        super({ resizeListener: true });
        this.onResize = this.onResize.bind(this);

        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.resolution = getScreenSize();

        this.sprite = Sprite.from(image);
        this.sprite.anchor.set(0.5);

        this.container = createAbsoluteContainer(1);
        this.container.addChild(this.sprite);
        const { width, height } = getScreenSize();
        this.onResize(width, height);
    }

    onResize(screenWidth: number, screenHeight: number) {
        this.resolution = getScreenSize();
        if (this.sprite) {
            const ratioX = screenWidth / this.spriteWidth;
            const ratioY = screenHeight / this.spriteHeight;
            const coverRatio = Math.max(ratioX, ratioY);

            this.sprite.x = screenWidth / 2;
            this.sprite.y = screenHeight / 2;
            this.sprite.width = coverRatio * this.spriteWidth;
            this.sprite.height = coverRatio * this.spriteHeight;
        }
    }
}
