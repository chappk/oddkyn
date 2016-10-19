/// <reference path="Board.ts" />
/// <reference path="Game.ts" />
/// <reference path="InputManager.ts" />


module Oddkyn
{

export class LevelEditor extends Phaser.State
{

    board: BoardEditor;
    notDown: boolean;

    init()
    {
        this.game.stage.backgroundColor = "#A4A4A4";
        //this.game.inputManager = new InputManager();
        console.log((<Oddkyn.Game>this.game).inputManager.onClick);
        (<Oddkyn.Game>this.game).inputManager.onClick.add(this.create, this);
        console.log((<Oddkyn.Game>this.game).inputManager.onClick);

    }

    preload()
    {

    }

    create()
    {
        this.notDown = true;
        this.game.input.mouse.capture = true;
        this.board = new BoardEditor(<Oddkyn.Game>this.game, 3);
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