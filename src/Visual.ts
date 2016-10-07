module Oddkyn
{

export enum Orientation {North = 0, West, South, East}

export class Visual extends Phaser.Sprite
{
    protected orientation: Orientation;

    constructor(game: Phaser.Game, x: number, y: number, key: string, ori = Orientation.North)
    {
        super(game, x, y, key);
        this.inputEnabled = true;
        this.input.pixelPerfectAlpha = 5;
        this.input.pixelPerfectOver = true;
        this.input.pixelPerfectClick = true;
        this.orientation = ori;
        this.frame = this.orientation;
    }

    rotateRight()
    {
        this.frame = (this.orientation + 1)%4;
    }

    rotateLeft()
    {
        this.frame = (this.orientation - 1)%4;
    }
}

}