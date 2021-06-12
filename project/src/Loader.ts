import * as PIXI from 'pixi.js';

export class Loader
{
	constructor(loader: PIXI.Loader, callback: any)
	{
		loader
			.add("successAnimJSON", "./project/assets/main.json")
			.add("playerPlanet", "./project/assets/world/planets/playerPlanet.png")
			.add("enemyPlanet", "./project/assets/world/planets/enemyPlanet.png")
			.add("neutralPlanet", "./project/assets/world/planets/neutralPlanet.png")
			.load(() => callback.setup());
	}
}
