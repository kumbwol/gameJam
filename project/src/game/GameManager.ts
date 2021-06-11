import * as PIXI from 'pixi.js';
import {Base} from "./Engine/Base";
import {Transform} from "./Engine/Transform";
import {Enemy} from "./Enemy/Enemy";
import {Player} from "./Player/Player";

export class GameManager
{
	constructor(mainContainer: PIXI.Container)
	{
		Base._mainContainer = mainContainer;

		let player = new Player();
	}
}
