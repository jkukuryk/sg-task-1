import { sum } from 'lodash';
import { Container, Graphics, TextStyle, Text } from 'pixi.js';
import { LAYER_FPS } from 'src/constants/layers';
import { ONE_SECOND } from 'src/constants/time';
import { createAbsoluteContainer } from '..';
import { MonoBehavior } from './monoBehavior';

const defaultTimeStock = 4;
export class FPSInfo extends MonoBehavior {
    lastTime: number;
    style: TextStyle;
    container: Container;
    text: Text;
    timeArray: number[];
    timeStep: number;
    updateFPS: number;

    constructor(stock?: number) {
        super();
        this.timeStep = stock || defaultTimeStock;
        this.updateFPS = 0;
        this.lastTime = performance.now();
        this.style = new TextStyle({
            fill: 'white',
            fontFamily: 'Helvetica',
            fontSize: 12,
            fontWeight: 'bold',
        });
        this.container = createAbsoluteContainer(LAYER_FPS);
        this.draw();

        this.text = new Text('...', this.style);
        this.text.x = 15;
        this.text.y = 9;
        this.container.addChild(this.text);

        this.timeArray = [];
        for (let i = 0; i < this.timeStep; i++) {
            this.timeArray.push(60);
        }
    }

    update(deltaTime: number): void {
        this.timeArray.shift();
        const maxFPS = 60;
        const max = ONE_SECOND / maxFPS;
        const delta = deltaTime < max ? max : deltaTime;

        this.timeArray.push(1 / (delta / ONE_SECOND));
        const total = sum(this.timeArray);
        const fps = Math.ceil(total / this.timeStep);
        this.updateFPS++;
        if (this.updateFPS > this.timeStep) {
            this.text.text = `FPS: ${fps}`;
            this.updateFPS = 0;
        }
    }
    draw() {
        const rect = new Graphics();
        rect.beginFill(0x000000);
        rect.alpha = 0.8;
        rect.drawRect(0, 0, 80, 35);
        this.container.addChild(rect);
    }
    destroy() {
        if (this.container.parent) {
            this.container.parent.removeChild(this.container);
        }
    }
}
