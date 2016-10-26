module Oddkyn
{

export module Engine
{

export class LayerManager extends Phaser.Group
{
    private _layers: {[id: string]: Engine.Layer};

    constructor(game: Oddkyn.Game, parent: Engine.Display, ids?: Array<string>)
    {
        super(game, parent);
        if(ids)
        {
            for(let id of ids)
            {
                this.addLayer(id);
            }
        }
    }
 
    public addLayer(id: string): void
    {
        if(!this.isLayer(id))
        {
            this._layers[id] = new Engine.Layer(this.game, this);
            this.game.add.group(this, id);
        }
    }
    
    public removeLayer(id: string): void
    {
        delete this._layers[id];
    }

    public updateLayer(id: string): void
    {
        
    }

    public layer(id: string): Engine.Layer
    {
        return this._layers[id];
    }

    public isLayer(id: string): boolean
    {
        return id in this._layers;
    }

    /*
    public updateEnvironment(board: GameElement.Board): void
    {
        if(this._layers != undefined)
        {
            for(let i = 0; i < board.size() * 2 - 1; ++i)
            {
                this._layer(i, 0).removeAllEnvironments();
            }
            for(let i = 0; i < board.size(); ++i)
            {
                for(let j = 0; j < board.size(); ++j)
                {
                    let square: GameElement.Square = board.square(i, j);
                    this._layer(i, j).addEnvironment(square);
                }
            }
        }
        else
        {
            this._layers = new Array<Layer>(2 * board.size() - 1);
            for(let i: number = 0; i < this._layers.length; ++i)
            {
                this._layers[i] = new Layer(<Oddkyn.Game>this.game, this);
            }
            this.updateEnvironment(board);
        }
    }

    private _layer(i: number, j: number): OnScreen.Layer
    {
        return this._layers[i + j]
    }
    */
}


}

}