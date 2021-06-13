import {Main} from "../../Main";
import { Base } from "../Engine/Base";

export class Control
{
    public _pointerPosition: number[] = [100, 100];

    private _mousePosition: number[] = [0, 0];
    private _mouseDown: boolean = false;

    constructor()
    {
        Main.App.stage.interactive = true;
        Main.App.stage.on("pointermove", (e) => this.setMousePosition(e));

        window.addEventListener("mousedown", (e) => {if (e.button == 0) this._mouseDown = true});
        window.addEventListener("mouseup", () => this._mouseDown = false);

        Main.App.ticker.add(() => this.onUpdate());
    }

    private onUpdate(): void
    {
        if (this._mouseDown) this.setPointerPosition();
    }

    private setMousePosition(e): void
    {
        let pos = Base.MainContainer.toLocal(e.data.global);

        this._mousePosition[0] = pos.x;
        this._mousePosition[1] = pos.y;
    }
    private setPointerPosition(): void
    {
        this._pointerPosition[0] = this._mousePosition[0];
        this._pointerPosition[1] = this._mousePosition[1];
    }
}
