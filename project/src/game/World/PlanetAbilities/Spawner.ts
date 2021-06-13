import {Main} from "../../../Main";
import {Transform} from "../../Engine/Transform";
import {Player} from "../../Player/Player";
import {Enemy} from "../../Enemy/Enemy";
import {SpaceshipHandler} from "../../Engine/Handler/SpaceshipHandler";
import {Neutral} from "../Planet/Neutral";

export class Spawner
{
    private _transform: Transform;

    public _enabled: boolean = false;
    private _spawnSpeed: number = 60;
    private _maxSpawn: number = 10;

    public _tag: string = "default";
    public _id: number;

    constructor(transform: Transform, id: number)
    {
        this._transform = transform;
        this._id = id;

        Main.App.ticker.add(() => this.onUpdate());

        /*if (this._tag == "Player" || this._tag == "Enemy")
        {
            for (let i = 0; i < this._maxSpawn; i++) {
                this.spawn();
            }
        }*/
    }

    private _counter: number = 0;
    private onUpdate(): void
    {
        //if (!this._enabled) return;

        if (this._counter <= 0)
        {
            let spawned = 0;
            for (let i = 0; i < SpaceshipHandler._spaceships.length; i++){
                if (SpaceshipHandler._spaceships[i]._id == this._id) spawned++;
            }

            if (spawned <= this._maxSpawn) {
                this.spawn();
            }

            this._counter = this._spawnSpeed;
        }
        else this._counter--;
    }

    private spawn()
    {
        if (this._tag == "Player") Player.spawn(this._transform.getPosition(), this._id);
        if (this._tag == "Enemy") Enemy.spawn(this._transform.getPosition(), this._id);
        /*else {
            Neutral.spawn(this._transform.getPosition(), this._id, this._transform.getPosition());
        }*/
    }
}