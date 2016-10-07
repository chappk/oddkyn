/// <reference path="Game.ts" />

/// <reference path="Case.ts" />

module Oddkyn
{

export class Board
{
    // Reference to the game instance
    private _game: Oddkyn.Game;
    // Size of the board - Must be a square
    private _size: number;
    // LayerManager
    private _display: Board.LayerManager;
    // 
    //private _representation: Array<Array<Case>;

    constructor(game: Oddkyn.Game, size: number)
    {
        this._game = game;
        this._size = size;
        this._display = new Board.LayerManager(this._game);
    }



}

export module Board
{

export enum LayerType {Environment = 0, Playable, Particle};

export class LayerManager extends Phaser.Group
{
    // Hold reference to Oddkyn Game
    private _game: Oddkyn.Game;
    // Hold groups to display the static environment
    private _layers: Array<Array<Phaser.Group>>;

    constructor(game: Oddkyn.Game)
    {
        super(game);
        this._game = game;
        this._environmentLayer = new Array<Phaser.Group>();
        this._playableLayer = new Array<Phaser.Group>();
        this._particleLayer = new Array<Phaser.Group>();
    }

    public addLayer()
    {
        this._environmentLayer.push(this._game.add.group(this));
        this._playableLayer.push(this._game.add.group(this));
        this._particleLayer.push(this._game.add.group(this));
    }

    public removeLayer()
    {
        this._particleLayer.pop();
        this._playableLayer.pop();
        this._environmentLayer.pop();
    }

    public addToLayer(type: LayerType, i: number)
    {
    }
}

}

}