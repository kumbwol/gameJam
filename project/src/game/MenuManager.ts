import * as PIXI from 'pixi.js';
import { GameManager } from "./GameManager";
import { Resize } from "../Resize";
import { Main } from "../Main";

export class MenuManager
{
	private _menuContainer: PIXI.Container;

	constructor(viewPort: any, resize: Resize, container: PIXI.Container)
	{
		resize.resize(Main.App.screen);

		this._menuContainer = new PIXI.Container;

		let startBtnTexture = PIXI.Texture.from("startBtn");
		let startBtn = new PIXI.Sprite(startBtnTexture);

		startBtn.x = (1600 - startBtn.width)/2;
		startBtn.y = (900 - startBtn.height)/2;

		startBtn.interactive = true;

		this._menuContainer.addChild(startBtn);
		container.addChild(this._menuContainer);

		startBtn.addListener("click", () =>
		{
			this._menuContainer.removeChildren();
			new GameManager(viewPort);
		});
	}



}
