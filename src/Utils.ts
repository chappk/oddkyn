/// <reference path="Game.ts" />

module Oddkyn
{
/*
export class Utils
{
    public static worldToboard(game: Oddkyn.Game, x: number, y: number, boardSize: number): [number, number]
    {
         let dH = game.height * 0.5 - 
            ((boardSize - 1) * 0.5 * (CaseEditor.Data.height - CaseEditor.Data.side) + 
            CaseEditor.Data.halfHeight);
        let dW = game.width * 0.5 - CaseEditor.Data.halfWidth;

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
        
        if (Utils.inTriangle(ox, oy, 
                            ox + chw, oy, 
                            ox, oy + cdhus2, 
                            x, y)) {
            i --;
        } else if (Utils.inTriangle(ox + chw, oy, 
                                    ox + cw, oy, 
                                    ox + cw, oy + cdhus2, 
                                    x, y)) {
            j --;
        } else if (Utils.inTriangle(ox + chw, oy + ch,
                                    ox + cw, oy + cdhus2,
                                    ox + cw, oy + ch,
                                    x, y) ||
                    Utils.inTriangle(ox + chw, oy + ch,
                                    ox + chw, oy + cdhs, 
                                    ox + cw, oy + cdhus2, 
                                    x, y)) {
            i ++;
        } else if (Utils.inTriangle(ox, oy + cdhus2, 
                                    ox + chw, oy + cdhs, 
                                    ox + chw, oy + ch, 
                                    x, y) ||
                    Utils.inTriangle(ox, oy + cdhus2, 
                                    ox, oy + ch, 
                                    ox + chw, oy + cdhs, 
                                    x, y)) {
            j ++;
        }

        return [i, j];
    }

    public static boardToWorld(game: Oddkyn.Game, i: number, j: number, boardSize: number):  [number, number]
    {
        let i0 = (i - j) * 0.5;
        let j0 = (i + j) * 0.5;

        let dH = game.height * 0.5 - 
            ((boardSize - 1) * 0.5 * (CaseEditor.Data.height - CaseEditor.Data.side) + 
            CaseEditor.Data.halfHeight);
        let dW = game.width * 0.5 - CaseEditor.Data.halfWidth;

        let cdhs = CaseEditor.Data.height - CaseEditor.Data.side;

        let x = i0 * CaseEditor.Data.width + dW;
        let y = j0 * cdhs + dH;

        return [x, y];
    }

    public static inTriangle(p0x: number, p0y: number, p1x: number, p1y: number, 
        p2x: number, p2y: number, px: number, py: number): boolean
    {
        let Area = 0.5 *(-p1y*p2x + p0y*(-p1x + p2x) + p0x*(p1y - p2y) + p1x*p2y);
        let  s = 1/(2*Area)*(p0y*p2x - p0x*p2y + (p2y - p0y)*px + (p0x - p2x)*py);
        let  t = 1/(2*Area)*(p0x*p1y - p0y*p1x + (p0y - p1y)*px + (p1x - p0x)*py);
        return s > 0 && t > 0 && 1 - t - s > 0
    }


}
*/

}