module Oddkyn
{

export module State
{

export class BaseState extends Phaser.State
{
    events: Oddkyn.InputManager;
}

export class PlayableState extends BaseState
{
    public board: GameElement.Board;
    public blockManager: Engine.InGameDisplay;
}

export class MenuState extends BaseState
{

}

}

}