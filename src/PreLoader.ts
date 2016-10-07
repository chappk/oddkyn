module Oddkyn
{

export class PreLoader extends Phaser.State
{
    preLoadBar: Phaser.Sprite;

    preload()
    {
        this.preLoadBar = this.add.sprite(200, 250, 'preLoadBar');
        this.load.setPreloadSprite(this.preLoadBar);

        this.load.spritesheet('grass', 'assets/tiles/grass.png', 100, 66, 4);
        this.load.spritesheet('empty', 'assets/tiles/empty.png', 100, 66, 4);
    }

    create()
    {
        var tween = this.add.tween(this.preLoadBar).to({alpha: 0}, 1000, 
            Phaser.Easing.Linear.None, true); 
        tween.onComplete.add(this.startMainMenu, this);
    } 

    startMainMenu()
    {
        this.game.state.start('LevelEditor', true, false);
    }
}

}