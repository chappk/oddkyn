/// <reference path="Game.ts" />
module Oddkyn
{

export class Square extends BoardElement
{
    public _neighbours: Array<Square>;
    private _effects: string;

    constructor(game: Oddkyn.Game, board: Board, i: number, j: number, z: number,
        key: string, ori: BoardElement.Orientation)
    {
        super(game, board, i, j, z, key);
        this._neighbours = new Array<Square>(6);
        this.frame = ori;
        this._effects = key;
        this.computeNeighbours();
    }

    public computeNeighbours(): void
    {
        if(this._z > 1)
        {
            console.log("??: ", this.str());
            let [previousTop, z] = this._board.representation[this._i][this._j].onTop();
            console.log("Prev: ", previousTop.str());
            previousTop._neighbours[Square.Neighbour.Up] = this;
            this._neighbours[Square.Neighbour.Down] = previousTop;
            let tt: Square = this;
            console.log("------START-------");
            while (tt._neighbours[Square.Neighbour.Down] != undefined)
            {
                console.log(tt._neighbours[Square.Neighbour.Down].str());
                tt = tt._neighbours[Square.Neighbour.Down];
            }
            console.log("-------END------");
        }
        if(this._i + 1 < this._board.size() && this._effects != "empty" &&
            this._board.representation[this._i + 1][this._j]._effects != "empty")
        {
            this._neighbours[Square.Neighbour.East] = 
                this._board.representation[this._i + 1][this._j];
        }
        if(this._i - 1 >= 0 && this._effects != "empty" && 
            this._board.representation[this._i - 1][this._j]._effects != "empty")
        {
            this._neighbours[Square.Neighbour.West] = 
                this._board.representation[this._i - 1][this._j];
        }
        if(this._j + 1 < this._board.size() && this._effects != "empty" && 
            this._board.representation[this._i][this._j + 1]._effects != "empty")
        {
            this._neighbours[Square.Neighbour.North] = 
                this._board.representation[this._i][this._j + 1];
        }
        if(this._j - 1 >= 0 && this._effects != "empty" && 
            this._board.representation[this._i][this._j - 1]._effects != "empty")
        {
            this._neighbours[Square.Neighbour.South] = 
                this._board.representation[this._i][this._j - 1].onTop()[0];
        }
    }

    public onTop(): [Square, number]
    {
        let top: Square = this;
        console.log("onTop");
        while(top._neighbours[Square.Neighbour.Up] != undefined)
        {
            top = top._neighbours[Square.Neighbour.Up];
            console.log("+1: ", top._neighbours[Square.Neighbour.Up]);
        }
        return [top, top._z];
    }

    public isTop(): boolean
    {
        return this._neighbours[Square.Neighbour.Up] != undefined;
    }

    public str(): string
    {
        return this._i+" "+this._j+" "+this._z+" "+this._effects;
    }
}

export module Square
{
export enum Neighbour {North = 0, East, South, West, Up, Down};
export class Data
{
    static height = 66;
    static width = 100;
    static halfHeight = Data.height * 0.5;
    static halfWidth = Data.width * 0.5;
    static side = 12;
    static lowerSide = 6;   
}
}

export class SquareEditor extends Square
{
    private _boardEditor: BoardEditor;

    constructor(game: Oddkyn.Game, board: BoardEditor, i: number, j: number, z: number,
        key: string, ori: BoardElement.Orientation)
    {
        super(game, board, i, j, z, key, ori);
        this._boardEditor = board;
        this.events.onInputDown.add(this._onClick, this);
        this.events.onInputOver.add(this._mouseOver, this);
        this.events.onInputOut.add(this._mouseOut, this);
    }

    private _onClick(square: SquareEditor, pointer: Phaser.Pointer): void
    {
        if(pointer.rightButton.isDown)
        {
            console.log("right");
        }
        else if (pointer.middleButton.isDown)
        {

            console.log(square.str());
            let [s, z] = square.onTop();
            square._boardEditor.removeSquare(square._i, square._j, z, s);
            square._board.representation[square._i][square._i] = 
                square._boardEditor.representation[square._i][square._j];
        }
        else if(pointer.leftButton.isDown)
        {
                        console.log(square.str());
            let [s, z] = square.onTop();
            console.log("s: ",s.str());
            console.log("sq: ", square.str());
            square._boardEditor.addSquare(square._i, square._j, z + 1, 
                square._boardEditor.getKey(), square._boardEditor.getOri());
            square._board.representation[square._i][square._j] = 
                square._boardEditor.representation[square._i][square._j];
        }
    }

    private _mouseOver(): void
    {
        this.tint = 0x00FF00;
    }

    private _mouseOut(): void
    {
        this.tint = 0xFFFFFF;
    }


    public changeType(key: string): void
    {
        this.loadTexture(key);
    }

}
}