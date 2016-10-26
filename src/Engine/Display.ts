module Oddkyn
{

export module Engine
{

export class Display extends Phaser.Group
{
    protected _percentH: number;
    protected _percentW: number;

    protected _x: number;
    protected _y: number;

    protected _layers: Engine.LayerManager; 

    constructor(game: Oddkyn.Game, percentH: number, percentW: number)
    {
        super(game);
        this._percentH = percentH;
        this._percentW = percentW;
    }

    public setTopLeft(x: number, y: number): void
    {
        this._x = x;
        this._y = y;
    }

    public percentH(): number
    {
        return this._percentH;
    }

    public percentW(): number
    {
        return this._percentW;
    }

    public layerVisibility(id: string, toggle: boolean): void
    {
        this._layers.layer(id).visible = toggle;
    }
}

}

}