import {Transform} from "../Engine/Transform";
import {Rigidbody} from "../Engine/Rigidbody";
import {Base} from "../Engine/Base";
import {Main} from "../../Main";
import {Collider} from "../Engine/Collider";
import {Weapon} from "../Weapon/Weapon";

export class Spaceship
{
    public _transform: Transform;
    private _rigidbody: Rigidbody;
    private _collider: Collider;
    private _targetPosition: number[] = [100, 100];

    public _tag: string = "default";

    private _drag: number = 1;
    private _mass: number = 1;
    private _moveForce: number = 2;
    private _stopDistance: number = 200;

    private _weapon: Weapon;

    constructor(spriteLocation: string, tag: string)
    {
        this._transform = new Transform(Base._location + spriteLocation);
        this._rigidbody = new Rigidbody(this._transform);
        this._collider = new Collider(this);

        this._tag = tag;

        //this._weapon = new Weapon(this._transform);

        this.onStart();
        Main.App.ticker.add(() => this.onUpdate());
    }

    private onStart(): void
    {
        this._transform.rotate(1.57);
        this._transform.setSize(15, 15);

        this._rigidbody.setDrag(this._drag);
        this._rigidbody.setMass(this._mass);

        this._moveForce *= (1 / 5 * 4 + Math.random() / 5);
        this._collider.setSize(this._transform.getSize()[0], this._transform.getSize()[1]);
    }

    private onUpdate(): void
    {
        let vector: number[] = [0, 0];

        vector[0] = this._targetPosition[0] - this._transform.getPosition()[0];
        vector[1] = this._targetPosition[1] - this._transform.getPosition()[1];
        let asd = Math.sqrt((vector[0] * vector[0]) + (vector[1] * vector[1])) / this._moveForce * 10;

        if (asd > this._stopDistance) this._rigidbody.addForce(vector[0] / asd, vector[1] / asd);
    }

    public setTargetPosition(x: number, y: number): void
    {
        this._targetPosition[0] = x;
        this._targetPosition[1] = y;
    }
}