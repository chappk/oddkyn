/// <reference path="Visual.ts" />

module Oddkyn
{

export class Case extends Visual
{

    effects: string

    constructor(game: Phaser.Game, x: number, y: number, key: string, ori = Orientation.North)
    {
        super(game, x, y, key, ori);
        this.events.onInputOver.add(this.mouseOver, this);
        this.events.onInputOut.add(this.mouseOut, this);
        game.add.existing(this);

        this.effects = key;
    }

    private mouseOver()
    {
        this.tint = 0x00FF00;
    }

    private mouseOut()
    {
        this.tint = 0xFFFFFF;
    }
}

export module Case
{
    export class Data
    {
        static height = 66;
        static width = 100;
        static halfHeight = Data.height * 0.5;
        static halfWidth = Data.width * 0.5;
        static side = 12;
        static upperSide = 6;
        static lowerSide = 6;


    }
}

}