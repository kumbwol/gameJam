import {Main} from "../../../Main";

export class CollisionHandler
{
    public static _collisionObjects = [];
    private _drag: number = 10;

    constructor()
    {
        Main.App.ticker.add(() => this.onUpdate());
    }

    private onUpdate(): void //this is a huge mess
    {
        for (let collisionObject of CollisionHandler._collisionObjects)
        {
            for (let otherCollisionObject of CollisionHandler._collisionObjects)
            {
                if (collisionObject != otherCollisionObject)
                {
                    const transform = collisionObject._transform;
                    const otherTransform = otherCollisionObject._transform;

                    if (transform.getPosition()[0] + transform.getSize()[0] / 2 > otherTransform.getPosition()[0]
                        && transform.getPosition()[0] - transform.getSize()[0] / 2 < otherTransform.getPosition()[0]
                        && transform.getPosition()[1] + transform.getSize()[1] / 2 > otherTransform.getPosition()[1]
                        && transform.getPosition()[1] - transform.getSize()[1] / 2 < otherTransform.getPosition()[1])
                    {
                        if (!otherCollisionObject._rigidbody._static)
                        {
                            otherTransform.addPosition((otherTransform.getPosition()[0] - transform.getPosition()[0]) / this._drag,
                                (otherTransform.getPosition()[1] - transform.getPosition()[1]) / this._drag);
                        }
                    }
                }
            }
        }
    }
}