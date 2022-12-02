import { MonoBehavior } from 'classes/monoBehavior';
import gsap, { Power0 } from 'gsap';
import { gameSize } from 'helper/gameSize';
import { Container, Graphics, TextStyle, Texture, Text } from 'pixi.js';
import { LAYER_GAME } from 'src/constants/layers';
import { ONE_SECOND } from 'src/constants/time';
import { createContainer } from 'src/index';
import { TilingSprite } from '@pixi/sprite-tiling';
import { degreesToRadians, lerp } from 'helper/math';
import { lipsum } from './lipsum';

enum AssetType {
    TEXT = 't',
    IMAGE = 'i',
}
const colors = [0xf94144, 0xf3722c, 0xf8961e, 0xf9c74f, 0x90be6d, 0x43aa8b, 0x577590];
export const fonts = ['Nerko One', 'Lobster', 'Zen Dots', 'Fredoka One', 'Josefin Sans'];
export const fontLoaded = [] as string[];
const generatorMatrix = ['ttt', 'iii', 'iit', 'iti', 'tii', 'itt', 'tit', 'tti'];
const imageSize = [gameSize[0] * 0.9, gameSize[1] * 0.8];
const positionRange = [imageSize[0] * 0.7, imageSize[1] * 0.7];

const emojiSize = 72;
const emojiCount = 135;
const emojiGrid = [16, 9];
import emoji from 'assets/emoji/smileys-emotion-00.png';

export class ImageGenerator extends MonoBehavior {
    imageContainer: Container;
    fontLoaded = false;
    lastImageTime = 0;
    emojiTexture: Texture;

    constructor() {
        super();
        this.imageContainer = createContainer(LAYER_GAME);
        this.imageContainer.y = -400;
        this.imageContainer.alpha = 0;
        this.emojiTexture = Texture.from(emoji);
    }

    update(deltaTime: number): void {
        if (!this.fontLoaded) {
            if (fontLoaded.length === fonts.length) {
                this.fontLoaded = true;
            } else {
                return;
            }
        }
        if (this.imageContainer.alpha === 0) {
            gsap.to(this.imageContainer, {
                alpha: 1,
                y: 0,
                duration: 1,
                ease: Power0.easeOut,
            });
        }
        const now = performance.now();
        if (this.lastImageTime + 2 * ONE_SECOND < now) {
            this.lastImageTime = now;
            this.drawNewImage();
        }
    }

    destroy() {
        if (this.imageContainer.parent) {
            this.imageContainer.parent.removeChild(this.imageContainer);
        }
    }
    clearCanvas() {
        while (this.imageContainer.children[0]) {
            this.imageContainer.removeChild(this.imageContainer.children[0]);
        }
    }
    drawNewImage() {
        this.clearCanvas();
        const matrix = generatorMatrix[Math.floor(Math.random() * generatorMatrix.length)].split('') as AssetType[];
        const background = colors[Math.floor(Math.random() * colors.length)];
        const bg = this.drawBackground(background);
        this.imageContainer.addChild(bg);
        const mask = this.drawBackground(0x000000);
        mask.x = 0;
        mask.y = 0;
        this.imageContainer.addChild(mask);
        this.imageContainer.mask = mask;

        matrix.forEach((type) => {
            const rotation = degreesToRadians(Math.random() * 360);

            const positionX = -positionRange[0] / 2 + Math.random() * positionRange[0];
            const positionY = -positionRange[1] / 2 + Math.random() * positionRange[1];

            if (type === AssetType.IMAGE) {
                const emojiSprite = new TilingSprite(this.emojiTexture, emojiSize, emojiSize);
                const emojiIndex = Math.floor(emojiCount * Math.random());
                const row = Math.floor(emojiIndex / emojiGrid[0]);
                const col = Math.floor(emojiIndex % emojiGrid[0]);
                emojiSprite.tilePosition.set(-row * emojiSize, -col * emojiSize);
                this.imageContainer.addChild(emojiSprite);
                emojiSprite.scale.set(lerp(2, 9, Math.random()));
                emojiSprite.anchor.set(0.5);
                emojiSprite.rotation = rotation;
                emojiSprite.x = positionX;
                emojiSprite.y = positionY;
            }
            if (type === AssetType.TEXT) {
                const textColor = colors.filter((color) => color !== background);

                const style = new TextStyle({
                    fontFamily: fonts[Math.floor(Math.random() * fonts.length)],
                    fontSize: lerp(50, 80, Math.random()),
                    fill: textColor[Math.floor(Math.random() * textColor.length)],
                });
                const drawText = new Text(lipsum[Math.floor(Math.random() * lipsum.length)], style);

                drawText.scale.set(lerp(2, 9, Math.random()));
                drawText.anchor.set(0.5);
                drawText.rotation = rotation;
                drawText.x = positionX;
                drawText.y = positionY;

                this.imageContainer.addChild(drawText);
            }
        });
    }

    drawBackground(color: number) {
        const bg = new Graphics();
        bg.beginFill(color);
        bg.drawRect(-imageSize[0] / 2, -imageSize[1] / 2, imageSize[0], imageSize[1]);
        bg.endFill();
        return bg;
    }
}
