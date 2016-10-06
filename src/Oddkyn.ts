/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="../src/Splash.ts" />


class LOL
{
	game:Phaser.Game;
	idx: number;

	constructor()
	{
		// create our phaser game
		// 800 - width
		// 600 - height
		// Phaser.AUTO - determine the renderer automatically (canvas, webgl)
		// 'content' - the name of the container to add our game to
		// { preload:this.preload, create:this.create} - functions to call for our states
		this.game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', 
			{preload: this.preload, create: this.create});
		//this.game.add('Load', )
		this.idx = 0
	}
	
	preload()
	{
		
	}
	
	create()
	{
		let splashs_key = this.game.cache.getKeys(Phaser.Cache.IMAGE);
		let splash_events  = this.game.time.events.repeat(3 * Phaser.Timer.SECOND,
			splashs_key.length, this.showSplash, this);
	}

	showSplash(keys: Array<string>) 
	{
		if(this.idx < keys.length)
		{
			let splash = new Splash(this.game, keys[this.idx]);
		}
		else
		{
			this.game.cache.destroy();
			this.game.state.start('Load');
		}
	}
}

 
