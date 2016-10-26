/// <reference path="../../Game.ts" />
/// <reference path="../../Engine/GraphicsComponent.ts" />

module Oddkyn
{

export module GameElement
{

export class Square implements GameElement.GameElement
{
    protected _position: Oddkyn.Position
    protected _key: string;
    protected _orientation: Oddkyn.Orientation;
    protected _neighbours: Array<GameElement.Square>;

    constructor(i: number, j: number, k = 0, 
        key = "grass", orientation = Oddkyn.Orientation.North)
    {
        this._position = new Oddkyn.Position(i, j, k);
        this._key = key;
        this._orientation = orientation;
        this._neighbours = new Array<GameElement.Square>(6);
    }

    public i(): number
    {
        return this._position.i();
    }

    public j(): number
    {
        return this._position.j();
    }

    public k(): number
    {
        return this._position.k();
    }

    public key(): string
    {
        return this._key;
    }

    public orientation(): Oddkyn.Orientation
    {
        return this._orientation;
    }

    public isTop(): boolean
    {
        return this.onTop() === undefined;
    }

    public onTop(): GameElement.Square
    {
        return this._neighbours[Neighbour.Up];
    }

    public getTop(): GameElement.Square
    {
        if(this.isTop())
        {
            return this;
        }
        else
        {
            return this.onTop().getTop();
        }
    }

    public isNorth(): boolean
    {
        return this.onNorth() === undefined;
    }

    public onNorth(): GameElement.Square
    {
        return this._neighbours[Neighbour.North];
    }

    public isEast(): boolean
    {
        return this.onEast() === undefined;
    }

    public onEast(): GameElement.Square
    {
        return this._neighbours[Neighbour.East];
    }

    public isSouth(): boolean
    {
        return this.onSouth() === undefined;
    }

    public onSouth(): GameElement.Square
    {
        return this._neighbours[Neighbour.South];
    }

    public isWest(): boolean
    {
        return this.onWest() === undefined;
    }

    public onWest(): GameElement.Square
    {
        return this._neighbours[Neighbour.West];
    }

    public rotate(to: Oddkyn.Rotation): void
    {
        switch(to)
        {
            case Oddkyn.Rotation.Right:
                this._orientation = (this._orientation - 1)%4;
            break;
            case Oddkyn.Rotation.Left:
                this._orientation = (this._orientation + 1)%4;
            break;
        }
    }

    public computeNeighbours(board: GameElement.Board, top?: GameElement.Square)
    {
        if(top)
        {
            if(top === this && top.k() != 0)
            {
                let down: Square = this._neighbours[Neighbour.Down];
                down._neighbours[Neighbour.Up] = undefined;
            }
            else if(top != this)
            {
                this._neighbours[Neighbour.Up] = top;
                top._neighbours[Neighbour.Down] = this;
            }
        }

        if(board.isSquare(this.i() - 1, this.j()))
        {
            let north = board.square(this.i() - 1, this.j());
            this._neighbours[Neighbour.North] = north;
            north._neighbours[Neighbour.South] = this;
        }
        if(board.isSquare(this.i() + 1, this.j()))
        {
            let south = board.square(this.i() + 1, this.j());
            this._neighbours[Neighbour.South] = south;
            south._neighbours[Neighbour.North] = this;
        }
        if(board.isSquare(this.i(), this.j() - 1))
        {
            let west = board.square(this.i(), this.j() - 1);
            this._neighbours[Neighbour.West] = west;
            west._neighbours[Neighbour.East] = this;
        }
        if(board.isSquare(this.i(), this.j() + 1))
        {
            let east = board.square(this.i(), this.j() + 1);
            this._neighbours[Neighbour.East] = east;
            east._neighbours[Neighbour.West] = this;
        }
    }

    public computeEffects(): [number, number, number, number]
    {
        let life: number = 0;
        let mana: number = 0;
        let movement: number = 0;
        let range: number = 0;

        return [life, mana, movement, range];
    }

    public toStr(): string
    {
        /*

        let down = top;
        console.log("--------------------------------------")
        while(down._neighbours[Neighbour.Down] != undefined)
        {
            console.log(down.toStr());
            down = down._neighbours[Neighbour.Down];
        }
        */
        return "Square: " + this._position.i() + " " + this._position.j() + " " + this._position.k();
    }
}

export module Square
{
    export class Data
    {
        public static Height = 75;
        public static Width = 50;
        public static Diagonal = 28;
        public static Side = 16;
    }
}

}

}