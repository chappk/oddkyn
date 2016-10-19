/// <reference path="Game.ts" />
/// <reference path="GraphicsComponent.ts" />

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
        if(this.h > 1)
        {
            console.log("Compute Neighbours of: ", this.str());
            let previousTop = this._board.representation[this.i][this.j].getTop();
            console.log("Previous Top: ", previousTop.str());
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
        /*
        if(this.i + 1 < this._board.size() && this._effects != "empty" &&
            this._board.representation[this.i + 1][this.j]._effects != "empty")
        {
            this._neighbours[Square.Neighbour.East] = 
                this._board.representation[this.i + 1][this.j];
        }
        if(this.i - 1 >= 0 && this._effects != "empty" && 
            this._board.representation[this.i - 1][this.j]._effects != "empty")
        {
            this._neighbours[Square.Neighbour.West] = 
                this._board.representation[this.i - 1][this.j];
        }
        if(this.j + 1 < this._board.size() && this._effects != "empty" && 
            this._board.representation[this.i][this.j + 1]._effects != "empty")
        {
            this._neighbours[Square.Neighbour.North] = 
                this._board.representation[this.i][this.j + 1];
        }
        if(this.j - 1 >= 0 && this._effects != "empty" && 
            this._board.representation[this.i][this.j - 1]._effects != "empty")
        {
            this._neighbours[Square.Neighbour.South] = 
                this._board.representation[this.i][this.j - 1].getTop()[0];
        }
        */
    }

    public isOnTop(): boolean
    {
        return this._neighbours[Square.Neighbour.Up] == undefined;
    }

    public getTop(): Square
    {
        console.log(this.str())
        if(this.isOnTop())
        {
            return this;
        }
        else
        {
            return this._neighbours[Square.Neighbour.Up].getTop();
        }
    }

    public isTop(): boolean
    {
        return this._neighbours[Square.Neighbour.Up] != undefined;
    }

    public str(): string
    {
        return this.i+" "+this.j+" "+this.h+" "+this._effects;
    }
}

export module Square
{
export enum Neighbour {North = 0, East, South, West, Up, Down};
export class Data
{
    static height = 75;
    static width = 50;
    static halfHeight = Data.height * 0.5;
    static halfWidth = Data.width * 0.5;
    static side = 40;
    static lowerSide = 11;   
}
}

export class SquareEditor extends Square
{
    private _boardEditor: BoardEditor;
    private _inside: boolean = false;

    constructor(game: Oddkyn.Game, board: BoardEditor, i: number, j: number, z: number,
        key: string, ori: BoardElement.Orientation)
    {
        super(game, board, i, j, z, key, ori);
        this._boardEditor = board;
        this.events.onInputUp.add(this._onRelease, this);
        this.events.onInputDown.add(this._onPressed, this);

        this.events.onInputOver.add(this._onOver, this);
        this.events.onInputOut.add(this._onOut, this);
    }

    private _onRelease(s: SquareEditor, p: Phaser.Pointer): void
    {
        if(this._inside)
        {
            if(p.middleButton.justReleased() || p.leftButton.justReleased())
            {
                console.log("Add - Remove");
                this._boardEditor.squareEditor.dispatch(s, p);
            }
        }
    }

    private _onPressed(s: SquareEditor, p: Phaser.Pointer): void
    {
        
    }

    private _onOver(s: SquareEditor, p: Phaser.Pointer): void
    {
        this._inside = true;
        this.tint = 0xFF00FF;
    }

    private _onOut(s: SquareEditor, p: Phaser.Pointer): void
    {
        this._inside = false;
        this.tint = 0xFFFFFF;
    }





























    /*

    private _onRelease(square: SquareEditor, pointer: Phaser.Pointer): void
    {
        console.log(pointer);
        if(pointer.rightButton.justReleased(10000))
        {
            console.log("JustReleased: Right")
            //this.onRightRelease.dispatch(this);
        }
        else if(pointer.leftButton.justPressed(10000))
        {
            console.log("JustReleased: Left")
            //this.onLeftRelease.dispatch(this);
        }
        console.log(pointer.target);
        (<Oddkyn.Game>this.game).inputManager.onRelease.dispatch(this, pointer);
        console.log(this.str());
    }f

    private _onClick(square: SquareEditor, pointer: Phaser.Pointer): void
    {
        console.log("???")
        console.log(pointer)
        
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

    */

}
}