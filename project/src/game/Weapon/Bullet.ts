import {Main} from "../../Main";
import {Rigidbody} from "../Engine/Rigidbody";
import {Transform} from "../Engine/Transform";
import {Base} from "../Engine/Base";

//this will be replaced with a simple line renderer thing
export class Bullet
{
    private _transform: Transform;
    private _rigidbody: Rigidbody;

    private _speed: number = 5;
    private _aliveTime: number = 180;

    private _lifeTime: number = 0;

    constructor(x: number, y: number)
    {
        this._transform = new Transform(Base._location + "simpleSpace/Retina/star_small.png");
        this._rigidbody = new Rigidbody(this._transform);
        this._transform.setPosition(x, y);
        this._transform.setSize(20, 20);

        Main.App.ticker.add(() => this.onUpdate());
    }

    private onUpdate(): void
    {
        this._lifeTime++;

        if (this._lifeTime < this._aliveTime) this._rigidbody.setVelocity(this._speed, this._speed);
        else this._rigidbody.setVelocity(0, 0);
    }
}