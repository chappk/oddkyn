/// <reference path="../../tsDefinitions/phaser.d.ts" />

module Oddkyn
{

export class Splash
{
    private sprite: Phaser.Sprite
    private tween: Phaser.Tween

    constructor(game: Phaser.Game, key: string)
    {
        this.sprite = game.add.sprite(game.world.centerX, game.world.centerY, key);
        this.sprite.alpha = 0;
        this.sprite.anchor.set(0.5, 0.5);
        this.tween = game.add.tween(this.sprite).to({alpha: 1}, 3 * Phaser.Timer.SECOND, 
            "Linear", true, 0, 0);
        this.tween.onComplete.add(this.end, this);
    }

    private end() 
    {
        this.sprite.game.time.events.add(Phaser.Timer.SECOND, this.kill, this);
    }

    private kill()
    {
        this.sprite.game.cache.removeImage(this.sprite.name);
        this.sprite.kill();
    }

}

}