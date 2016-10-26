module Oddkyn
{

export module Engine
{

export class BlockManager
{
    private _state: State.BaseState;
    private _blocks: {[part: string]: {[id: string]: Engine.Block}};

    constructor(state: State.BaseState)
    {
        this._state = state;
    }

    public add(part: string, id: string, block: Engine.Block, visible = true): void
    {
        block.visibility(visible);
        this._blocks[part][id] = block;
    }

    public update(): void
    {
        let percentages: Array<[number, number]> = new Array<[number, number]>();
        for(let part in this._blocks)
        {
            let tower: {[id: string]: Engine.Block} = this._blocks[part];
            for(let id in tower)
            {
                percentages.push([tower[id].percentH(), tower[id].percentW()]);
                break;
            }
        }
        let update: Array<[number, number, number, number]> = 
            this._computeXYHeightWidth(percentages);
        let idx: number = 0;
        for(let part in this._blocks)
        {
            let tower: {[id: string]: Engine.Block} = this._blocks[part];
            for(let id in tower)
            {
                tower[id].resize(update[idx][2], update[idx][3]);
                tower[id].move(update[idx][0], update[idx][1]);
            }
            idx ++;
        }
    }

    private _computeXYHeightWidth(percentages: Array<[number, number]>):
        Array<[number, number, number, number]>
    {
        let XYHeightWidth: Array<[number, number, number, number]> = 
            new Array<[number, number, number, number]>(percentages.length);

        let h: number = this._state.game.height;
        let w: number = this._state.game.width;
        let x: number = 0;
        let y: number = 0;

        let percentageH: Array<number> = new Array<number>();
        let resizableH: Array<boolean> = new Array<boolean>();
        let nbResizableH: number;
        let percentageW: Array<number> = new Array<number>();
        let resizableW: Array<boolean> = new Array<boolean>();
        let nbResizableW: number;
        for(let p of percentages)
        {
            percentageH.push(p[0]);
            resizableH.push(p[0] == 100);
            percentageW.push(p[1]);
            if(p[0] == 100)
                nbResizableH ++;
            resizableW.push(p[1] == 100);
            if(p[1] == 100)
                nbResizableW ++;
        }

        let sumH: number = percentageH.reduce(function(pv, cv) { return pv + cv;}, 0);
        let toTakeH: number = sumH - 100;
        let partH: number = toTakeH / nbResizableH;
        for(let idx in percentageH)
        {
            if(resizableH[idx])
                percentageH[idx] = percentageH[idx] - partH;
        }

        let sumW: number = percentageW.reduce(function(pv, cv) { return pv + cv;}, 0);
        let toTakeW: number = sumH - 100;
        let partW: number = toTakeW / nbResizableW;
        for(let idx in percentageW)
        {
            if(resizableW[idx])
                percentageW[idx] = percentageW[idx] - partW;
        }
        
        for(let idx in percentageH)
        {
            let xyhx: [number, number, number, number] = [x, y, h * percentageH[idx], w * percentageW[idx]];
            x = x + w * percentageW[idx];
            y = y + h * percentageH[idx];
        }

        return XYHeightWidth;
    }

}

}

}