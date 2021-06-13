import {CollisionHandler} from "./Handler/CollisionHandler";
import {Spaceship} from "../Spaceship/Spaceship";
import {SpaceshipHandler} from "./Handler/SpaceshipHandler";

export class Collider
{
    private _enabled: boolean;
    private _size: number[] = [0, 0];

    //size
    public getSize(): number[]
    {
        return this._size;
    }
    public setSize(x: number, y: number): void
    {
        this._size[0] = x;
        this._size[1] = y;
    }
}