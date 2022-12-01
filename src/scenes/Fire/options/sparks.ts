export const sparksOptions = {
    lifetime: {
        min: 1,
        max: 3,
    },
    frequency: 0.008,
    spawnChance: 1,
    particlesPerWave: 1,
    emitterLifetime: 0.1,
    maxParticles: 10,
    pos: {
        x: 0,
        y: 300,
    },
    addAtBack: false,
    behaviors: [
        {
            type: 'alpha',
            config: {
                alpha: {
                    list: [
                        {
                            value: 1,
                            time: 0,
                        },
                        {
                            value: 0.8,
                            time: 0.8,
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
                            value: 0.1,
                            time: 0,
                        },

                        {
                            value: 0.07,
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
                            value: 'ffe733',
                            time: 0.7,
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
            type: 'moveSpeedStatic',
            config: {
                min: 300,
                max: 400,
            },
        },
        {
            type: 'rotation',
            config: {
                accel: 0,
                minSpeed: -90,
                maxSpeed: 90,
                minStart: 270,
                maxStart: 280,
            },
        },
        {
            type: 'spawnShape',
            config: {
                type: 'rect',
                data: {
                    x: -150,
                    y: 0,
                    w: 300,
                    h: 24,
                },
            },
        },
        {
            type: 'textureRandom',
            config: {
                textures: ['flame1', 'flame2', 'flame3'],
            },
        },
        {
            type: 'blendMode',
            config: {
                blendMode: 'screen',
            },
        },
    ],
};
