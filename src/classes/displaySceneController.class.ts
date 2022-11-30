import { Container, Sprite, Texture } from 'pixi.js';
import { LAYER_MENU } from 'src/constants/layers';
import { createContainer } from '..';
import buttonImage from 'assets/ui/buttonEmpty.png';
import buttonTextImage from 'assets/ui/menuText.png';
import { MonoBehavior } from './monoBehavior';
import { TilingSprite } from '@pixi/sprite-tiling';
import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';
gsap.registerPlugin(PixiPlugin);

enum Scenes {
    MENU = 'menu',
    CARDS = 'cards',
    IMAGES = 'images',
    FIRE = 'fire',
}

export class DisplaySceneController extends MonoBehavior {
    scene: Scenes;
    menuContainer: Container;

    constructor() {
        super();
        this.scene = Scenes.MENU;
        this.menuContainer = createContainer(LAYER_MENU);
        this.drawMenu();
    }

    drawMenu() {
        const textScale = 0.91;
        const textCellSize = [600, 183 / 3];
        const button1 = Sprite.from(buttonImage);
        const button2 = Sprite.from(buttonImage);
        const button3 = Sprite.from(buttonImage);

        const textSprite = Texture.from(buttonTextImage);

        const button1Text = new TilingSprite(textSprite, textCellSize[0], textCellSize[1]);
        const button2Text = new TilingSprite(textSprite, textCellSize[0], textCellSize[1]);
        const button3Text = new TilingSprite(textSprite, textCellSize[0], textCellSize[1]);
        button1Text.anchor.set(0.5);
        button2Text.anchor.set(0.5);
        button3Text.anchor.set(0.5);

        button1Text.scale.set(textScale, textScale);
        button2Text.scale.set(textScale, textScale);
        button3Text.scale.set(textScale, textScale);

        button2Text.tilePosition.set(0, -textCellSize[1]);
        button3Text.tilePosition.set(0, -textCellSize[1] * 2);

        button1.addChild(button1Text);
        button2.addChild(button2Text);
        button3.addChild(button3Text);

        button1.anchor.set(0.5);
        button2.anchor.set(0.5);
        button3.anchor.set(0.5);

        const cardsButton = createContainer(1, false, this.menuContainer);
        cardsButton.addChild(button1);
        cardsButton.y = -200;

        const imagesButton = createContainer(1, false, this.menuContainer);
        imagesButton.addChild(button2);
        imagesButton.y = 0;

        const fireButton = createContainer(1, false, this.menuContainer);
        fireButton.addChild(button3);
        fireButton.y = 200;
        this.menuContainer.alpha = 0;
        this.menuContainer.y = -300;
        this.showMenu();
    }
    changeScene(scene: Scenes) {
        switch (scene) {
            case Scenes.MENU:
                this.showMenu();
        }
    }
    showMenu() {
        console.log('gsap');
        gsap.fromTo(
            this.menuContainer,
            {
                alpha: 0,
                y: -300,
            },
            {
                alpha: 1,
                y: 0,
                duration: 1,
            }
        );
    }
}
