import { Assets } from 'pixi.js';
export class GameTemplate {
    constructor(assets: [string, string][]) {
        this.loadAssets(assets);
    }
    destroy() {
        //destroy containers
    }
    async loadAssets(assets: [string, string][]) {
        const loadNames = [] as string[];
        assets.forEach((asset) => {
            loadNames.push(asset[1]);
            Assets.add(asset[1], asset[0]);
        });

        const loadedAssets = await Assets.load(loadNames);
        if (loadedAssets) {
            this.start();
        }
    }
    start() {
        //all assets loaded;
    }
}
