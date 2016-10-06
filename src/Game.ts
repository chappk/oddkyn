module Oddkyn
{

export class Game extends Phaser.Game
{
    constructor()
    {
        super(800, 600, Phaser.AUTO, 'game', null);

        this.state.add('Boot', Boot, false);
        this.state.add('PreLoader', PreLoader, false);
        this.state.add('LevelEditor', LevelEditor, false);

        this.state.start('Boot', true, true);
    }
}

}

// when the page has finished loading, create our game
window.onload = () => {
	var game = new Oddkyn.Game();
}