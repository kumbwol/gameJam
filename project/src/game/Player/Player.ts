import {Main} from "../../Main";
import {Control} from "../Player/Control";
import {Spaceship} from "../Spaceship/Spaceship";
import {Enemy} from "../Enemy/Enemy";

export class Player
{
    private _control: Control;
    public static _spaceships: Spaceship[] = [];

    constructor(numberOf: number)
    {
        this._control = new Control();

        for (let i = 0; i < numberOf; i++) {
            Player.spawn([0, 0]);
        }
        Main.App.ticker.add(() => this.onUpdate());
    }

    private onUpdate(): void
    {
        for (let i = 0; i < Player._spaceships.length; i++) {
            Player._spaceships[i].setTargetPosition(this._control._pointerPosition[0], this._control._pointerPosition[1]);
        }
    }

    public static spawn(position: number[])
    {
        let spaceship = new Spaceship("simpleSpace/Retina/Ship_I.png", "Player", 0xffffff);
        Player._spaceships.push(spaceship);
        spaceship._transform.setPosition(position[0], position[1]);
    }
}
