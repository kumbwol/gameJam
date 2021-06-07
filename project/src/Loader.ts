import * as PIXI from 'pixi.js';

export class Loader
{
	constructor(loader: PIXI.Loader, callback: any)
	{
		loader
			.add("successAnimJSON", "./project/assets/main.json")
			.load(() => callback.setup());
	}
}
