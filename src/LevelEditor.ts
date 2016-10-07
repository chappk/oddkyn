/// <reference path="Board.ts" />

module Oddkyn
{

export class LevelEditor extends Phaser.State
{

    board: BoardEditor;

    init()
    {
        this.game.stage.backgroundColor = "#A4A4A4";
    }

    preload()
    {

    }

    create()
    {
        this.board = new BoardEditor(this.game, 9);
    }    
}

}