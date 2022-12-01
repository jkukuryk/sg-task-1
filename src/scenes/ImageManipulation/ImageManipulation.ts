import { GameTemplate } from '../Game';
import FontFaceObserver from 'fontfaceobserver';
import { ImageGenerator, fonts, fontLoaded } from './ImageGenerator';

export class ImageManipulation extends GameTemplate {
    imageInstance: ImageGenerator;
    constructor() {
        super();
        this.imageInstance = new ImageGenerator();

        fonts.forEach((fontName) => {
            if (!fontLoaded.includes(fontName)) {
                const font = new FontFaceObserver(fontName);
                font.load().then(function () {
                    fontLoaded.push(fontName);
                });
            }
        });
    }
    destroy(): void {
        this.imageInstance.destroy();
    }
}
