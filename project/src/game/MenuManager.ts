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

		let controlTexture = PIXI.Texture.from("control");
		let control = new PIXI.Sprite(controlTexture);

		let bgTexture = PIXI.Texture.from("background");
		let bg = new PIXI.Sprite(bgTexture);

		bg.y = -120;

		let startBtnTexture = PIXI.Texture.from("startBtn");
		let startBtn = new PIXI.Sprite(startBtnTexture);

		startBtn.x = (window.innerWidth - startBtn.width)/2;
		startBtn.y = (window.innerHeight - startBtn.height)/2;

		control.y = startBtn.y + startBtn.height;

		startBtn.interactive = true;

		this._menuContainer.addChild(bg);
		this._menuContainer.addChild(control);
		this._menuContainer.addChild(startBtn);
		container.addChild(this._menuContainer);

		startBtn.addListener("click", () =>
		{
			this._menuContainer.removeChildren();
			new GameManager(viewPort);
		});
	}



}
