import {Main} from "../../../Main";
import {Transform} from "../../Engine/Transform";
import {Player} from "../../Player/Player";
import {Enemy} from "../../Enemy/Enemy";

export class Spawner
{
    private _transform: Transform;

    public _enabled: boolean = false;
    private _spawnSpeed: number = 60;

    public _tag: string = "default";

    constructor(transform: Transform)
    {
        this._transform = transform;

        Main.App.ticker.add(() => this.onUpdate());
    }

    private _counter: number = 0;
    private onUpdate(): void
    {
        if (!this._enabled) return;

        if (this._counter <= 0)
        {
            this._counter = this._spawnSpeed;
            if (this._tag == "Player") Player.spawn(this._transform.getPosition());
            if (this._tag == "Enemy") Enemy.spawn(this._transform.getPosition());
        }
        else this._counter--;
    }
}