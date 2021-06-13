import * as PIXI from 'pixi.js';

export class Loader
{
	constructor(loader: PIXI.Loader, callback: any)
	{
		loader
			.add("successAnimJSON", "./project/assets/main.json")
			.add("playerPlanet", "./project/assets/planets/player.png")
			.add("enemyPlanet", "./project/assets/planets/enemy.png")
			.add("neutralPlanet", "./project/assets/planets/base.png")
			.add("player", "./project/assets/spaceships/player.png")
			.add("enemy", "./project/assets/spaceships/enemy.png")
			.add("spaceship", "./project/assets/spaceships/base.png")
			.add("startBtn", "./project/assets/menu/startBtn.png")
			.add("background", "./project/assets/menu/background.png")
			.add("control", "./project/assets/menu/Control.png")
			.load(() => callback.setup());
	}
}
