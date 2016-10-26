/// <reference path="../Game.ts" />

module Oddkyn
{

export module State
{

export class Load extends Phaser.State
{
    private _preLoadBar: Phaser.Sprite;

    preload()
    {
        this._preLoadBar = this.add.sprite(200, 250, 'preLoadBar');
        this.load.setPreloadSprite(this._preLoadBar);

        this.load.spritesheet('grass', 'assets/tiles/new_model.png', 50, 75, 4);
        this.load.spritesheet('empty', 'assets/tiles/empty.png', 50, 75, 4);
        this.load.spritesheet('arrows_rotation', 'assets/meni/arrows_rotation.png', 50, 50, 3);
    }

    create()
    {
        var tween = this.add.tween(this._preLoadBar).to({alpha: 0}, 1000, 
            Phaser.Easing.Linear.None, true); 
        tween.onComplete.add(this.startMainMenu, this);
    } 

    startMainMenu()
    {
        (<Oddkyn.Game>this.game).state.start('LevelEditor', true, false);
    }
}

}

}