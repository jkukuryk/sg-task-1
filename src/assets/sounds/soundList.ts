import click from './assets/TJSCXEW-interface-confirm.mp3';
import putCard from './assets/cardsound32562-37691.mp3';
import flipCard from './assets/flipcard-91468.mp3';

export enum SoundsType {
    click = 'click',
    flipCard = 'flipCard',
    putCard = 'putCard',
}

export const Sounds = {
    [SoundsType.click]: click,
    [SoundsType.flipCard]: flipCard,
    [SoundsType.putCard]: putCard,
};
type SoundObject = {
    name: SoundsType;
    src: string;
    loop: boolean;
    autoplay: boolean;
    volume?: number;
};

const soundManagerAssets = [
    {
        name: SoundsType.click,
        src: Sounds[SoundsType.click],
        loop: false,
        autoplay: false,
        volume: 0.3,
    },
    {
        name: SoundsType.flipCard,
        src: Sounds[SoundsType.flipCard],
        loop: false,
        autoplay: false,
        volume: 0.6,
    },
    {
        name: SoundsType.putCard,
        src: Sounds[SoundsType.putCard],
        loop: false,
        autoplay: false,
        volume: 0.3,
    },
] as unknown as SoundObject[];

export const getSoundAssets = () => {
    return soundManagerAssets;
};
