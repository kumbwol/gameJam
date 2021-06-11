import {Transform} from "../Engine/Transform";
import {Rigidbody} from "../Engine/Rigidbody";
import {Base} from "../Engine/Base";
import {Main} from "../../Main";
import {Control} from "../Player/Control";

export class Player
{
    private _transform: Transform;
    private _rigidbody: Rigidbody;
    private _control: Control;

    private _moveForce: number = 50;
    private _drag: number = 20;

    constructor()
    {
        this._transform = new Transform(Base._location + "spaceships/playerShip1_green.png");
        this._rigidbody = new Rigidbody(this._transform);
        this._control = new Control();

        this.onStart();
        Main.App.ticker.add(() => this.onUpdate());
    }

    private onStart(): void
    {
        this._transform.rotate(1.57);

        this._rigidbody.setDrag(this._drag);
        this._rigidbody.setMass(20);
    }

    private onUpdate(): void
    {
        let vector: number[] = [0, 0];

        vector[0] = this._control._pointerPosition[0] - this._transform.getPosition()[0];
        vector[1] = this._control._pointerPosition[1] - this._transform.getPosition()[1];
        let asd = Math.sqrt((vector[0] * vector[0]) + (vector[1] * vector[1])) / this._moveForce * 10;

        this._rigidbody.addForce(vector[0] / asd, vector[1] / asd);
    }
}