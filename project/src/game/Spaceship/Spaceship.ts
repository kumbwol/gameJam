import {Transform} from "../Engine/Transform";
import {Rigidbody} from "../Engine/Rigidbody";
import {Base} from "../Engine/Base";
import {Main} from "../../Main";
import {Collider} from "../Engine/Collider";
import {Weapon} from "../Weapon/Weapon";
import {HealthManager} from "./HealthManager";
import {SpaceshipHandler} from "../Engine/Handler/SpaceshipHandler";

export class Spaceship
{
    public _transform: Transform;
    public _rigidbody: Rigidbody;
    private _collider: Collider;
    public _healthManager: HealthManager;

    public _alive: boolean = true;
    private _targetPosition: number[] = [100, 100];
    public _tag: string = "default";
    public _theme: number = 0x000000;
    public _id: number;

    private _drag: number = 1;
    private _mass: number = 1;
    private _moveForce: number = 2;
    private _stopDistance: number = 200;

    public _weapon: Weapon;
    public _attackDistance: number = 50;

    constructor(spriteLocation: string, tag: string, theme: number, id: number)
    {
        this._transform = new Transform(Base._location + spriteLocation);
        this._rigidbody = new Rigidbody(this._transform);
        this._collider = new Collider();
        this._healthManager = new HealthManager(100);

        this._tag = tag;
        this._theme = theme;
        this._id = id;

        SpaceshipHandler._spaceships.push(this);

        this._weapon = new Weapon(this);

        this.onStart();
        Main.App.ticker.add(() => this.onUpdate());
    }

    private onStart(): void
    {
        this._transform.rotate(1.57);
        this._transform.setSize(20, 20);

        this._rigidbody.setDrag(this._drag);
        this._rigidbody.setMass(this._mass);

        this._moveForce *= (1 / 5 * 4 + Math.random() / 5);
        this._collider.setSize(this._transform.getSize()[0], this._transform.getSize()[1]);
    }

    private onUpdate(): void
    {
        if (this._healthManager.currentHelath() < 0) {
            this._transform.setPosition(-500000, -500000)
            SpaceshipHandler.removeSpaceship(this);
        }

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
