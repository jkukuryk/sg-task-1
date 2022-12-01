import { GameTemplate } from '../Game';
import FontFaceObserver from 'fontfaceobserver';
import { ImageGenerator, fonts, fontLoaded } from './ImageGenerator';
import emoji from 'assets/emoji/smileys-emotion-00.png';

export class ImageManipulation extends GameTemplate {
    imageInstance: ImageGenerator;
    constructor() {
        super([emoji, 'emoji']);
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
