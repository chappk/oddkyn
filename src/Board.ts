/// <reference path="Case.ts" />

module Oddkyn
{

export class BoardEditor extends Phaser.Polygon
{
    game: Oddkyn.Game;
    size: number
    boardArray: Array<Array<CaseEditor>>;
    casesLayer: Array<Phaser.Group>;
    charactersLayer: Array<Phaser.Group>;
    board: Phaser.Group;


    constructor(game: Oddkyn.Game, size = 17)
    {
        super();
        this.game = game;
        this.size = size;
        this.board = game.add.group();
        this.casesLayer = new Array<Phaser.Group>();
        this.charactersLayer = new Array<Phaser.Group>();
        this.boardArray = new Array<Array<CaseEditor>>();
        this.addLayer();
        for(var i: number = 0; i < this.size; i++) 
        {
            this.boardArray[i] = new Array<CaseEditor>();
            for(var j: number = 0; j < this.size; j++) 
            {
                let [x, y] = this.ijToxy(i, j);
                this.boardArray[i][j] = new CaseEditor(game, this, x, y, "empty");
                this.casesLayer[0].add(this.boardArray[i][j]);
            }
        }

        //Construct Polygon View
        let gCX = game.world.centerX;
        let gCY = game.world.centerY;
        let gHH = game.world.height * 0.5;
        let gHW = game.world.width * 0.5;
        
        let dH = (this.size - 1) * 0.5 * (CaseEditor.Data.height - CaseEditor.Data.side) + CaseEditor.Data.halfHeight;
        let dW = this.size * CaseEditor.Data.halfWidth;

        this.points = new Array<Phaser.Point>();
        this.points.push(new Phaser.Point(gCX, gCY - dH));
        this.points.push(new Phaser.Point(gCX + dW, gCY - CaseEditor.Data.upperSide));
        this.points.push(new Phaser.Point(gCX, gCY + dH - CaseEditor.Data.side));
        this.points.push(new Phaser.Point(gCX - dW, gCY - CaseEditor.Data.upperSide));

        let graphic = game.add.graphics(0, 0);
        graphic.alpha = 0.2;
        graphic.beginFill(0xFF33FF);
        graphic.drawPolygon(this);
        graphic.endFill();
        //game.input.onDown.add(this.click, this);

        game.world.bringToTop(this.board);
    }

    public translate(x: number, y: number)
    {
        for(let p of <Array<Phaser.Point>>this.points)
        {
            p.setTo(p.x + x, p.y + y);
        }
    }

    public addLayer()
    {
        this.casesLayer.push(this.game.add.group(this.board));
        this.charactersLayer.push(this.game.add.group(this.board));
    }

    private click(pointer: Phaser.Pointer)
    {
            
        if(this.contains(pointer.x, pointer.y))
        {
            let [i, j] = this.xyToij(pointer.x, pointer.y);

            if(i < this.size && j < this.size && i >= 0 && j >= 0 && 
                this.boardArray[i][j] == null)
            {
                this.addCase(i, j);
            } 
            else
            {
                let c =this.boardArray[i][j].stack("grass");
                //this.casesLayer.add(c);
                //this.cases.sort('y', Phaser.Group.SORT_ASCENDING);
            }
        }
    }

    public stack(c: CaseEditor, key: string, ori: Orientation)
    {
        while(c.neighbours[Neighbour.Up])
        {
            c = c.neighbours[Neighbour.Up];
        }
        let y = c.y - CaseEditor.Data.side;
        let cTop = new CaseEditor(this.game, this, c.x, y, key, ori);
        cTop.floor = c.floor + 1;
        if (cTop.floor >= this.casesLayer.length)
        {
            this.addLayer();
        }
        this.casesLayer[cTop.floor].add(cTop);
        this.casesLayer[cTop.floor].sort('y', Phaser.Group.SORT_ASCENDING);
        return cTop;
    }

    private addCase(i: number, j: number, key = "grass", ori = Orientation.North)
    {
        let [x, y] = this.ijToxy(i, j);
        //this.boardArray[i][j] = new CaseEditor(this.game, x, y, key, ori);
        //this.cases.add(this.boardArray[i][j]);
        //this.cases.sort('y', Phaser.Group.SORT_ASCENDING);
    }

    private xyToij(x: number, y: number)
    {
        let dH = this.game.height * 0.5 - 
            ((this.size - 1) * 0.5 * (CaseEditor.Data.height - CaseEditor.Data.side) + 
            CaseEditor.Data.halfHeight);
        let dW = this.game.width * 0.5 - CaseEditor.Data.halfWidth;

        let xx = x - dW;
        let yy = y - dH;
        
        let cw = CaseEditor.Data.width;
        let chw = CaseEditor.Data.halfWidth;
        let ch = CaseEditor.Data.height;
        let chh = CaseEditor.Data.halfHeight;
        let cdhs = CaseEditor.Data.height - CaseEditor.Data.side;
        let cdhus2 = chh - CaseEditor.Data.upperSide;

        let i0 = Math.floor(xx / cw);
        let j0 = Math.floor(yy/ cdhs);

        let i = i0 + j0;
        let j = j0 - i0;

        let ox = i0 * cw + dW;
        let oy = j0 * cdhs + dH;
        
        if (this.inTriangle(ox, oy, 
                            ox + chw, oy, 
                            ox, oy + cdhus2, 
                            x, y)) {
            i --;
        } else if (this.inTriangle( ox + chw, oy, 
                                    ox + cw, oy, 
                                    ox + cw, oy + cdhus2, 
                                    x, y)) {
            j --;
        } else if (this.inTriangle( ox + chw, oy + ch,
                                    ox + cw, oy + cdhus2,
                                    ox + cw, oy + ch,
                                    x, y) ||
                    this.inTriangle(ox + chw, oy + ch,
                                    ox + chw, oy + cdhs, 
                                    ox + cw, oy + cdhus2, 
                                    x, y)) {
            i ++;
        } else if (this.inTriangle( ox, oy + cdhus2, 
                                    ox + chw, oy + cdhs, 
                                    ox + chw, oy + ch, 
                                    x, y) ||
                    this.inTriangle(ox, oy + cdhus2, 
                                    ox, oy + ch, 
                                    ox + chw, oy + cdhs, 
                                    x, y)) {
            j ++;
        }

        return [i, j];
    }

    private ijToxy(i: number, j: number)
    {
        let i0 = (i - j) * 0.5;
        let j0 = (i + j) * 0.5;

        let dH = this.game.height * 0.5 - 
            ((this.size - 1) * 0.5 * (CaseEditor.Data.height - CaseEditor.Data.side) + 
            CaseEditor.Data.halfHeight);
        let dW = this.game.width * 0.5 - CaseEditor.Data.halfWidth;

        let cdhs = CaseEditor.Data.height - CaseEditor.Data.side;

        let x = i0 * CaseEditor.Data.width + dW;
        let y = j0 * cdhs + dH;
        
        return [x, y];
    }

    private inTriangle(p0x: number, p0y: number, p1x: number, p1y: number, 
        p2x: number, p2y: number, px: number, py: number) 
    {
        let Area = 0.5 *(-p1y*p2x + p0y*(-p1x + p2x) + p0x*(p1y - p2y) + p1x*p2y);
        let  s = 1/(2*Area)*(p0y*p2x - p0x*p2y + (p2y - p0y)*px + (p0x - p2x)*py);
        let  t = 1/(2*Area)*(p0x*p1y - p0y*p1x + (p0y - p1y)*px + (p1x - p0x)*py);
        return s > 0 && t > 0 && 1 - t - s > 0
    }
}

}