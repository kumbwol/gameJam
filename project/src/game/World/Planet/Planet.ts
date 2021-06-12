import { IPos } from "../World";
import * as PIXI from "pixi.js";
import { PlanetTypes } from "./PlanetTypes";

export class Planet
{
	private readonly _pos;
	private _type: PlanetTypes;
	private _planet: PIXI.Sprite;

	private _playerPlanetTexture: PIXI.Texture;
	private _enemyPlanetTexture: PIXI.Texture;
	private _neutralPlanetTexture: PIXI.Texture;

	constructor(pos: IPos, type: PlanetTypes)
	{
		this._pos = pos;

		this._playerPlanetTexture = PIXI.Texture.from("playerPlanet");
		this._enemyPlanetTexture = PIXI.Texture.from("enemyPlanet");
		this._neutralPlanetTexture = PIXI.Texture.from("neutralPlanet");

		this._planet = new PIXI.Sprite(this._neutralPlanetTexture);

		this.type = type;

		this.planet.x = pos.x + Math.floor(this.planet.width / 2);
		this.planet.y = pos.y + Math.floor(this.planet.height / 2);
	}

	public set type(type: PlanetTypes)
	{
		this._type = type;

		switch (type)
		{
			case PlanetTypes.PLAYER:
				this.planet.texture = this._playerPlanetTexture;
				break;

			case PlanetTypes.ENEMY:
				this.planet.texture = this._enemyPlanetTexture;
				break;

			case PlanetTypes.NEUTRAL:
				this.planet.texture = this._neutralPlanetTexture;
				break;
		}
	}

	public get pos(): IPos
	{
		return this._pos;
	}

	public get planet(): PIXI.Sprite
	{
		return this._planet;
	}
}
