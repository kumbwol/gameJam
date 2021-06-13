import * as PIXI from "pixi.js";
import {Main} from "../../Main";
import {Transform} from "../Engine/Transform";
import {Base} from "../Engine/Base";
import {Spaceship} from "../Spaceship/Spaceship";

export class Weapon {
    private _spaceship: Spaceship;
    private _fireRate: number = 10;
    private _counter: number = 0;
    public _damage: number = 10;
    public _readyToFire: boolean = false;

    private _link: PIXI.Graphics;

    constructor(spaceship: Spaceship) {
        this._spaceship = spaceship;

        this.onStart();
        Main.App.ticker.add(() => this.onUpdate());
    }

    private onStart() {
        this._link = new PIXI.Graphics;
        Base.MainContainer.addChild(this._link);
    }

    private onUpdate(): void {
        if (this._counter < this._fireRate) this._counter += Math.random() + .5;
        else this._readyToFire = true;

        if (this._counter > this._fireRate / 2) this.removeLink();
    }

    public fire(position: number[], targetPosition: number[]): void {
        if (this._readyToFire) {
            this._counter = 0;
            this._readyToFire = false;

            this._link.lineStyle(Math.random() + .3, this._spaceship._theme, Math.random() * .5);
            this._link.moveTo(targetPosition[0], targetPosition[1]);
            this._link.lineTo(position[0], position[1]);
        }
    }

    private removeLink(): void
    {
        this._link.clear();
    }
}