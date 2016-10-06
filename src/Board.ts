module Oddkyn
{

/// <reference path="Case.ts" />

export class Board extends Phaser.Polygon
{

    size: number

    //Datas from game instance
    gameCenterX: number
    gameCenterY: number
    gameHalfHeight: number
    gameHalfWidth: number

    game: Oddkyn.Game;

    cases: Array<Array<Case>>

    constructor(game: Oddkyn.Game, size = 17)
    {
        super();
        this.game = game;

        //Construct Board View
        this.size = size;

        this.gameCenterX = game.world.centerX;
        this.gameCenterY = game.world.centerY;
        this.gameHalfHeight = game.world.height * 0.5;
        this.gameHalfWidth = game.world.width * 0.5;
        
        let H = this.size * Case.Data.halfHeight;
        let W = this.size * Case.Data.halfWidth;

        this.points = new Array<Phaser.Point>();
        this.points.push(new Phaser.Point(this.gameCenterX, this.gameCenterY + H));
        this.points.push(new Phaser.Point(this.gameCenterX + W, this.gameCenterY + Case.Data.upperSide));
        this.points.push(new Phaser.Point(this.gameCenterX + W, this.gameCenterY - Case.Data.lowerSide));
        this.points.push(new Phaser.Point(this.gameCenterX, this.gameCenterY - H));
        this.points.push(new Phaser.Point(this.gameCenterX - W, this.gameCenterY - Case.Data.upperSide));
        this.points.push(new Phaser.Point(this.gameCenterX - W, this.gameCenterY + Case.Data.lowerSide));

        let graphic = game.add.graphics(0, 0);
        graphic.alpha = 0.2;
        graphic.beginFill(0xFF33FF);
        graphic.drawPolygon(this);
        graphic.endFill();

        game.input.onDown.add(this.click, this)

        //Init cases
        this.cases = new Array<Array<Case>>();
        for(var i: number = 0; i < this.size; i++) 
        {
            this.cases[i] = new Array<Case>();
            for(var j: number = 0; j < this.size; j++) 
            {
                this.cases[i][j] = null;
            }
        }
    }

    public translate(x: number, y: number)
    {
        for(let p of <Array<Phaser.Point>>this.points)
        {
            p.setTo(p.x + x, p.y + y);
        }
    }

    private click(pointer: Phaser.Pointer)
    {
        if(this.contains(pointer.x, pointer.y))
        {
            console.log(pointer.x, pointer.y);
            let [i, j] = this.xyToij(pointer.x, pointer.y);
            console.log(i, j);
            let [x, y] = this.ijToxy(0, 0);
            console.log(x, y);
            new Case(this.game, x, y, "grass");
        }
    }

    private addCase(i: number, j: number)
    {

    }

    private xyToij(x: number, y: number)
    {
        let xx = x - (this.game.width * 0.5 - this.size * 0.5 * Case.Data.width);
        let yy = y - (this.game.height * 0.5 - this.size * 0.5 * Case.Data.height);

        let i0 = Math.floor(xx / Case.Data.width);
        let j0 = Math.floor(yy/ (Case.Data.height));

        let i = i0 + j0;
        let 
        return [i, j];
    }

    private ijToxy(i: number, j: number)
    {
        let x = this.gameHalfWidth + (i - j - 1) * Case.Data.halfWidth;
        let C = this.gameHalfHeight - (Case.Data.halfHeight - Case.Data.upperSide) -
            (((this.size + 1) * 0.5 - 1) * Case.Data.upperSide - 
            (this.size - 1) * Case.Data.upperSide);
        let y = C + (i + j) * (Case.Data.halfHeight - Case.Data.upperSide);
        return [x, y];
    }

}

}