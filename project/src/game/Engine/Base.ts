import * as PIXI from 'pixi.js';
import {Transform} from "stream";
import {Rigidbody} from "./Rigidbody";
import {Main} from "../../Main";

export class Base
{
    public static _mainContainer: PIXI.Container;
    public static _location: string = "project/assets/";

    public static _time: number = 1;
}
