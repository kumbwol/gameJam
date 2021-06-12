import {CollisionHandler} from "./Handler/CollisionHandler";

export class Collider
{
    private _enabled: boolean;
    private _size: number[] = [0, 0];

    constructor(object)
    {
        CollisionHandler._collisionObjects.push(object);
    }

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