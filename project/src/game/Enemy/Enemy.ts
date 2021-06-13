import {Main} from "../../Main";
import {Spaceship} from "../Spaceship/Spaceship";

export class Enemy
{
    public static _spaceships: Spaceship[] = [];
    public _targetPoint: number[] = [1000, 1000];

    constructor(numberOf: number)
    {
        for (let i = 0; i < numberOf; i++) {
            Enemy.spawn([0, 0]);
        }

        Main.App.ticker.add(() => this.onUpdate());
    }

    private onUpdate(): void
    {
        this._targetPoint[0] += Math.random() * 100 - 50;
        this._targetPoint[1] += Math.random() * 100 - 50;

        for (let i = 0; i < Enemy._spaceships.length; i++)
        {
            Enemy._spaceships[i].setTargetPosition(this._targetPoint[0], this._targetPoint[1]);
        }
    }

    public static spawn(position: number[])
    {
        let spaceship = new Spaceship("simpleSpace/Retina/Ship_L.png", "Enemy", 0xff5555);
        Enemy._spaceships.push(spaceship);
        spaceship._transform.setPosition(position[0], position[1]);
    }
}