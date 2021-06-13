import {Spaceship} from "../../Spaceship/Spaceship";

export class SpaceshipHandler
{
    public static _spaceships: Spaceship[] = [];

    public static removeSpaceship(spaceship: Spaceship): void
    {
        let index = -1;
        for (let i = 0; i < SpaceshipHandler._spaceships.length; i++)
        {
            if (SpaceshipHandler._spaceships[i] == spaceship) index = i;
        }
        if (index > 0) {
            SpaceshipHandler._spaceships.splice(index, 1);
        }
    }

    public static getSpaceship(spaceship: Spaceship): Spaceship
    {
        let index = -1;
        for (let i = 0; i < SpaceshipHandler._spaceships.length; i++)
        {
            if (SpaceshipHandler._spaceships[i] == spaceship) index = i;
        }

        return SpaceshipHandler._spaceships[index];
    }
}