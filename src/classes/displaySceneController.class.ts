import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';
import { Scenes } from 'src/constants/scenes';
import { CardGame } from 'src/scenes/CardGame';
import { Fire } from 'src/scenes/Fire/Fire';
import { GameTemplate } from 'src/scenes/Game';
import { ImageManipulation } from 'src/scenes/ImageManipulation/ImageManipulation';
import { MainMenu } from 'src/scenes/MainMenu';
gsap.registerPlugin(PixiPlugin);

export class DisplaySceneController {
    scene: Scenes;
    currentGame?: GameTemplate;
    mainMenu: MainMenu;

    constructor() {
        this.scene = Scenes.MENU;
        this.changeScene = this.changeScene.bind(this);
        this.mainMenu = new MainMenu(this.changeScene);
    }

    changeScene(scene: Scenes) {
        this.scene = scene;

        switch (scene) {
            case Scenes.MENU:
                this.removeGame();
                this.mainMenu.show();
                break;
            default:
                this.startGame();
                break;
        }
    }
    startGame() {
        switch (this.scene) {
            case Scenes.CARDS:
                this.removeGame(); //to be sure that container is empty;
                this.currentGame = new CardGame();
                break;
            case Scenes.IMAGES:
                this.removeGame(); //to be sure that container is empty;
                this.currentGame = new ImageManipulation();
                break;
            case Scenes.FIRE:
                this.removeGame(); //to be sure that container is empty;
                this.currentGame = new Fire();
                break;
        }
    }

    removeGame() {
        if (this.currentGame) {
            this.currentGame.destroy();
        }
    }
}
