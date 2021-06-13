import {Main} from "../../Main";
import {Control} from "../Player/Control";
import {Spaceship} from "../Spaceship/Spaceship";
import {SpaceshipHandler} from "../Engine/Handler/SpaceshipHandler";

export class Player
{
    private _control: Control;

    constructor(numberOf: number)
    {
        this._control = new Control();

        for (let i = 0; i < numberOf; i++) {
            Player.spawn([0, 0], 0);
        }
        Main.App.ticker.add(() => this.onUpdate());
    }

    private onUpdate(): void
    {
        for (let i = 0; i < SpaceshipHandler._spaceships.length; i++) {
            if (SpaceshipHandler._spaceships[i]._tag == "player") SpaceshipHandler._spaceships[i].setTargetPosition(this._control._pointerPosition[0], this._control._pointerPosition[1]);
        }
    }

    public static spawn(position: number[], id: number)
    {
        let spaceship = new Spaceship("spaceships/player.png", "player", 0x55ff55, id);
        spaceship._transform.setPosition(position[0], position[1]);
    }
}
