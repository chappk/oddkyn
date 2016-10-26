/// <reference path="InputManager.ts" />

module Oddkyn
{

export class Game extends Phaser.Game
{

    constructor()
    {
        super(500, 800, Phaser.AUTO, 'game', null);

        this.state.add('Boot', State.Boot, false);
        this.state.add('PreLoader', State.Load, false);
        this.state.add('LevelEditor', State.Editor, false);

        this.state.start('Boot', true, true);

    }
}

}

// when the page has finished loading, create our game
window.onload = () => {
	var game = new Oddkyn.Game();
}