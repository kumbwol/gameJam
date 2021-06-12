import {Main} from "../../Main";
import {Bullet} from "./Bullet";
import {Transform} from "../Engine/Transform";

export class Weapon
{
    private _transform: Transform;
    private _fireRate: number = 15;
    private _counter: number = 0;

    constructor(transform: Transform)
    {
        this._transform = transform;
        Main.App.ticker.add(() => this.onUpdate());
    }

    private onUpdate(): void
    {
        if (this._counter > 0)
        {
            this._counter--;
        }
        this.fire();
    }

    public fire(): void
    {
        if (this._counter == 0)
        {
            this._counter = this._fireRate;
            new Bullet(this._transform.getPosition()[0], this._transform.getPosition()[1]);
        }
    }
}