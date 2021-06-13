import {Main} from "../../../Main";
import {SpaceshipHandler} from "./SpaceshipHandler";
import {PlanetHandler} from "./PlanetHandler";

export class CollisionHandler
{
    private _drag: number = 10;

    constructor()
    {
        Main.App.ticker.add(() => this.onUpdate());
    }

    private onUpdate(): void //this is a huge mess
    {
        let objects = [];
        objects = SpaceshipHandler._spaceships;
        objects = objects.concat(PlanetHandler._planets);

        for (let collisionObject of objects)
        {
            for (let otherCollisionObject of objects)
            {
                if (collisionObject != otherCollisionObject && collisionObject != null && otherCollisionObject != null) {
                    const transform = collisionObject._transform;
                    const otherTransform = otherCollisionObject._transform;

                    if (transform.getPosition()[0] + transform.getSize()[0] / 2 > otherTransform.getPosition()[0]
                        && transform.getPosition()[0] - transform.getSize()[0] / 2 < otherTransform.getPosition()[0]
                        && transform.getPosition()[1] + transform.getSize()[1] / 2 > otherTransform.getPosition()[1]
                        && transform.getPosition()[1] - transform.getSize()[1] / 2 < otherTransform.getPosition()[1]) {

                        if (!otherCollisionObject._rigidbody._static) {
                            otherTransform.addPosition((otherTransform.getPosition()[0] - transform.getPosition()[0]) / this._drag,
                                (otherTransform.getPosition()[1] - transform.getPosition()[1]) / this._drag);
                        }
                    }
                }
            }
        }
    }
}