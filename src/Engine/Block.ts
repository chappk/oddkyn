module Oddkyn
{

export module Engine
{

export class Block extends Phaser.Group
{
    protected _percentW: number;
    protected _percentH: number;
    protected _height: number;
    protected _width: number;
    protected _x: number;
    protected _y: number;
    
    constructor(state: State.BaseState, percentW = 100, percentH = 100, visible = true)
    {
        super(state.game);
        this._percentW = percentW;
        this._percentH = percentH;
    }

    public visibility(visible: boolean): void
    {
        this.visible = visible;
    }

    public percentH(): number
    {
        return this._percentH;
    }

    public percentW(): number
    {
        return this._percentW;
    }

    public resize(height: number, width: number)
    {
        this._height = height;
        this._width = width;
    }

    public move(x: number, y: number)
    {
        this._x = x;
        this._y = y;
    }

}

}

}