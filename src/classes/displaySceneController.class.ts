import { Container, Sprite, Texture } from 'pixi.js';
import { LAYER_GAME, LAYER_MENU } from 'src/constants/layers';
import { createContainer } from '..';
import buttonImage from 'assets/ui/buttonEmpty.png';
import buttonTextImage from 'assets/ui/menuText.png';
import { MonoBehavior } from './monoBehavior';
import { TilingSprite } from '@pixi/sprite-tiling';
import { Back, gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';
import { SoundManager } from './soundManager';
import { SoundsType } from 'assets/sounds/soundList';
import { CardGame } from 'src/scenes/CardGame';
import { GameTemplate } from 'src/scenes/Game';
gsap.registerPlugin(PixiPlugin);

enum Scenes {
    MENU = 'menu',
    CARDS = 'cards',
    IMAGES = 'images',
    FIRE = 'fire',
}
const demoScenes = [Scenes.CARDS, Scenes.IMAGES, Scenes.FIRE];

export class DisplaySceneController extends MonoBehavior {
    scene: Scenes;
    menuContainer: Container;
    currentGame: GameTemplate;
    menuButtons: Container[];
    constructor() {
        super();
        this.scene = Scenes.MENU;
        this.currentGame = new GameTemplate();
        this.menuContainer = createContainer(LAYER_MENU);
        this.menuButtons = [] as Container[];
        this.drawMenu();
    }

    drawMenu() {
        const textScale = 0.91;
        const textCellSize = [600, 183 / 3];
        const textSprite = Texture.from(buttonTextImage);
        const buttonHeight = 200;

        for (let scene = 0; scene < demoScenes.length; scene++) {
            const spriteButton = Sprite.from(buttonImage);
            const textTexture = new TilingSprite(textSprite, textCellSize[0], textCellSize[1]);
            spriteButton.anchor.set(0.5);
            textTexture.scale.set(textScale, textScale);
            textTexture.anchor.set(0.5);

            textTexture.tilePosition.set(0, -textCellSize[1] * scene);
            spriteButton.addChild(textTexture);
            const button = createContainer(1, false, this.menuContainer);
            button.addChild(spriteButton);
            button.y = -buttonHeight + buttonHeight * scene;
            button.interactive = true;
            button.on('pointerdown', () => {
                this.changeScene(demoScenes[scene]);
                SoundManager.play(SoundsType.click, 0, true);
            });
            button.name = demoScenes[scene];
            this.menuButtons.push(button);
        }

        this.menuContainer.alpha = 0;
        this.menuContainer.y = -300;
        this.showMenu();
    }

    changeScene(scene: Scenes) {
        this.scene = scene;

        switch (scene) {
            case Scenes.MENU:
                this.drawMenu();
                break;
            default:
                this.fadeButtons();
                this.startGame();
                break;
        }
    }
    startGame() {
        switch (this.scene) {
            case Scenes.CARDS:
                this.removeGame(); //to be sure that container is empty;
                this.gameContainer = createContainer(LAYER_GAME);
                this.currentGame = new CardGame();
                break;
        }
    }
    fadeButtons() {
        const activeBtn = this.menuButtons.find((btn) => btn.name === this.scene);

        if (activeBtn) {
            gsap.to(activeBtn, {
                width: activeBtn.width * 1.5,
                height: activeBtn.height * 1.5,
                alpha: 0,
                delay: 0.1,
                duration: 1,
                ease: Back.easeInOut,
            });
        }
        gsap.to(this.menuContainer, { y: 300, alpha: 0, delay: 0.5, duration: 0.4, ease: Back.easeIn }).then(() => {
            this.removeMenu();
        });
    }
    showMenu() {
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
    removeMenu() {
        this.menuContainer.parent.removeChild(this.menuContainer);
    }
    removeGame() {
        this.currentGame.destroy();
    }
}
