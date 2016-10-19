
module Oddkyn
{

enum InputType {Mouse = 0, Keyboard};

export class Input
{

    private _callback: (...names) => void;
    private _args: Array<any>;

    constructor(callback: (...names) => void, ...args: Array<any>)
    {
        this._callback = callback;
        this._args = args;
    }

    public resolve(): void
    {
        this._callback(this._args);
    }
}

export class InputManagerEditor
{
    public onClick: Phaser.Signal = new Phaser.Signal();
    public onRelease: Phaser.Signal = new Phaser.Signal();
    

    constructor()
    {
        this.onRelease.add(this.squareEditorRelease, this);
    }

    public squareEditorRelease(square: SquareEditor, pointer: Phaser.Pointer): void
    {
        console.log("Damn =))");
    }




}

}
