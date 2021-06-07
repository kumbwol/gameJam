import * as PIXI from 'pixi.js';

export class GameManager
{
	constructor(mainContainer: PIXI.Container)
	{
		console.log("ide jön majd a játék");

		let wildTexture = PIXI.Texture.from("SYM0.png");
		let wildSprite = new PIXI.Sprite(wildTexture);

		let enemyTexture = PIXI.Texture.from("gnollDefender.png");
		let enemySprite = new PIXI.Sprite(enemyTexture);
		enemySprite.x = 200;
		enemySprite.y = 200;


		mainContainer.addChild(wildSprite);
		mainContainer.addChild(enemySprite);
	}
}
