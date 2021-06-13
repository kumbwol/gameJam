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
	private readonly _linkingChance: number; //0-100%

	private _planets: Planet[];
	private _links: Link[];

	constructor(mainContainer: PIXI.Container)
	{
		this._links = [];
		this._mainContainer = mainContainer;
		this._minimumDistanceBetweenPlanets = 220;
		this._minimumXPos = 500;
		this._maximumXPos = 1000;
		this._minimumYPos = 500;
		this._maximumYPos = 1000;
		this._linkingChance = 100;

		this.generatePlanets(30);
		this.setPlayerPlanet();
		this.setEnemyPlanet();


		//this.generatePlanetNeighbours();
		//this.createLinks();

		for(let i=0; i<this._planets.length; i++)
		{
			let closestID = this.getClosestPlanet(i);
			this.createLink(i, closestID);
		}

		console.log(this._links.length);
	}

	private getClosestPlanet(planetID: number)
	{
		let minimalDistance = 999999;
		let closestPlanetID: number;

		for(let i=0; i<this._planets.length; i++)
		{
			if(planetID !== i && !this.arePlanetsLinkedTogether(planetID, i))
			{
				let distance = this.distanceBetweenPoints(this._planets[planetID].pos, this._planets[i].pos);
				if(distance < minimalDistance)
				{
					minimalDistance = distance;
					closestPlanetID = i;
				}
			}
		}

		return closestPlanetID;
	}

	private createLink(id1: number, id2: number)
	{
		if(id1 && id2)
		{
			let link = new Link(this._planets[id1].pos, this._planets[id2].pos, id1, id2);
			this._links.push(link);
			this._mainContainer.addChild(link.link);
		}
	}

	/*private generatePlanetNeighbours()
	{
		for(let i=0; i<this._planets.length; i++)
		{
			let neighbourAmount = this._minimumNeighbours + Math.floor(Math.random() * (this._maximumNeighbours - this._minimumNeighbours));

			if(this._planets[i].neighbours.length < neighbourAmount)
			{
				for(let j=0; j<this._planets.length; j++)
				{
					if()
				}
			}
		}
	}*/

	/*private createLinks()
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
	}*/

	private arePlanetsLinkedTogether(id1: number, id2: number): boolean
	{
		for(let i=0; i<this._links.length; i++)
		{
			if((this._links[i].planetID1 === id1 && this._links[i].planetID2 === id2) || (this._links[i].planetID1 === id2 && this._links[i].planetID2 === id1))
			{
				return true;
			}
		}

		return false;
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
			let distance = this.distanceBetweenPoints(this._planets[i].pos, {x: this._maximumXPos, y: this._maximumYPos});
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
