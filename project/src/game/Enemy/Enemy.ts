import {Main} from "../../Main";
import {Spaceship} from "../Spaceship/Spaceship";
import { IPos } from "../World/World";
import {SpaceshipHandler} from "../Engine/Handler/SpaceshipHandler";

export class Enemy
{
    public _targetPoint: number[] = [500, 500];

    constructor(numberOf: number)
    {
        for (let i = 0; i < numberOf; i++) {
            Enemy.spawn([0, 0], 0);
        }

        Main.App.ticker.add(() => this.onUpdate());
    }

    private onUpdate(): void
    {
        for (let i = 0; i < SpaceshipHandler._spaceships.length; i++) {
            if (SpaceshipHandler._spaceships[i]._tag == "enemy") SpaceshipHandler._spaceships[i].setTargetPosition(this._targetPoint[0], this._targetPoint[1]);
        }
    }

    public static spawn(position: number[], id: number)
    {
        let spaceship = new Spaceship("spaceships/enemy.png", "enemy", 0xff5555, id);
        spaceship._transform.setPosition(position[0], position[1]);
    }

    public get targetPoint(): IPos
    {
        return {
            x: this._targetPoint[0],
            y: this._targetPoint[1],
        };
    }

    public set targetPoint(pos: IPos)
    {
        this._targetPoint[0] = pos.x;
        this._targetPoint[1] = pos.y;
    }
}
