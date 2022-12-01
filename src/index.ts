import '../public/index.css';
import backgroundImage from 'assets/background/geometric-1732847.jpg';
import { Game } from './classes/game';
import { Container } from 'pixi.js';
import { GameBackground } from './classes/backgroundGame.class';
import { DisplaySceneController } from './classes/displaySceneController.class';
import { SoundManager } from 'classes/soundManager';
import { getSoundAssets } from 'assets/sounds/soundList';

let game: Game;

window.onload = () => {
    SoundManager.init(getSoundAssets());
    game = new Game();
    new GameBackground(backgroundImage, 1000, 2000);
    new DisplaySceneController();
};

export function createContainer(zIndex = 1, sortableChildren = false, parent?: Container) {
    const container = new Container();
    container.zIndex = zIndex;
    container.sortableChildren = sortableChildren;

    if (parent) {
        return parent.addChild(container);
    }
    return game.gameContainer.addChild(container);
}

export function createAbsoluteContainer(zIndex = 1, sortableChildren = false) {
    const container = new Container();
    container.zIndex = zIndex;
    container.sortableChildren = sortableChildren;
    return game.stageContainer.addChild(container);
}
export const getGame = () => {
    return game;
};
