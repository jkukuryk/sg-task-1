import click from './assets/TJSCXEW-interface-confirm.mp3';
import flipCard from './assets/cardsound32562-37691.mp3';

export enum SoundsType {
    click = 'click',
    flipCard = 'flipCard',
}

export const Sounds = {
    [SoundsType.click]: click,
    [SoundsType.flipCard]: flipCard,
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
] as unknown as SoundObject[];

export const getSoundAssets = () => {
    return soundManagerAssets;
};
