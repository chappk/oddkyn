module Oddkyn
{

export class Boot extends Phaser.State
{
    idx: number;

    init()
    {
        this.idx = 0;
    }

    preload()
    {
        this.load.image('preLoadBar', 'assets/loader.png');

        this.load.image('phaser', 'assets/splashs/phaser.png');   
    }

    create()
    {		
        //let splashs_key = this.game.cache.getKeys(Phaser.Cache.IMAGE);
        let splash_keys = []
        let idx = splash_keys.indexOf('preLoadBar')
        idx > -1 ? splash_keys.splice(idx, 1) : [];
        let splash_events  = this.time.events.repeat(
            //4 * Phaser.Timer.SECOND,
            0,
            splash_keys.length + 1, this.showSplash, this, splash_keys);
    }

    showSplash(keys: Array<string>) 
    {
        if(this.idx < keys.length)
        {
            let splash = new Splash(this.game, keys[this.idx]);
            this.idx ++;
        }
        else
        {
            this.game.state.start('PreLoader', true, false);
        }
    }
}

}