/// <reference path="Game.ts" />
/// <reference path="Case.ts" />

module Oddkyn
{

export class Board
{
    // Reference to the game instance
    protected _game: Oddkyn.Game;
    // Size of the board - Must be a square
    protected _size: number;
    // LayerManager
    protected _display: LayerManager;
    // Internal representation
    public representation: Array<Array<Square>>;

    constructor(game: Oddkyn.Game, size: number, load?: string)
    {
        this._game = game;
        this._size = size;
        this._display = new LayerManager(game, this);

        if(load)
        {
            // Read Json File and parse it
        }
    }

    public size(): number
    {
        return this._size;
    }
}

export class BoardEditor extends Board
{
    constructor(game: Oddkyn.Game, size: number)
    {
        super(game, size);
        this.representation = new Array<Array<SquareEditor>>(size);
        for(let i = 0; i < this.representation.length; ++i)
        {
            this.representation[i] = new Array<SquareEditor>(size);
            for(let j = 0; j < this.representation[i].length; ++j)
            {
                this.addSquare(i, j, 0, "empty", BoardElement.Orientation.North);
            }
        }
        for(let i = 0; i < this.representation.length; ++i)
        {
            for(let square of this.representation[i])
            {
                square.computeNeighbours();
            }
        }
    }

    public addSquare(i: number, j: number, z: number, key: string, ori: BoardElement.Orientation)
    {
        let s = new SquareEditor(this._game, this, i, j, z, key, ori);
        this._display.addGC(i, j, z, s, Layer.Type.Environment);
        this.representation[i][j] = s;
    }

    public removeSquare(i: number, j: number, z: number, s: Square)
    {
        let sdown = s._neighbours[Square.Neighbour.Down];
        if(sdown != undefined)
        {
            sdown._neighbours[Square.Neighbour.Up] = undefined; 
        }
        //sdown.computeNeighbours();
        this._display.removeGC(i, j, z, s, Layer.Type.Environment);
    }

    public getKey(): string
    {
        return "grass";
    }

    public getOri(): BoardElement.Orientation
    {
        return BoardElement.Orientation.North;
    }

}





}