import click from './assets/TJSCXEW-interface-confirm.mp3';

export enum SoundsType {
    click = 'click',
}

export const Sounds = {
    [SoundsType.click]: click,
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
] as unknown as SoundObject[];

export const getSoundAssets = () => {
    return soundManagerAssets;
};
