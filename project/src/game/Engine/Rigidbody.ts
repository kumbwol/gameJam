import {Base} from "./Base";
import {Main} from "../../Main";
import {Transform} from "./Transform";

export class Rigidbody implements Base
{
    private _transform: Transform;

    private _velocity: number[] = [0, 0];
    private _drag: number = 1;
    private _mass: number = 1;

    constructor(transform: Transform) {
        this._transform = transform;

        Main.App.ticker.add(() => this.onUpdate());
    }

    private onUpdate(): void
    {
        this._transform.addPosition(this._velocity[0], this._velocity[1]);

        this._velocity[0] *= 1 / this._mass / this._drag;
        this._velocity[1] *= 1 / this._mass / this._drag;
    }

    public setVelocity(x: number, y: number): void
    {
        this._velocity[0] = x;
        this._velocity[1] = y;
    }
    public addForce(x: number, y: number): void
    {
        this._velocity[0] += x;
        this._velocity[1] += y;
    }

    public setDrag(drag: number): void
    {
        drag /= 100;
        this._drag = 1 + drag;
    }
    public setMass(mass: number): void
    {
        if (mass > 0) this._mass = 1 + mass / 100;
    }
}