import { Emitter } from '@pixi/particle-emitter';
import { MonoBehavior } from 'classes/monoBehavior';
import gsap from 'gsap';
import { Container, Sprite } from 'pixi.js';
import { LAYER_GAME } from 'src/constants/layers';
import { createContainer } from 'src/index';
import { flameOptions } from './options/flame';
import { sparksOptions } from './options/sparks';

export class FireEmitter extends MonoBehavior {
    flameEmitter: Emitter;
    sparksEmitter: Emitter;
    container: Container;

    constructor() {
        super();
        this.update = this.update.bind(this);
        this.container = createContainer(LAYER_GAME, false);
        this.container.x = 0;
        this.container.y = 900;

        this.flameEmitter = new Emitter(this.container, flameOptions);
        this.sparksEmitter = new Emitter(this.container, sparksOptions);

        const itsFine = Sprite.from('itsFine');
        itsFine.scale.set(0.4);
        itsFine.anchor.set(0.5);
        itsFine.y = 100;
        itsFine.x = -100;
        this.container.addChild(itsFine);
        gsap.to(this.container, { y: 0, duration: 1 });
    }

    update(deltaTime: number): void {
        this.flameEmitter.update(deltaTime * 0.001);
        this.flameEmitter.emit = true;
        this.sparksEmitter.update(deltaTime * 0.001);
        this.sparksEmitter.emit = true;
    }

    destroy() {
        if (this.container.parent) {
            this.container.parent.removeChild(this.container);
        }
    }
}
