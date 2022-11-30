import '../public/index.css';
import backgroundImage from 'assets/background/geometric-1732847.jpg';
import { Game } from './classes/game';
import { Container } from 'pixi.js';
import { GameBackground } from './classes/backgroundGame.class';
import { FPSInfo } from './classes/FPSInfo.class';
let game: Game;

window.onload = () => {
    game = new Game();
    new FPSInfo();
    new GameBackground(backgroundImage, 1000, 2000);
};

export function createContainer(zIndex = 1, sortableChildren = false, parent?: Container) {
    const container = new Container();
    container.zIndex = zIndex;
    container.sortableChildren = sortableChildren;

    if (parent) {
        parent.addChild(container);
    }
    return game.stageContainer.addChild(container);
}

export const getGame = () => {
    return game;
};
