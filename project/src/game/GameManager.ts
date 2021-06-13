import * as PIXI from 'pixi.js';
import {Base} from "./Engine/Base";
import {Player} from "./Player/Player";
import {CollisionHandler} from "./Engine/Handler/CollisionHandler";
import {Enemy} from "./Enemy/Enemy";
import { World } from "./World/World";
import {WeaponHandler} from "./Engine/Handler/WeaponHandler";
import {SpaceshipHandler} from "./Engine/Handler/SpaceshipHandler";
import { EnemyAI } from "./Enemy/AI/EnemyAI";
import { Enemy2 } from "./Enemy/Enemy2";
import { Enemy2AI } from "./Enemy/AI/Enemy2AI";

export class GameManager
{
	constructor(mainContainer: PIXI.Container)
	{
		new Base();
		Base.MainContainer = mainContainer;
		let world = new World(mainContainer);

		new SpaceshipHandler();
		new CollisionHandler();
		new WeaponHandler();

		new Player(0);
		let enemy = new Enemy(0);
		let enemy2 = new Enemy2(0);
		//new Neutral(0);

		new EnemyAI(enemy, world);
		new Enemy2AI(enemy2, world);
	}
}
