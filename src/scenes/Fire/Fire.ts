import { Container } from 'pixi.js';
import { LAYER_GAME } from 'src/constants/layers';
import { createContainer } from '../..';
import { GameTemplate } from '../Game';
import { FireEmitter } from './FireEmitter';
import flame1 from 'assets/fire/flame1.png';
import flame2 from 'assets/fire/flame2.png';

export class Fire extends GameTemplate {
    fire?: FireEmitter;
    emitterContainer: Container;

    constructor() {
        super([
            [flame1, 'flame1'],
            [flame2, 'flame2'],
        ]);
        this.emitterContainer = createContainer(LAYER_GAME, true);
    }
    destroy(): void {
        if (this.fire) {
            this.fire.destroy();
        }
    }
    start() {
        this.fire = new FireEmitter();
    }
}
