import { Container, Sprite, Texture } from 'pixi.js';
import { LAYER_MENU } from 'src/constants/layers';
import { createContainer } from '..';
import buttonImage from 'assets/ui/buttonEmpty.png';
import buttonTextImage from 'assets/ui/menuText.png';
import backToMenuImage from 'assets/ui/menuBack.png';
import { TilingSprite } from '@pixi/sprite-tiling';
import { Back, gsap } from 'gsap';
import { SoundsType } from 'assets/sounds/soundList';
import { GameTemplate } from 'src/scenes/Game';
import { gameSize } from 'helper/gameSize';
import { SoundManager } from 'classes/soundManager';
import { Scenes, demoScenes } from 'src/constants/scenes';

export class MainMenu extends GameTemplate {
    menuContainer: Container;
    menuButtons: Container[];
    onChangeScene: (scene: Scenes) => void;
    scene = Scenes.MENU;

    constructor(onChangeScene: (scene: Scenes) => void) {
        super([
            [buttonImage, 'buttonImage'],
            [buttonTextImage, 'buttonTextImage'],
            [backToMenuImage, 'backToMenuImage'],
        ]);
        this.onChangeScene = onChangeScene;
        this.menuContainer = createContainer(LAYER_MENU);
        this.menuButtons = [] as Container[];
    }
    start() {
        this.show();
    }

    show() {
        this.scene = Scenes.MENU;
        this.drawMenu();
    }

    drawMenu() {
        this.removeMenu();
        this.menuButtons = [] as Container[];
        this.menuContainer = createContainer(LAYER_MENU);
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
                if (this.scene === Scenes.MENU) {
                    this.fadeButtons();
                    this.changeScene(demoScenes[scene]);
                    SoundManager.play(SoundsType.click, 0, true);
                }
            });
            button.name = demoScenes[scene];
            this.menuButtons.push(button);
        }

        this.menuContainer.alpha = 0;
        this.menuContainer.y = -300;
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

    drawBackToMenu() {
        this.removeMenu();
        this.menuContainer = createContainer(LAYER_MENU);

        const button = Sprite.from(backToMenuImage);
        button.anchor.set(0.5);
        this.menuContainer.addChild(button);

        this.menuContainer.x = 0;
        this.menuContainer.y = -gameSize[1] / 2;
        this.menuContainer.scale.set(0.4);
        this.menuContainer.interactive = true;
        this.menuContainer.on('pointerdown', () => {
            this.changeScene(Scenes.MENU);
            SoundManager.play(SoundsType.click, 0, true);
        });

        gsap.fromTo(
            this.menuContainer,
            {
                alpha: 0,
                y: -gameSize[1],
            },
            {
                alpha: 1,
                y: -gameSize[1] / 2 + 90,
                duration: 1,
            }
        );
    }

    fadeButtons() {
        const activeBtn = this.menuButtons.find((btn) => btn.name === this.scene);
        if (activeBtn) {
            gsap.to(activeBtn, {
                width: activeBtn.width * 1.5,
                height: activeBtn.height * 1.5,
                alpha: 0,
                duration: 0.4,
                ease: Back.easeInOut,
            });
        }

        gsap.to(this.menuContainer, { y: 300, alpha: 0, delay: 0.5, duration: 0.4, ease: Back.easeIn }).then(() => {
            this.removeMenu();
            this.drawBackToMenu();
        });
    }

    removeMenu() {
        if (this.menuContainer.parent) this.menuContainer.parent.removeChild(this.menuContainer);
    }
    changeScene(scene: Scenes) {
        this.onChangeScene(scene);
        this.scene = scene;
    }
}
