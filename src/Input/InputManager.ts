

module Oddkyn
{

export class InputManager
{


    public onReleased: Phaser.Signal = new Phaser.Signal();
    public onPressed: Phaser.Signal = new Phaser.Signal();
    public onOver: Phaser.Signal = new Phaser.Signal();
    public onOut: Phaser.Signal = new Phaser.Signal();

    private _game: Oddkyn.Game;
    private _environmentNeedUpdate: boolean = true;

    constructor(game: Oddkyn.Game)
    {
        this._game = game;
        this.onReleased.add(this._onSquareReleased, this);
        this.onPressed.add(this._onSquarePressed, this);
        this.onOver.add(this._onSquareOver, this);
        this.onOut.add(this._onSquareOut, this);
    }


    private _onSquareReleased(gc: Engine.GCGameElement<GameElement.Square>, p: Phaser.Pointer): void
    {
        let square: GameElement.Square = gc.object();
        let oldTop: GameElement.Square = square.getTop();
        if(p.leftButton.justReleased())
        {
            let newTop: GameElement.Square = new GameElement.Square(oldTop.i(), oldTop.j(), 
                oldTop.k() + 1, oldTop.key(), oldTop.orientation());
            oldTop.computeNeighbours((<State.PlayableState>this._game.state.getCurrentState()).board, newTop);
            this._environmentNeedUpdate = true;
        }
        if(p.middleButton.justReleased())
        {
            oldTop.computeNeighbours((<State.PlayableState>this._game.state.getCurrentState()).board, oldTop);
            this._environmentNeedUpdate = true;
        }
        p.reset();
    }

    private _onSquarePressed(gc: Engine.GCGameElement<GameElement.Square>, p: Phaser.Pointer): void
    {
        
    }

    private _onSquareOver(gc: Engine.GCGameElement<GameElement.Square>, p: Phaser.Pointer): void
    {
        if(gc.isSquare())
        {
            gc.tint = 0xFF00FF;
        }
    }

    private _onSquareOut(gc: Engine.GCGameElement<GameElement.Square>, p: Phaser.Pointer): void
    {
        if(gc.isSquare())
        {
            gc.tint = 0xFFFFFF;
        }
    }

    public environmentNeedUpdate(): boolean
    {
        let old: boolean = this._environmentNeedUpdate;
        if(old)
        {
            this._environmentNeedUpdate = false;
        }
        return old;
    }
}

}