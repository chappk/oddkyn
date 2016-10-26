/// <reference path="../Game.ts" />
/// <reference path="Square/Square.ts" />

module Oddkyn
{

export module GameElement
{

export class Board
{
    // Size of the board - Must be a GameElement.Square
    protected _size: number;
    // Internal representation
    protected _representation: Array<Array<GameElement.Square>>;

    constructor(size: number, load?: string)
    {
        this._size = size;

        if(load)
        {

        }
        else
        {
            this._representation = new Array<Array<GameElement.Square>>(size);
            for(let i = 0; i < this._size; ++i)
            {
                this._representation[i] = new Array<GameElement.Square>(size);
                for(let j = 0; j < this._size; ++j)
                {
                    this._representation[i][j] = new GameElement.Square(i, j);
                }
            }
            for(let i = 0; i < this._size; ++i)
            {
                for(let j = 0; j < this._size; ++j)
                {
                    this._representation[i][j].computeNeighbours(this);
                }
            }
        }
    }

    public size(): number
    {
        return this._size;
    }

    public isSquare(i: number, j: number): boolean
    {
        return i >= 0 && j >= 0 && i < this._size && j < this._size;
    }

    public square(i: number, j: number): Oddkyn.GameElement.Square
    {
        return this._representation[i][j];
    }

    public rotate(to: Oddkyn.Rotation): void
    {
        let copy: Array<Array<GameElement.Square>> = this._representation.map(
                function(arr)
                {
                    return arr.slice();
                });
        switch(to)
        {
            case Oddkyn.Rotation.Right:
                for(let i = 0; i < this._size; ++i)
                {
                    for(let j = 0; j < this._size; ++j)
                    {
                        console.log(i,j, " ",j, this._size - 1 -i);
                        copy[i][j] = this._representation[j][this._size - 1 - i];
                    }
                }
            break;
            case Oddkyn.Rotation.Left:
                for(let i = 0; i < this._size; ++i)
                {
                    for(let j = 0; j < this._size; ++j)
                    {
                        copy[i][j] = this._representation[this._size - 1 - j][i];
                    }
                }
            break;
        }
        for(let i = 0; i < this._size; ++i)
        {
            for(let j = 0; j < this._size; ++j)
            {
                this._representation[i][j].computeNeighbours(this);
            }
        }
    }

    // Mist = brume
    public computeMist(): void
    {
        let mist: Array<Oddkyn.Position> = new Array<Oddkyn.Position>();
    }

}

}

}