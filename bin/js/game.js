var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Oddkyn;
(function (Oddkyn) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 800, 600, Phaser.AUTO, 'game', null);
            this.state.add('Boot', Oddkyn.Boot, false);
            this.state.add('PreLoader', Oddkyn.PreLoader, false);
            this.state.add('LevelEditor', Oddkyn.LevelEditor, false);
            this.state.start('Boot', true, true);
        }
        return Game;
    }(Phaser.Game));
    Oddkyn.Game = Game;
})(Oddkyn || (Oddkyn = {}));
// when the page has finished loading, create our game
window.onload = function () {
    var game = new Oddkyn.Game();
};
/// <reference path="Game.ts" />
/// <reference path="Case.ts" />
var Oddkyn;
(function (Oddkyn) {
    var Board = (function () {
        function Board(game, size, load) {
            this._game = game;
            this._size = size;
            this._display = new Oddkyn.LayerManager(game, this);
            if (load) {
            }
        }
        Board.prototype.size = function () {
            return this._size;
        };
        return Board;
    }());
    Oddkyn.Board = Board;
    var BoardEditor = (function (_super) {
        __extends(BoardEditor, _super);
        function BoardEditor(game, size) {
            _super.call(this, game, size);
            this.representation = new Array(size);
            for (var i = 0; i < this.representation.length; ++i) {
                this.representation[i] = new Array(size);
                for (var j = 0; j < this.representation[i].length; ++j) {
                    this.addSquare(i, j, 0, "empty", Oddkyn.BoardElement.Orientation.North);
                }
            }
            for (var i = 0; i < this.representation.length; ++i) {
                for (var _i = 0, _a = this.representation[i]; _i < _a.length; _i++) {
                    var square = _a[_i];
                    square.computeNeighbours();
                }
            }
        }
        BoardEditor.prototype.addSquare = function (i, j, z, key, ori) {
            var s = new Oddkyn.SquareEditor(this._game, this, i, j, z, key, ori);
            this._display.addGC(i, j, z, s, Oddkyn.Layer.Type.Environment);
            this.representation[i][j] = s;
        };
        BoardEditor.prototype.removeSquare = function (i, j, z, s) {
            var sdown = s._neighbours[Oddkyn.Square.Neighbour.Down];
            if (sdown != undefined) {
                sdown._neighbours[Oddkyn.Square.Neighbour.Up] = undefined;
            }
            //sdown.computeNeighbours();
            this._display.removeGC(i, j, z, s, Oddkyn.Layer.Type.Environment);
        };
        BoardEditor.prototype.getKey = function () {
            return "grass";
        };
        BoardEditor.prototype.getOri = function () {
            return Oddkyn.BoardElement.Orientation.North;
        };
        return BoardEditor;
    }(Board));
    Oddkyn.BoardEditor = BoardEditor;
})(Oddkyn || (Oddkyn = {}));
var Oddkyn;
(function (Oddkyn) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.init = function () {
            this.idx = 0;
        };
        Boot.prototype.preload = function () {
            this.load.image('preLoadBar', 'assets/loader.png');
            this.load.image('phaser', 'assets/splashs/phaser.png');
        };
        Boot.prototype.create = function () {
            //let splashs_key = this.game.cache.getKeys(Phaser.Cache.IMAGE);
            var splash_keys = [];
            var idx = splash_keys.indexOf('preLoadBar');
            idx > -1 ? splash_keys.splice(idx, 1) : [];
            var splash_events = this.time.events.repeat(
            //4 * Phaser.Timer.SECOND,
            0, splash_keys.length + 1, this.showSplash, this, splash_keys);
        };
        Boot.prototype.showSplash = function (keys) {
            if (this.idx < keys.length) {
                var splash = new Splash(this.game, keys[this.idx]);
                this.idx++;
            }
            else {
                this.game.state.start('PreLoader', true, false);
            }
        };
        return Boot;
    }(Phaser.State));
    Oddkyn.Boot = Boot;
})(Oddkyn || (Oddkyn = {}));
var Oddkyn;
(function (Oddkyn) {
    var GraphicsComponent = (function (_super) {
        __extends(GraphicsComponent, _super);
        function GraphicsComponent(game, x, y, key) {
            _super.call(this, game, x, y, key);
            this.inputEnabled = true;
            this.input.pixelPerfectAlpha = 5;
            this.input.pixelPerfectOver = true;
            this.input.pixelPerfectClick = true;
        }
        return GraphicsComponent;
    }(Phaser.Sprite));
    Oddkyn.GraphicsComponent = GraphicsComponent;
    var BoardElement = (function (_super) {
        __extends(BoardElement, _super);
        function BoardElement(game, board, i, j, z, key) {
            _super.call(this, game, 0, 0, key);
            this._board = board;
            this._i = i;
            this._j = j;
            this._z = z;
        }
        BoardElement.prototype.rotate = function (rot) {
            switch (rot) {
                case BoardElement.Rotation.Right:
                    this.frame = (this.frame + 1) % 4;
                    break;
                case BoardElement.Rotation.Left:
                    this.frame = (this.frame - 1) % 4;
                    break;
            }
        };
        return BoardElement;
    }(GraphicsComponent));
    Oddkyn.BoardElement = BoardElement;
    var BoardElement;
    (function (BoardElement) {
        (function (Rotation) {
            Rotation[Rotation["Right"] = 0] = "Right";
            Rotation[Rotation["Left"] = 1] = "Left";
        })(BoardElement.Rotation || (BoardElement.Rotation = {}));
        var Rotation = BoardElement.Rotation;
        ;
        (function (Orientation) {
            Orientation[Orientation["North"] = 0] = "North";
            Orientation[Orientation["West"] = 1] = "West";
            Orientation[Orientation["South"] = 2] = "South";
            Orientation[Orientation["East"] = 3] = "East";
        })(BoardElement.Orientation || (BoardElement.Orientation = {}));
        var Orientation = BoardElement.Orientation;
        ;
    })(BoardElement = Oddkyn.BoardElement || (Oddkyn.BoardElement = {}));
})(Oddkyn || (Oddkyn = {}));
/// <reference path="Game.ts" />
/// <reference path="Board.ts" />
var Oddkyn;
(function (Oddkyn) {
    var Layer = (function (_super) {
        __extends(Layer, _super);
        function Layer(game, parent) {
            _super.call(this, game, parent);
            this._layers = new Array(3);
            for (var i = 0; i < this._layers.length; ++i) {
                this._layers[i] = game.add.group(this);
            }
        }
        Layer.prototype.addGC = function (gc, type) {
            this._layers[type].add(gc);
        };
        Layer.prototype.removeGC = function (gc, type) {
            this._layers[type].remove(gc);
            gc.kill();
        };
        return Layer;
    }(Phaser.Group));
    Oddkyn.Layer = Layer;
    var Layer;
    (function (Layer) {
        (function (Type) {
            Type[Type["Environment"] = 0] = "Environment";
            Type[Type["Playable"] = 1] = "Playable";
            Type[Type["Particle"] = 2] = "Particle";
        })(Layer.Type || (Layer.Type = {}));
        var Type = Layer.Type;
        ;
    })(Layer = Oddkyn.Layer || (Oddkyn.Layer = {}));
    var LayerManager = (function (_super) {
        __extends(LayerManager, _super);
        function LayerManager(game, board) {
            _super.call(this, game);
            this._board = board;
            this._layers = new Array(2 * board.size() - 1);
            for (var i = 0; i < this._layers.length; ++i) {
                this._layers[i] = new Layer(game, this);
            }
        }
        LayerManager.prototype.addGC = function (i, j, z, gc, type) {
            switch (type) {
                case Layer.Type.Environment:
                    _a = this.computeEnvironmentXY(i, j, z), gc.x = _a[0], gc.y = _a[1];
                    break;
                case Layer.Type.Particle:
                    break;
                case Layer.Type.Playable:
                    break;
            }
            this._layers[i + j].addGC(gc, type);
            this.sort('y', Phaser.Group.SORT_ASCENDING);
            var _a;
        };
        LayerManager.prototype.removeGC = function (i, j, z, gc, type) {
            this._layers[i + j].removeGC(gc, type);
            this.sort('y', Phaser.Group.SORT_ASCENDING);
        };
        LayerManager.prototype.computeEnvironmentXY = function (i, j, z) {
            var i0 = (i - j) * 0.5;
            var j0 = (i + j) * 0.5;
            var dH = this.game.height * 0.5 -
                ((this._board.size() - 1) * 0.5 * (Oddkyn.Square.Data.height -
                    Oddkyn.Square.Data.side) + Oddkyn.Square.Data.halfHeight);
            var dW = this.game.width * 0.5 - Oddkyn.Square.Data.halfWidth;
            var cdhs = Oddkyn.Square.Data.height - Oddkyn.Square.Data.side;
            var x = i0 * Oddkyn.Square.Data.width + dW;
            var y = j0 * cdhs + dH - Oddkyn.Square.Data.side * z;
            return [x, y];
        };
        return LayerManager;
    }(Phaser.Group));
    Oddkyn.LayerManager = LayerManager;
})(Oddkyn || (Oddkyn = {}));
/// <reference path="Board.ts" />
var Oddkyn;
(function (Oddkyn) {
    var LevelEditor = (function (_super) {
        __extends(LevelEditor, _super);
        function LevelEditor() {
            _super.apply(this, arguments);
        }
        LevelEditor.prototype.init = function () {
            this.game.stage.backgroundColor = "#A4A4A4";
        };
        LevelEditor.prototype.preload = function () {
        };
        LevelEditor.prototype.create = function () {
            this.notDown = true;
            this.game.input.mouse.capture = true;
            this.board = new Oddkyn.BoardEditor(this.game, 3);
        };
        LevelEditor.prototype.update = function () {
            if (this.game.input.activePointer.leftButton.isDown && this.notDown) {
                this.notDown = false;
                console.log("COUCOU", this.notDown);
            }
            else if (this.game.input.activePointer.leftButton.isUp) {
                this.notDown = true;
            }
        };
        return LevelEditor;
    }(Phaser.State));
    Oddkyn.LevelEditor = LevelEditor;
})(Oddkyn || (Oddkyn = {}));
var Oddkyn;
(function (Oddkyn) {
    var PreLoader = (function (_super) {
        __extends(PreLoader, _super);
        function PreLoader() {
            _super.apply(this, arguments);
        }
        PreLoader.prototype.preload = function () {
            this.preLoadBar = this.add.sprite(200, 250, 'preLoadBar');
            this.load.setPreloadSprite(this.preLoadBar);
            this.load.spritesheet('grass', 'assets/tiles/grass.png', 100, 66, 4);
            this.load.spritesheet('empty', 'assets/tiles/empty.png', 100, 66, 4);
        };
        PreLoader.prototype.create = function () {
            var tween = this.add.tween(this.preLoadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        };
        PreLoader.prototype.startMainMenu = function () {
            this.game.state.start('LevelEditor', true, false);
        };
        return PreLoader;
    }(Phaser.State));
    Oddkyn.PreLoader = PreLoader;
})(Oddkyn || (Oddkyn = {}));
/// <reference path="../tsDefinitions/phaser.d.ts" />
var Splash = (function () {
    function Splash(game, key) {
        this.sprite = game.add.sprite(game.world.centerX, game.world.centerY, key);
        this.sprite.alpha = 0;
        this.sprite.anchor.set(0.5, 0.5);
        this.tween = game.add.tween(this.sprite).to({ alpha: 1 }, 3 * Phaser.Timer.SECOND, "Linear", true, 0, 0);
        this.tween.onComplete.add(this.end, this);
    }
    Splash.prototype.end = function () {
        this.sprite.game.time.events.add(Phaser.Timer.SECOND, this.kill, this);
    };
    Splash.prototype.kill = function () {
        this.sprite.game.cache.removeImage(this.sprite.name);
        this.sprite.kill();
    };
    return Splash;
}());
/// <reference path="Game.ts" />
var Oddkyn;
(function (Oddkyn) {
    var Square = (function (_super) {
        __extends(Square, _super);
        function Square(game, board, i, j, z, key, ori) {
            _super.call(this, game, board, i, j, z, key);
            this._neighbours = new Array(6);
            this.frame = ori;
            this._effects = key;
            this.computeNeighbours();
        }
        Square.prototype.computeNeighbours = function () {
            if (this._z > 1) {
                console.log("??: ", this.str());
                var _a = this._board.representation[this._i][this._j].onTop(), previousTop = _a[0], z = _a[1];
                console.log("Prev: ", previousTop.str());
                previousTop._neighbours[Square.Neighbour.Up] = this;
                this._neighbours[Square.Neighbour.Down] = previousTop;
                var tt = this;
                console.log("------START-------");
                while (tt._neighbours[Square.Neighbour.Down] != undefined) {
                    console.log(tt._neighbours[Square.Neighbour.Down].str());
                    tt = tt._neighbours[Square.Neighbour.Down];
                }
                console.log("-------END------");
            }
            if (this._i + 1 < this._board.size() && this._effects != "empty" &&
                this._board.representation[this._i + 1][this._j]._effects != "empty") {
                this._neighbours[Square.Neighbour.East] =
                    this._board.representation[this._i + 1][this._j];
            }
            if (this._i - 1 >= 0 && this._effects != "empty" &&
                this._board.representation[this._i - 1][this._j]._effects != "empty") {
                this._neighbours[Square.Neighbour.West] =
                    this._board.representation[this._i - 1][this._j];
            }
            if (this._j + 1 < this._board.size() && this._effects != "empty" &&
                this._board.representation[this._i][this._j + 1]._effects != "empty") {
                this._neighbours[Square.Neighbour.North] =
                    this._board.representation[this._i][this._j + 1];
            }
            if (this._j - 1 >= 0 && this._effects != "empty" &&
                this._board.representation[this._i][this._j - 1]._effects != "empty") {
                this._neighbours[Square.Neighbour.South] =
                    this._board.representation[this._i][this._j - 1].onTop()[0];
            }
        };
        Square.prototype.onTop = function () {
            var top = this;
            console.log("onTop");
            while (top._neighbours[Square.Neighbour.Up] != undefined) {
                top = top._neighbours[Square.Neighbour.Up];
                console.log("+1: ", top._neighbours[Square.Neighbour.Up]);
            }
            return [top, top._z];
        };
        Square.prototype.isTop = function () {
            return this._neighbours[Square.Neighbour.Up] != undefined;
        };
        Square.prototype.str = function () {
            return this._i + " " + this._j + " " + this._z + " " + this._effects;
        };
        return Square;
    }(Oddkyn.BoardElement));
    Oddkyn.Square = Square;
    var Square;
    (function (Square) {
        (function (Neighbour) {
            Neighbour[Neighbour["North"] = 0] = "North";
            Neighbour[Neighbour["East"] = 1] = "East";
            Neighbour[Neighbour["South"] = 2] = "South";
            Neighbour[Neighbour["West"] = 3] = "West";
            Neighbour[Neighbour["Up"] = 4] = "Up";
            Neighbour[Neighbour["Down"] = 5] = "Down";
        })(Square.Neighbour || (Square.Neighbour = {}));
        var Neighbour = Square.Neighbour;
        ;
        var Data = (function () {
            function Data() {
            }
            Data.height = 66;
            Data.width = 100;
            Data.halfHeight = Data.height * 0.5;
            Data.halfWidth = Data.width * 0.5;
            Data.side = 12;
            Data.lowerSide = 6;
            return Data;
        }());
        Square.Data = Data;
    })(Square = Oddkyn.Square || (Oddkyn.Square = {}));
    var SquareEditor = (function (_super) {
        __extends(SquareEditor, _super);
        function SquareEditor(game, board, i, j, z, key, ori) {
            _super.call(this, game, board, i, j, z, key, ori);
            this._boardEditor = board;
            this.events.onInputDown.add(this._onClick, this);
            this.events.onInputOver.add(this._mouseOver, this);
            this.events.onInputOut.add(this._mouseOut, this);
        }
        SquareEditor.prototype._onClick = function (square, pointer) {
            if (pointer.rightButton.isDown) {
                console.log("right");
            }
            else if (pointer.middleButton.isDown) {
                console.log(square.str());
                var _a = square.onTop(), s = _a[0], z = _a[1];
                square._boardEditor.removeSquare(square._i, square._j, z, s);
                square._board.representation[square._i][square._i] =
                    square._boardEditor.representation[square._i][square._j];
            }
            else if (pointer.leftButton.isDown) {
                console.log(square.str());
                var _b = square.onTop(), s = _b[0], z = _b[1];
                console.log("s: ", s.str());
                console.log("sq: ", square.str());
                square._boardEditor.addSquare(square._i, square._j, z + 1, square._boardEditor.getKey(), square._boardEditor.getOri());
                square._board.representation[square._i][square._j] =
                    square._boardEditor.representation[square._i][square._j];
            }
        };
        SquareEditor.prototype._mouseOver = function () {
            this.tint = 0x00FF00;
        };
        SquareEditor.prototype._mouseOut = function () {
            this.tint = 0xFFFFFF;
        };
        SquareEditor.prototype.changeType = function (key) {
            this.loadTexture(key);
        };
        return SquareEditor;
    }(Square));
    Oddkyn.SquareEditor = SquareEditor;
})(Oddkyn || (Oddkyn = {}));
/// <reference path="Game.ts" />
