import * as PIXI from "pixi.js";
import { IPos } from "../World";

export class Link
{
	private _link: PIXI.Graphics;
	private _planetID1: number;
	private _planetID2: number;

	constructor(pos1: IPos, pos2: IPos, planetID1: number, planetID2: number)
	{
		this._link = new PIXI.Graphics;

		this._link.lineStyle(5, 0xffffff, .2);
		this._link.moveTo(pos1.x, pos1.y);
		this._link.lineTo(pos2.x, pos2.y);
		this._planetID1 = planetID1;
		this._planetID2 = planetID2;
	}

	public get link(): PIXI.Graphics
	{
		return this._link;
	}

	public get planetID1(): number
	{
		return this._planetID1;
	}

	public get planetID2(): number
	{
		return this._planetID2;
	}
}
