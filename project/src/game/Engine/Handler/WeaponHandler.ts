import {Main} from "../../../Main";
import {PlanetTypes} from "../../World/Planet/PlanetTypes";

export class WeaponHandler
{
    public static _spaceships = [];
    public static _planets = [];

    constructor()
    {
        Main.App.ticker.add(() => this.onUpdate());
    }

    private onUpdate(): void
    {
        for (let collisionObject of WeaponHandler._spaceships)
        {
            for (let otherCollisionObject of WeaponHandler._spaceships)
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
        for (let collisionObject of WeaponHandler._spaceships)
        {
            for (let planet of WeaponHandler._planets)
            {
                let distance = collisionObject._transform.distanceBetweenPoints(collisionObject._transform.getPosition(), planet._transform.getPosition());

                if (distance < collisionObject._attackDistance / 3 && collisionObject._weapon._readyToFire)
                {
                    collisionObject._weapon.fire(collisionObject._transform.getPosition(), planet._transform.getPosition());
                    planet._healthManager.damage(collisionObject._weapon._damage);

                    if (planet._healthManager.currentHelath() < 0) {
                        planet._healthManager.reset();
                        if (collisionObject._tag == "Player") planet.type = PlanetTypes.PLAYER;
                        if (collisionObject._tag == "Enemy") planet.type = PlanetTypes.ENEMY;
                    }
                }
            }
        }
    }
}