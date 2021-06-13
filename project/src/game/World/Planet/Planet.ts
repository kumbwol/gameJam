import {IPos} from "../World";
import {PlanetTypes} from "./PlanetTypes";
import {Transform} from "../../Engine/Transform";
import {CollisionHandler} from "../../Engine/Handler/CollisionHandler";
import {Rigidbody} from "../../Engine/Rigidbody";
import {HealthManager} from "../../Spaceship/HealthManager";
import {WeaponHandler} from "../../Engine/Handler/WeaponHandler";
import {Main} from "../../../Main";
import {Base} from "../../Engine/Base";
import {Spawner} from "../PlanetAbilities/Spawner";

export class Planet
{
	private _transform: Transform;
	private _rigidbody: Rigidbody;
	private _healthManager: HealthManager;
	private _spawner: Spawner;

	private readonly _pos;
	private _type: PlanetTypes;

	private _neighbours: number[];

	constructor(pos: IPos, type: PlanetTypes)
	{
		this._neighbours = [];
		this._pos = pos;

		this._transform = new Transform(Base._location + "world/planets/neutralPlanet.png");
		this._transform.setSize(100, 100);
		this._transform.setPosition(pos.x, pos.y);
		this._rigidbody = new Rigidbody(this._transform);
		this._rigidbody._static = true;
		this._healthManager = new HealthManager(2500);
		this._spawner = new Spawner(this._transform);

		this.type = type;


		CollisionHandler._collisionObjects.push(this);
		WeaponHandler._planets.push(this);
		Main.App.ticker.add(() => this.onUpdate());
	}

	private onUpdate(): void
	{
		if (this.type == PlanetTypes.PLAYER){
			this._spawner._enabled = true;
		}
		if (this.type == PlanetTypes.ENEMY){
			this._spawner._enabled = true;
		}
	}

	public addNeighbour(id: number)
	{
		this._neighbours.push(id);
	}

	public get neighbours(): number[]
	{
		return this._neighbours;
	}

	public get type(): PlanetTypes
	{
		return this._type;
	}

	public set type(type: PlanetTypes)
	{
		this._type = type;

		switch (type)
		{
			case PlanetTypes.PLAYER:
				this._transform.setTexture(Base._location + "world/planets/playerPlanet.png");
				this._spawner._tag = "Player";
				break;

			case PlanetTypes.ENEMY:
				this._transform.setTexture(Base._location + "world/planets/enemyPlanet.png");
				this._spawner._tag = "Enemy";
				break;

			case PlanetTypes.NEUTRAL:
				this._transform.setTexture(Base._location + "world/planets/neutralPlanet.png");
				this._spawner._tag = "default";
				break;
		}
	}

	public get pos(): IPos
	{
		return this._pos;
	}
}
