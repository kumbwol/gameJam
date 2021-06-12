import {Main} from "../../Main";
import {Control} from "../Player/Control";
import {Spaceship} from "../Spaceship/Spaceship";

export class Player
{
    private _control: Control;
    private _spaceships: Spaceship[] = [];

    constructor()
    {
        this._control = new Control();

        for (let i = 0; i < 50; i++) {
            this._spaceships.push(new Spaceship("simpleSpace/Retina/Ship_I.png", "Player"));
            this._spaceships[i]._transform.setPosition(1000, 500);
        }
        Main.App.ticker.add(() => this.onUpdate());
    }

    private onUpdate(): void
    {
        for (let i = 0; i < this._spaceships.length; i++)
        {
            this._spaceships[i].setTargetPosition(this._control._pointerPosition[0], this._control._pointerPosition[1]);
        }
    }
}
