import { Texture } from 'pixi.js';
import flameImage from 'assets/fire/flame.png';
import flameImage2 from 'assets/fire/flame2.png';

export const flameOptions = {
    lifetime: {
        min: 0.5,
        max: 0.5,
    },
    frequency: 0.008,
    spawnChance: 1,
    particlesPerWave: 1,
    emitterLifetime: 0.31,
    maxParticles: 1000,
    pos: {
        x: 0,
        y: 0,
    },
    addAtBack: false,
    behaviors: [
        {
            type: 'alpha',
            config: {
                alpha: {
                    list: [
                        {
                            value: 0.28,
                            time: 0,
                        },
                        {
                            value: 0,
                            time: 1,
                        },
                    ],
                },
            },
        },
        {
            type: 'scale',
            config: {
                scale: {
                    list: [
                        {
                            value: 0.16,
                            time: 0,
                        },
                        {
                            value: 0.75,
                            time: 1,
                        },
                    ],
                },
            },
        },
        {
            type: 'color',
            config: {
                color: {
                    list: [
                        {
                            value: 'ffe733',
                            time: 0,
                        },
                        {
                            value: 'fa2828',
                            time: 1,
                        },
                    ],
                },
            },
        },
        {
            type: 'moveSpeed',
            config: {
                speed: {
                    list: [
                        {
                            value: 1,
                            time: 0,
                        },
                        {
                            value: 100,
                            time: 1,
                        },
                    ],
                    isStepped: false,
                },
            },
        },
        {
            type: 'rotationStatic',
            config: {
                min: 260,
                max: 290,
            },
        },
        {
            type: 'spawnShape',
            config: {
                type: 'rect',
                data: {
                    x: 0,
                    y: 0,
                    w: 70,
                    h: 5,
                },
            },
        },
        {
            type: 'textureRandom',
            config: {
                texture: [Texture.from(flameImage), Texture.from(flameImage2)],
            },
        },
    ],
};
