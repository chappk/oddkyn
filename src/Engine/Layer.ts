module Oddkyn
{

export module Engine
{

export class Layer extends Phaser.Group
{    
    constructor(game: Oddkyn.Game, parent?: Engine.LayerManager)
    {
        super(game, parent);
    }
    

    /*
    public addEnvironment(square: GameElement.Square): void
    {
        let [x, y] = this._computeXYEnvironment(square.i(), square.j(), square.k());
        this._internalLayers[Type.Environment].add(
            new OnScreen.GCGameElement(<Oddkyn.Game>this.game, x, y, square));
        if(!square.isTop())
        {
            this.addEnvironment(square.onTop());
        } 
    }

    public removeAllEnvironments(): void
    {
        this._internalLayers[Type.Environment].removeAll(true);
    }

    public removeAllCharacters(): void
    {
        this._internalLayers[Type.Character].removeAll(true);
    }

    public removeAllParticles(): void
    {
        this._internalLayers[Type.Particle].removeAll(true);
    }

    private _computeXYEnvironment(i: number, j: number, k: number): [number, number]
    {
        let i0: number = (i - j) * 0.5;
        let j0: number = (i + j) * 0.5;

        //TODO: Compute dH in an other way
        let dH = this.game.height * 0.5 - 
            ((<State.PlayableState>this.game.state.getCurrentState()).board.size() 
            * 0.5 * (GameElement.Square.Data.Height - 
            GameElement.Square.Data.Diagonal) + GameElement.Square.Data.Height * 0.5);
        
        let dW = this.game.width * 0.5 - GameElement.Square.Data.Width * 0.5;

        let x: number = i0 * GameElement.Square.Data.Width + dW;
        let y: number = j0 * GameElement.Square.Data.Diagonal + dH - k * GameElement.Square.Data.Side;

        return [x, y];
    }
    */
}

}

}