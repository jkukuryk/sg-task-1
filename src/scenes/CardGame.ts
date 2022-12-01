import { Container, Graphics, Sprite, Texture } from 'pixi.js';
import { TilingSprite } from '@pixi/sprite-tiling';

import cardsImage from 'assets/cards/cartoon.jpg';
import cardsTemplate from 'assets/cards/blankCard.png';
import { createContainer } from '..';
import { GameTemplate } from './Game';
import { degreesToRadians, lerp } from 'helper/math';
import { gsap, Power0 } from 'gsap';
import { SoundManager } from 'classes/soundManager';
import { SoundsType } from 'assets/sounds/soundList';
import { FPSInfo } from 'classes/fpsInfo.class';

const spriteSize = 3000;
const cardGridSize = 12;
const CARD_TOTAL = cardGridSize * cardGridSize;
const cardImageSize = spriteSize / cardGridSize;
const translationX = 0.3;
const translationY = 0.8;
const NEXT_CARD_TIME = 1000;
const cardSize = 250;

let topZIndex = 220;

type CardData = { container: Container; cardTexture: TilingSprite; order: number };
const startPosition = [-250, -50];
const endPosition = [150, 100];

export class CardGame extends GameTemplate {
    cards = [] as CardData[];
    gameContainer: Container;
    changeCardTimeout?: ReturnType<typeof setTimeout>;
    activeCard = -1;
    fps: FPSInfo;

    constructor() {
        super([
            [cardsImage, 'cardsImage'],
            [cardsTemplate, 'cardsTemplate'],
        ]);
        this.fps = new FPSInfo();
        this.runAnimation = this.runAnimation.bind(this);
        this.cards = [] as CardData[];
        this.gameContainer = createContainer(1, true);
        this.gameContainer.y = -900;
        this.gameContainer.alpha = 0;
    }
    drawMask() {
        const mask = new Graphics();
        mask.beginFill(0xffffff);
        mask.drawRoundedRect(-cardImageSize / 2, -cardImageSize / 2, cardImageSize, cardImageSize, 40);
        mask.endFill();
        return mask;
    }
    destroy() {
        clearTimeout(this.changeCardTimeout);
        this.fps.destroy();
        if (this.gameContainer.parent) {
            this.gameContainer.parent.removeChild(this.gameContainer);
        }
    }
    runAnimation() {
        if (this.activeCard > CARD_TOTAL) {
            clearTimeout(this.changeCardTimeout);
            return;
        }
        this.activeCard++;

        this.changeCardTimeout = setTimeout(this.runAnimation, NEXT_CARD_TIME);
        const topCard = this.cards[this.activeCard];
        if (this.activeCard + 1 < CARD_TOTAL) {
            const nextCard = this.cards[this.activeCard + 1];
            nextCard.cardTexture.visible = true;
        }
        topZIndex++;
        topCard.container.zIndex = topZIndex;
        SoundManager.play(SoundsType.flipCard);

        gsap.to(topCard.container, {
            rotation: degreesToRadians(-30 + Math.random() * 60),
            duration: 1,
            x: 0,
            y: lerp(120, -340, Math.random()),
            ease: Power0.easeInOut,
        }).then(() => {
            if (this.activeCard > 0 && this.activeCard < CARD_TOTAL - 1) {
                const bottomCard = this.cards[this.activeCard - 1];
                setTimeout(
                    (dataCard) => {
                        dataCard.cardTexture.visible = false;
                    },
                    3000,
                    bottomCard
                );
            }
            gsap.to(topCard.container, {
                x: endPosition[0] + topCard.order * translationX,
                y: endPosition[1] - topCard.order * translationY,
                height: lerp(0.8, 1, this.activeCard / CARD_TOTAL) * cardSize,
                width: lerp(0.8, 1, this.activeCard / CARD_TOTAL) * cardSize,
                duration: 1,
                rotation: 0,
            });
        });
    }
    start(): void {
        for (let card = 0; card < CARD_TOTAL; card++) {
            const cardContainer = createContainer(topZIndex - card, false, this.gameContainer);

            const cardBackground = Sprite.from(cardsTemplate);
            cardBackground.anchor.set(0.5);
            cardContainer.addChild(cardBackground);

            const row = Math.floor(card / cardGridSize);
            const col = Math.floor(card % cardGridSize);
            cardContainer.x = startPosition[0] + card * translationX;
            cardContainer.y = startPosition[1] + card * translationY;

            const mask = this.drawMask();
            cardContainer.addChild(mask);
            mask.x = 0;
            mask.y = 0;
            const cardImage = Texture.from(cardsImage);

            const cardTexture = new TilingSprite(cardImage, cardImageSize, cardImageSize);
            cardTexture.mask = mask;

            cardTexture.anchor.set(0.5);
            cardTexture.tilePosition.set(-cardImageSize * col, -cardImageSize * row);
            cardContainer.addChild(cardTexture);
            if (card !== 0) {
                cardTexture.visible = false;
            }
            this.cards.push({ container: cardContainer, cardTexture: cardTexture, order: card });
            this.gameContainer.addChild(cardContainer);
        }
        gsap.to(this.gameContainer, {
            alpha: 1,
            y: 0,
            duration: 1,
            delay: 0.4,
        }).then(() => {
            this.changeCardTimeout = setTimeout(this.runAnimation, NEXT_CARD_TIME);
        });
        setTimeout(() => {
            this.cards.forEach((card) => {
                card.container.width = lerp(1, 0.8, card.order / CARD_TOTAL) * cardSize;
                card.container.height = lerp(1, 0.8, card.order / CARD_TOTAL) * cardSize;
            });
        }, 100);
    }
}
