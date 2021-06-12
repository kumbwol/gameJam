import {Main} from "../../Main";
import {Spaceship} from "../Spaceship/Spaceship";

export class Enemy
{
    private _spaceships: Spaceship[] = [];

    constructor()
    {
        for (let i = 0; i < 50; i++) {
            this._spaceships.push(new Spaceship("simpleSpace/Retina/Ship_C.png", "Enemy"));
        }

        Main.App.ticker.add(() => this.onUpdate());
    }

    private onUpdate(): void
    {
        for (let i = 0; i < this._spaceships.length; i++)
        {
            this._spaceships[i].setTargetPosition(600, 600);
        }
    }
}