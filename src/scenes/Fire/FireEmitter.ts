import { MonoBehavior } from 'classes/monoBehavior';

export class FireEmitter extends MonoBehavior {
    constructor() {
        super();
    }

    update(deltaTime: number): void {}

    destroy() {
        console.log('destroy');
    }
}
