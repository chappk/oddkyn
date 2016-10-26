module Oddkyn
{

export module State
{

export class Menu extends State.MenuState
{
    init()
    {

    }

    preload()
    {

    }

    create()
    {
        this.game.input.mouse.capture = true;
        this.blockManager = new Engine.BlockManager(this);
        this.blockManager.add("Menu", new Engine.Menu(this));
    }

    update()
    {

    }
}

}

}