import * as PIXI from 'pixi.js';
import {Base} from "./Engine/Base";
import {Player} from "./Player/Player";
import {CollisionHandler} from "./Engine/Handler/CollisionHandler";
import {Enemy} from "./Enemy/Enemy";
import { World } from "./World/World";
import {WeaponHandler} from "./Engine/Handler/WeaponHandler";
import {SpaceshipHandler} from "./Engine/Handler/SpaceshipHandler";
import { EnemyAI } from "./Enemy/AI/EnemyAI";

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

		new EnemyAI(enemy, world);
	}
}
