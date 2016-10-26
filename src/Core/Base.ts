module Oddkyn
{

export enum Rotation {Right = 0, Left};

export enum Orientation {North = 0, East, South, West}

export enum Type {Environment = 0, Character, Particle, Mist}

export enum Neighbour {North = 0, East, South, West, Up, Down};

export class Position
{
    private _i: number;
    private _j: number;
    private _k: number;

    constructor(i: number, j: number, k = 0)
    {
        this._i = i;
        this._j = j;
        this._k = k;
    }

    public i(): number
    {
        return this._i;
    }

    public j(): number
    {
        return this._j;
    }

    public k(): number
    {
        return this._k;
    }
}

}