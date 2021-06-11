import {Main} from "../../Main";

export class Control
{
    public _pointerPosition: number[] = [0, 0];

    constructor()
    {
        window.addEventListener('mousedown', (e) => this.setPointer(e));

        //cursor position always
        //Main.App.stage.interactive = true;
        //Main.App.stage.on("pointermove", (e) => this.setPointer(e));

    }
    private setPointer(e): void
    {
        this._pointerPosition[0] = e.x;
        this._pointerPosition[1] = e.y;
    }

    /* Keyboard control
    public _keys = {};

    constructor()
    {
        window.addEventListener("keydown", e => this.keysDown(e));
        window.addEventListener("keyup",e => this.keysUp(e));
    }
    keysDown(e) { this._keys[e.keyCode] = true; }
    keysUp(e) { this._keys[e.keyCode] = false; }*/

    //Keycodes: 87, 65, 83, 68, 32 W A S D Space
    /*if (this._input._keys["87"]) this._rigidbody.addForce(0, -this._moveForce);
    if (this._input._keys["83"]) this._rigidbody.addForce(0, this._moveForce);
    if (this._input._keys["65"]) this._rigidbody.addForce(-this._moveForce, 0);
    if (this._input._keys["68"]) this._rigidbody.addForce(this._moveForce, 0);*/
}