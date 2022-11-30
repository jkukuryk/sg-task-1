import { createContainer } from 'src';

export class BackgroundGame {
    image: string;

    constructor(image: string) {
        this.image = image;
        this.draw();
    }

    draw() {
        const container = createContainer();
        container.addImage(image);
    }
}
