/// <reference path="Board.ts" />

module Oddkyn
{

export class LevelEditor extends Phaser.State
{

    board: BoardEditor;
    notDown: boolean;

    init()
    {
        this.game.stage.backgroundColor = "#A4A4A4";
        
    }

    preload()
    {

    }

    create()
    {
        this.notDown = true;
        this.game.input.mouse.capture = true;
        this.board = new BoardEditor(this.game, 3);
    }

    update()
    {
        if(this.game.input.activePointer.leftButton.isDown && this.notDown)
        {
            this.notDown = false;
            console.log("COUCOU", this.notDown);
            
        }
        else if(this.game.input.activePointer.leftButton.isUp)
        {
            this.notDown = true;
        }
    }
}

}