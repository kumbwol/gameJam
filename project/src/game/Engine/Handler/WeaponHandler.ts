import {Main} from "../../../Main";
import {PlanetTypes} from "../../World/Planet/PlanetTypes";
import {SpaceshipHandler} from "./SpaceshipHandler";
import {PlanetHandler} from "./PlanetHandler";

export class WeaponHandler
{
    constructor()
    {
        Main.App.ticker.add(() => this.onUpdate());
    }

    private onUpdate(): void
    {
        for (let collisionObject of SpaceshipHandler._spaceships)
        {
            for (let otherCollisionObject of SpaceshipHandler._spaceships)
            {
                if (collisionObject._tag != otherCollisionObject._tag) {
                    let distance = collisionObject._transform.distanceBetweenPoints(collisionObject._transform.getPosition(), otherCollisionObject._transform.getPosition());

                    if (distance < collisionObject._attackDistance && otherCollisionObject._alive && collisionObject._weapon._readyToFire)
                    {
                        collisionObject._weapon.fire(collisionObject._transform.getPosition(), otherCollisionObject._transform.getPosition());
                        otherCollisionObject._healthManager.damage(collisionObject._weapon._damage);
                    }
                }
            }
        }

        //planets
        for (let collisionObject of SpaceshipHandler._spaceships)
        {
            for (let planet of PlanetHandler._planets)
            {
                let distance = collisionObject._transform.distanceBetweenPoints(collisionObject._transform.getPosition(), planet._transform.getPosition());

                if (distance < collisionObject._attackDistance * 2 && collisionObject._weapon._readyToFire) {
                    collisionObject._weapon.fire(collisionObject._transform.getPosition(), planet._transform.getPosition());
                    planet._healthManager.damage(collisionObject._weapon._damage);

                    if (planet._healthManager.currentHelath() < 0) {
                        planet._healthManager.reset();
                        if (collisionObject._tag == "player") planet.type = PlanetTypes.PLAYER;
                        if (collisionObject._tag == "enemy") planet.type = PlanetTypes.ENEMY;
                        if (collisionObject._tag == "enemy1") planet.type = PlanetTypes.ENEMY2;
                    }
                }
            }
        }
    }
}