import * as PIXI from 'pixi.js';
import {Base} from "./Engine/Base";
import {Player} from "./Player/Player";
import {CollisionHandler} from "./Engine/Handler/CollisionHandler";
import {Enemy} from "./Enemy/Enemy";

export class GameManager
{
	constructor(mainContainer: PIXI.Container)
	{
		Base._mainContainer = mainContainer;
		new CollisionHandler();

		new Player();
		new Enemy();
	}
}
