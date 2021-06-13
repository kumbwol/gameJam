import {Main} from "../../../Main";
import {SpaceshipHandler} from "../../Engine/Handler/SpaceshipHandler";
import {Spaceship} from "../../Spaceship/Spaceship";

export class Neutral {
    public static _targetPoint: number[] = [0, 0];

    constructor(numberOf: number) {
        for (let i = 0; i < numberOf; i++) {
            Neutral.spawn([0, 0], 0, [0, 0]);
        }

        Main.App.ticker.add(() => this.onUpdate());
    }

    private onUpdate(): void {
        for (let i = 0; i < SpaceshipHandler._spaceships.length; i++) {
            if (SpaceshipHandler._spaceships[i]._tag == "enemy") SpaceshipHandler._spaceships[i].setTargetPosition(Neutral._targetPoint[0], Neutral._targetPoint[1]);
        }
    }

    public static spawn(position: number[], id: number, pos: number[]) {
        let spaceship = new Spaceship("spaceships/base.png", "neutral", 0xffffff, id);
        spaceship._transform.setPosition(position[0], position[1]);
    }
}