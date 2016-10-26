/// <reference path="../Core/Board.ts" />
/// <reference path="../Game.ts" />
/// <reference path="State.ts" />

module Oddkyn
{

export module State
{

export class Editor extends State.PlayableState
{

    init()
    {
        this.game.stage.backgroundColor = "#A4A4A4";
    }

    preload()
    {
    }

    create()
    {
        this.game.input.mouse.capture = true;
        this.board = new GameElement.Board(5);
        this.blockManager = new Engine.BlockManager(this);
        this.blockManager.add("Game", new Engine.InGame(this));
        this.blockManager.add("Game", new Engine.InMenu(this));
        this.blockManager.add("Game", new Engine.InPause(this));
        this.blockManager.add("Editor", new Engine.Editor(this, 20, 100, false));
        this.blockManager.update();
    }

    update()
    {
        if(this.events.environmentNeedUpdate())
        {
            console.log("Update");
            //this.display.updateEnvironment();
        }

        /*
        if(this.game.input.activePointer.leftButton.isDown && this.notDown)
        {
            this.notDown = false;
            console.log("COUCOU", this.notDown);
            
        }
        else if(this.game.input.activePointer.leftButton.isUp)
        {
            this.notDown = true;
        }
        */
    }
}

}

}