import * as PIXI from 'pixi.js';
import {Base} from "./Engine/Base";
import {Player} from "./Player/Player";
import {CollisionHandler} from "./Engine/Handler/CollisionHandler";
import {Enemy} from "./Enemy/Enemy";
import { World } from "./World/World";

export class GameManager
{
	constructor(mainContainer: PIXI.Container)
	{
		Base.MainContainer = mainContainer;
		new CollisionHandler();

		new Player();
		new Enemy();

		new World(mainContainer);
	}
}
