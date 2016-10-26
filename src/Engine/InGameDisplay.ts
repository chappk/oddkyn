/// <reference path="../Game.ts" />
/// <reference path="../Core/Board.ts" />
module Oddkyn
{

export module Engine
{

export class InGameDisplay extends Engine.Display
{
    constructor(game: Oddkyn.Game, percentH = 100, percentW = 100)
    {
        super(game, percentH, percentW);
        
        this._layers = new LayerManager(game, this);
        this._layers.addLayer("InGame");
        this._layers.addLayer("InMenu");
        this._layers.addLayer("Pause");
        this._layers.layer("Pause").visible = false;
    }

    private _createInGame(): void
    {
        
    }

    private _createInMenu()
    {

    }

    private _createPause()
    {

    }

    public updateInGame()
    {

    }

}

}

}