import * as PIXI from "pixi.js";
import { Planet } from "./Planet/Planet";
import { PlanetTypes } from "./Planet/PlanetTypes";
import { Link } from "./Planet/Link";

export interface IPos
{
	x: number,
	y: number
}

export class World
{
	private _mainContainer: PIXI.Container;
	private readonly _minimumDistanceBetweenPlanets: number;
	private readonly _minimumXPos: number;
	private readonly _maximumXPos: number;
	private readonly _minimumYPos: number;
	private readonly _maximumYPos: number;

	private _planets: Planet[];
	private _links: Link[];

	constructor(mainContainer: PIXI.Container)
	{
		this._mainContainer = mainContainer;
		this._minimumDistanceBetweenPlanets = 220;
		this._minimumXPos = 100;
		this._maximumXPos = 1500;
		this._minimumYPos = 100;
		this._maximumYPos = 800;

		this.generatePlanets(15);
		this.setPlayerPlanet();
		this.setEnemyPlanet();
		this.createLinks();
	}

	private createLinks()
	{
		this._links = [];

		let currentPlanetID: number;

		for(let i=0; i<this._planets.length; i++)
		{
			if(this._planets[i].type === PlanetTypes.PLAYER)
			{
				currentPlanetID = i;
				break;
			}
		}

		for(let j=0; j<this._planets.length - 1; j++)
		{
			let minimalDistanceFromCurrentPlanet = 999999;
			let minimalID: number;

			for(let i=0; i<this._planets.length; i++)
			{
				if(!this.isPlanetLinked(i) && i !== currentPlanetID)
				{
					let distance = this.distanceBetweenPoints(this._planets[currentPlanetID].pos, this._planets[i].pos);
					if(distance < minimalDistanceFromCurrentPlanet)
					{
						minimalDistanceFromCurrentPlanet = distance;
						minimalID = i;
					}
				}
			}

			let link = new Link(this._planets[currentPlanetID].pos, this._planets[minimalID].pos, currentPlanetID, minimalID);
			this._links.push(link);
			currentPlanetID = minimalID;
			this._mainContainer.addChild(link.link);
		}

	}

	private isPlanetLinked(id: number): boolean
	{
		for(let i=0; i<this._links.length; i++)
		{
			if(this._links[i].planetID1 === id || this._links[i].planetID2 === id)
			{
				return true;
			}
		}

		return false;
	}

	private setPlayerPlanet()
	{
		let distanceFromTopLeft = 999999;
		let playerPlanetID: number;

		for(let i=0; i<this._planets.length; i++)
		{
			let distance = this.distanceBetweenPoints(this._planets[i].pos, {x: 0, y: 0});
			if(distance < distanceFromTopLeft)
			{
				distanceFromTopLeft = distance;
				playerPlanetID = i;
			}
		}

		this._planets[playerPlanetID].type = PlanetTypes.PLAYER;
	}

	private setEnemyPlanet()
	{
		let distanceFromTopLeft = 999999;
		let enemyPlanetID: number;

		for(let i=0; i<this._planets.length; i++)
		{
			let distance = this.distanceBetweenPoints(this._planets[i].pos, {x: 1600, y: 900});
			if(distance < distanceFromTopLeft)
			{
				distanceFromTopLeft = distance;
				enemyPlanetID = i;
			}
		}

		this._planets[enemyPlanetID].type = PlanetTypes.ENEMY;
	}

	private generatePlanets(amount: number)
	{
		let originalAmount = amount;
		this._planets = [];

		let tries = 0;

		for(let i=0; i<amount; i++)
		{
			let planetPos: IPos = this.generateRandomPosition();

			if(this.isTooCloseToOtherPlanet(planetPos))
			{
				tries++;
				i--;

				if(tries === 1000)
				{
					tries = 0;
					amount--;
				}
			}
			else
			{
				this._planets.push(new Planet(planetPos, PlanetTypes.NEUTRAL));
				this._mainContainer.addChild(this._planets[this._planets.length - 1].planet);
			}
		}

		if(amount < originalAmount)
		{
			console.log("WARNING: Couldnt fit " + originalAmount + " planets, I only created: " + amount);
			console.log("Please reduce the amount of planets, or make minimal distance smaller!");
		}
	}

	private isTooCloseToOtherPlanet(pos: IPos): boolean
	{
		for(let i=0; i<this._planets.length; i++)
		{
			if(this.distanceBetweenPoints(this._planets[i].pos, pos) < this._minimumDistanceBetweenPlanets)
			{
				return true;
			}
		}

		return false;
	}

	private distanceBetweenPoints(pos1: IPos, pos2: IPos): number
	{
		return Math.sqrt((pos1.x - pos2.x) * (pos1.x - pos2.x) + (pos1.y - pos2.y) * (pos1.y - pos2.y));
	}

	private generateRandomPosition(): IPos
	{
		return ({
			x: this._minimumXPos + Math.floor(Math.random() * (this._maximumXPos - this._minimumXPos)),
			y: this._minimumYPos + Math.floor(Math.random() * (this._maximumYPos - this._minimumYPos))
		});
	}
}
