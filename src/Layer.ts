/// <reference path="Game.ts" />
/// <reference path="Board.ts" />
module Oddkyn
{

export class Layer extends Phaser.Group
{
    private _layers: Array<Phaser.Group>;
    
    constructor(game: Oddkyn.Game, parent?: Phaser.Group)
    {
        super(game, parent);
        this._layers = new Array<Phaser.Group>(3);
        for(let i: number = 0; i < this._layers.length; ++i)
        {
            this._layers[i] = game.add.group(this);
        }
    }

    public addGC(gc: GraphicsComponent, type: Layer.Type): void
    {
        this._layers[type].add(gc);
    }

    public removeGC(gc: GraphicsComponent, type: Layer.Type):void 
    {
        this._layers[type].remove(gc);
        gc.kill();
    }
}


export module Layer
{
export enum Type {Environment = 0, Playable, Particle};
}

export class LayerManager extends Phaser.Group
{
    // Hold reference to Oddkyn Game
    private _game: Oddkyn.Game;
    private _layers: Array<Layer>;
    private _board: Board;

    constructor(game: Oddkyn.Game, board: Board)
    {
        super(game);
        this._board = board;
        this._layers = new Array<Layer>(2 * board.size() - 1);
        for(let i: number = 0; i < this._layers.length; ++i)
        {
            this._layers[i] = new Layer(game, this);
        }
    }

    public addGC(i: number, j: number, z:number, 
        gc: GraphicsComponent, type: Layer.Type): void
    {
        switch(type)
        {
            case Layer.Type.Environment:
                [gc.x, gc.y] = this.computeEnvironmentXY(i, j, z);
            break;
            case Layer.Type.Particle:
            break;
            case Layer.Type.Playable:
            break;
        }
        this._layers[i+j].addGC(gc, type);
        this.sort('y', Phaser.Group.SORT_ASCENDING);
    }
   
    public removeGC(i: number, j: number, z:number,
        gc: GraphicsComponent, type: Layer.Type)
    {
        this._layers[i+j].removeGC(gc, type);
        this.sort('y', Phaser.Group.SORT_ASCENDING);
    }

    private computeEnvironmentXY(i: number, j: number, z: number): [number, number]
    {
        let i0 = (i - j) * 0.5;
        let j0 = (i + j) * 0.5;

        let dH = this.game.height * 0.5 - 
            ((this._board.size() - 1) * 0.5 * (Square.Data.height - 
            Square.Data.side) + Square.Data.halfHeight);
        let dW = this.game.width * 0.5 - Square.Data.halfWidth;

        let cdhs = Square.Data.height - Square.Data.side;

        let x = i0 * Square.Data.width + dW;
        let y = j0 * cdhs + dH - Square.Data.side * z;
        return [x, y];
    }
}

}