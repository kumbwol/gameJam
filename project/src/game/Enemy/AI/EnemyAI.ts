import { Enemy } from "../Enemy";
import * as PIXI from "pixi.js";
import { Tweener } from "pixi-tweener";
import { World, IPos } from "../../World/World";
import { PlanetTypes } from "../../World/Planet/PlanetTypes";

export class EnemyAI
{
	private readonly _decisionMakingTime: number;
	private _enemy: Enemy;
	private _world: World;
	private _enemyPlanetIDs: number[];
	private _defendingID: number;

	constructor(enemy: Enemy, world: World)
	{
		this._enemyPlanetIDs = [];
		this._decisionMakingTime = 1000;

		this._enemy = enemy;
		this._world = world;

		this.makeDecision();
	}

	private async wait(duration: number)
	{
		const x = new PIXI.Container;

		await Tweener.add
		(
			{
				target: x,
				duration: (duration/1000)
			},
			{
				alpha: 0
			}
		);
	}

	private async makeDecision()
	{
		await this.wait(this._decisionMakingTime);

		if(this.isDefenseNeeded())
		{
			let pos: IPos = this._world.planets[this._defendingID].pos;
			this._enemy.targetPoint = pos;
		}
		else
		{
			this._enemyPlanetIDs = [];
			this.getEnemyPlanets();
			this.colonizeClosestNeutralPlanet();
		}

		this.makeDecision();
	}

	private getEnemyPlanets()
	{
		for(let i=0; i<this._world.planets.length; i++)
		{
			if(this._world.planets[i].type === PlanetTypes.ENEMY)
			{
				this._enemyPlanetIDs.push(i);
			}
		}
	}

	private isDefenseNeeded()
	{
		for(let i=0; i<this._enemyPlanetIDs.length; i++)
		{
			if(this._world.planets[this._enemyPlanetIDs[i]].type === PlanetTypes.PLAYER)
			{
				this._defendingID = this._enemyPlanetIDs[i];
				return true;
			}
		}

		return false;
	}

	private colonizeClosestNeutralPlanet()
	{
		let enemyPlanetID: number;

		enemyPlanetID = this._enemyPlanetIDs[Math.floor(Math.random() * this._enemyPlanetIDs.length)];

		if(enemyPlanetID)
		{
			let closestNeutralPlanetID = this._world.getClosestNeutralPlanetEnemyAI(enemyPlanetID);

			if(closestNeutralPlanetID)
			{
				let pos: IPos = this._world.planets[closestNeutralPlanetID].pos;
				this._enemy.targetPoint = pos;
			}
			else
			{
				let pos: IPos = this._world.planets[Math.floor(Math.random() * this._world.planets.length)].pos;
				this._enemy.targetPoint = pos;
			}
		}
		else
		{
			console.log("enemy lost all planets");
		}
	}
}
