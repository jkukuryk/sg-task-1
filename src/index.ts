import '../public/index.css';
import backgroundImage from 'assets/background/geometric-1732847.jpg';
import { Game } from './classes/game';
import { Container } from 'pixi.js';
let game: Game;

window.onload = () => {
    startGame();
};

function startGame() {
    game = new Game();
    // new GameBackground(backgroundImage);
}
export function createContainer() {
    const container = new Container();
    return game.app.stage.addChild(container);
}

export const getGame = () => {
    return game;
};
