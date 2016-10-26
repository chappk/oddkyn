module Oddkyn
{

export module Engine
{

export class GCGameElement<T extends GameElement.GameElement> extends Phaser.Sprite
{
    private _object: T;

    constructor(game: Oddkyn.Game, x: number, y: number, 
        object: T)
    {
        super(game, x, y, object.key());
        this._object = object;
        this.inputEnabled = true;

        this.input.pixelPerfectAlpha = 5;
        this.input.pixelPerfectOver = true;
        this.input.pixelPerfectClick = true;

        this.events.onInputUp.add(this._onReleased, this);
        this.events.onInputDown.add(this._onPressed, this);
        this.events.onInputOver.add(this._onOver, this);
        this.events.onInputOut.add(this._onOut, this);

    }

    private _onReleased(gc: Engine.GCGameElement<T>, p: Phaser.Pointer): void
    {
        (<State.PlayableState>this.game.state.getCurrentState()).events.onReleased.dispatch(this, p);
    }

    private _onPressed(gc: Engine.GCGameElement<T>, p: Phaser.Pointer): void
    {
        (<State.PlayableState>this.game.state.getCurrentState()).events.onPressed.dispatch(this, p);
    }

    private _onOver(gc: Engine.GCGameElement<T>, p: Phaser.Pointer): void
    {
        (<State.PlayableState>this.game.state.getCurrentState()).events.onOver.dispatch(this, p);
    }

    private _onOut(gc: Engine.GCGameElement<T>, p: Phaser.Pointer): void
    {
        (<State.PlayableState>this.game.state.getCurrentState()).events.onOut.dispatch(this, p);
    }

    public isSquare(): boolean
    {
        return this._object instanceof GameElement.Square;
    }

    public isCharacter(): boolean
    {
        return this._object instanceof Oddkyn.Character;
    }

    public object(): T
    {
        return this._object;
    }
}

}

}