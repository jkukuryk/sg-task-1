import { GameTemplate } from '../Game';
import { FireEmitter } from './FireEmitter';
import flame1 from 'assets/fire/flame1.png';
import flame2 from 'assets/fire/flame2.png';
import flame3 from 'assets/fire/flame3.png';
import itsFine from 'assets/fire/itsFine.png';

export class Fire extends GameTemplate {
    fire?: FireEmitter;

    constructor() {
        super([
            [flame1, 'flame1'],
            [flame2, 'flame2'],
            [flame3, 'flame3'],
            [itsFine, 'itsFine'],
        ]);
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
