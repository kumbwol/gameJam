import * as PIXI from 'pixi.js';
import {Base} from "./Base";
import {Main} from "../../Main";

export class Transform implements Base
{
    public _enabled: boolean = true;

    private _sprite: PIXI.Sprite;
    private _pivot: number[] = [.5, .5];

    private _position: number[] = [50, 50];
    private _scale: number[] = [1, 1];
    private _size: number[];

    private _rotation: number = 0;

    constructor(source: string) {
        let texture = PIXI.Texture.from(source);
        this._sprite = new PIXI.Sprite(texture);
        Base._mainContainer.addChild(this._sprite);
        this._size = [this._sprite.width, this._sprite.height];

        this.setPivot(this._size[0] / 2, this._size[1] / 2);
    }

    //position
    public setPosition(x: number, y: number): void
    {
        this.setRotation(Math.atan2(this._position[1] - y, this._position[0] - x) - 1.74);

        this._position[0] = x;
        this._position[1] = y;

        //this.edgeCollision();

        this._sprite.x = this._position[0];
        this._sprite.y = this._position[1];
    }
    public getPosition(): number[]
    {
        return this._position;
    }
    public addPosition(x: number, y: number): void
    {
        this.setPosition(this._position[0] + x, this._position[1] + y);
    }

    //pivot
    private setPivot(x: number, y: number): void
    {
        this._pivot[0] = x;
        this._pivot[1] = y;

        this._sprite.pivot.x = this._pivot[0];
        this._sprite.pivot.y = this._pivot[1];
    }

    //scale
    public setScale(x: number, y: number): void
    {
        this._scale[0] = x;
        this._scale[1] = y;

        this._sprite.scale.x = this._scale[0];
        this._sprite.scale.y = this._scale[1];
    }
    public getScale(): number[]
    {
        return this._scale;
    }

    //rotation
    public setRotation(rotation: number): void
    {
        this._sprite.rotation = rotation;
    }
    public rotate(rotation: number): void
    {
        this._sprite.rotation += rotation;
    }

    //size
    public setSize(x: number, y: number): void
    {
        this._size[0] = x;
        this._size[1] = y;

        this._sprite.width = this._size[0];
        this._sprite.height = this._size[1];
    }
    public getSize(): number[]
    {
        return this._size;
    }



    private edgeCollision(): void //need to place in collider
    {
        const width: number = this._sprite.width / 2;
        const height: number = this._sprite.height / 2;
        if (this._position[0] < width) this._position[0] = width;
        else if (this._position[0] > Main.App.view.width - width) this._position[0] = Main.App.view.width - width;
        if (this._position[1] < height) this._position[1] = height;
        else if (this._position[1] > Main.App.view.height - height) this._position[1] = Main.App.view.height - height;
    }
}