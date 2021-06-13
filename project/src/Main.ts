import * as PIXI from 'pixi.js';
import { Resize } from "./resize";
import { Loader } from "./Loader";
import { Tweener } from "pixi-tweener";
import { GameManager } from "./game/GameManager";
import { Viewport } from "pixi-viewport";

export class Main
{
	public static App: PIXI.Application;

	private _container: PIXI.Container;
	private _resize: Resize;
	private _viewPort: any;

	constructor()
	{
		Main.App = new PIXI.Application(
			{
				width: window.innerWidth,
				height: window.innerHeight,
				backgroundColor: 0x000000,
				resolution: 1
			}
		);

		this._viewPort = new Viewport({
			worldWidth: 800,
			worldHeight: 450,

			interaction: Main.App.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
		});

		document.body.appendChild(Main.App.view);
		document.oncontextmenu = () => {return false;};

		this._container = new PIXI.Container();

		Main.App.stage.addChild(this._container);
		this._viewPort
			.drag()
			.pinch()
			.wheel()
			.decelerate();
		this._container.addChild(this._viewPort);

		this._resize = new Resize();

		new Loader(Main.App.loader, this);
	}

	public setup()
	{
		PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

		Tweener.init(Main.App.ticker);

		//this._resize.resize(Main.App.screen);

		new GameManager(this._viewPort);

		//window.onresize = () => this._resize.resize(Main.App.screen);

		Main.App.ticker.add(() => {
			//console.log(this._app.renderer.plugins.interaction.currentCursorMode);
			//this._app.renderer.plugins.interaction.cursorStyles.default = "url('game/images/lakat.png'),auto";
			this._container.emit("GAME_TICK");
		});
	}
}

new Main();
