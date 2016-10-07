/// <reference path="Visual.ts" />

module Oddkyn
{

export enum Neighbour {North = 0, East, South, West, Up, Down};

export class CaseEditor extends Visual
{

    floor: number;
    effects: string;
    board: BoardEditor;
    neighbours: Array<CaseEditor>;
    i: number;
    j: number;

    constructor(game: Oddkyn.Game, board: BoardEditor, x: number, y: number, key: string, ori = Orientation.North)
    {
        super(game, x, y, key, ori);
        this.events.onInputOver.add(this.mouseOver, this);
        this.events.onInputOut.add(this.mouseOut, this);
        game.add.existing(this);
        this.board = board;
        this.effects = key;
        this.floor = 0;
        this.events.onInputDown.add(this.__click, this);
        this.neighbours = new Array<CaseEditor>(6);
    }

    public stack(key: string, ori = Orientation.North)
    {
        let c = this.board.stack(this, key, ori);
        this.computeNeighbours(c);   
    }

    private computeNeighbours(c: CaseEditor)
    {
        if(this.floor != 0)
        {
            this.neighbours[Neighbour.Up] = c;
            c.neighbours[Neighbour.Down] = this;
        }
        if(this.board[this.i + 1][this.j].effects != "empty")
        {
            this.neighbours[Neighbour.East] = this.board[this.i + 1][this.j];
        }
        if(this.board[this.i - 1][this.j].effects != "empty")
        {
            this.neighbours[Neighbour.West] = this.board[this.i - 1][this.j];
        }
        if(this.board[this.i][this.j + 1].effects != "empty")
        {
            this.neighbours[Neighbour.North] = this.board[this.i][this.j + 1];
        }
        if(this.board[this.i][this.j - 1].effects != "empty")
        {
            this.neighbours[Neighbour.South] = this.board[this.i][this.j - 1];
        }
    }

    public unstack()
    {

    }

    private mouseOver()
    {
        this.tint = 0x00FF00;
    }

    private mouseOut()
    {
        this.tint = 0xFFFFFF;
    }

    private __click(pointer: Phaser.Pointer)
    {
        this.stack("grass");
        if(pointer.rightButton)
        {


        }
        else if (pointer.middleButton)
        {
            console.log("left");
        }
    }

}

export module CaseEditor
{
    export class Data
    {
        static height = 66;
        static width = 100;
        static halfHeight = Data.height * 0.5;
        static halfWidth = Data.width * 0.5;
        static side = 12;
        static upperSide = 6;
        static lowerSide = 6;


    }
}

}