var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Oddkyn;
(function (Oddkyn) {
    (function (Rotation) {
        Rotation[Rotation["Right"] = 0] = "Right";
        Rotation[Rotation["Left"] = 1] = "Left";
    })(Oddkyn.Rotation || (Oddkyn.Rotation = {}));
    var Rotation = Oddkyn.Rotation;
    ;
    (function (Orientation) {
        Orientation[Orientation["North"] = 0] = "North";
        Orientation[Orientation["East"] = 1] = "East";
        Orientation[Orientation["South"] = 2] = "South";
        Orientation[Orientation["West"] = 3] = "West";
    })(Oddkyn.Orientation || (Oddkyn.Orientation = {}));
    var Orientation = Oddkyn.Orientation;
    (function (Type) {
        Type[Type["Environment"] = 0] = "Environment";
        Type[Type["Character"] = 1] = "Character";
        Type[Type["Particle"] = 2] = "Particle";
        Type[Type["Mist"] = 3] = "Mist";
    })(Oddkyn.Type || (Oddkyn.Type = {}));
    var Type = Oddkyn.Type;
    (function (Neighbour) {
        Neighbour[Neighbour["North"] = 0] = "North";
        Neighbour[Neighbour["East"] = 1] = "East";
        Neighbour[Neighbour["South"] = 2] = "South";
        Neighbour[Neighbour["West"] = 3] = "West";
        Neighbour[Neighbour["Up"] = 4] = "Up";
        Neighbour[Neighbour["Down"] = 5] = "Down";
    })(Oddkyn.Neighbour || (Oddkyn.Neighbour = {}));
    var Neighbour = Oddkyn.Neighbour;
    ;
    var Position = (function () {
        function Position(i, j, k) {
            if (k === void 0) { k = 0; }
            this._i = i;
            this._j = j;
            this._k = k;
        }
        Position.prototype.i = function () {
            return this._i;
        };
        Position.prototype.j = function () {
            return this._j;
        };
        Position.prototype.k = function () {
            return this._k;
        };
        return Position;
    }());
    Oddkyn.Position = Position;
})(Oddkyn || (Oddkyn = {}));
/// <reference path="InputManager.ts" />
var Oddkyn;
(function (Oddkyn) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 500, 800, Phaser.AUTO, 'game', null);
            this.state.add('Boot', Oddkyn.State.Boot, false);
            this.state.add('PreLoader', Oddkyn.State.Load, false);
            this.state.add('LevelEditor', Oddkyn.State.Editor, false);
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
var Oddkyn;
(function (Oddkyn) {
    var Engine;
    (function (Engine) {
        var GCGameElement = (function (_super) {
            __extends(GCGameElement, _super);
            function GCGameElement(game, x, y, object) {
                _super.call(this, game, x, y, object.key());
                this._object = object;
                this.inputEnabled = true;
                this.input.pixelPerfectAlpha = 5;
                this.input.pixelPerfectOver = true;
                this.input.pixelPerfectClick = true;
                this.events.onInputUp.add(this._onReleased, this);
                this.events.onInputDown.add(this._onPressed, this);
                this.events.onInputOver.add(this._onOver, this);
                this.events.onInputOut.add(this._onOut, this);
            }
            GCGameElement.prototype._onReleased = function (gc, p) {
                this.game.state.getCurrentState().events.onReleased.dispatch(this, p);
            };
            GCGameElement.prototype._onPressed = function (gc, p) {
                this.game.state.getCurrentState().events.onPressed.dispatch(this, p);
            };
            GCGameElement.prototype._onOver = function (gc, p) {
                this.game.state.getCurrentState().events.onOver.dispatch(this, p);
            };
            GCGameElement.prototype._onOut = function (gc, p) {
                this.game.state.getCurrentState().events.onOut.dispatch(this, p);
            };
            GCGameElement.prototype.isSquare = function () {
                return this._object instanceof Oddkyn.GameElement.Square;
            };
            GCGameElement.prototype.isCharacter = function () {
                return this._object instanceof Oddkyn.Character;
            };
            GCGameElement.prototype.object = function () {
                return this._object;
            };
            return GCGameElement;
        }(Phaser.Sprite));
        Engine.GCGameElement = GCGameElement;
    })(Engine = Oddkyn.Engine || (Oddkyn.Engine = {}));
})(Oddkyn || (Oddkyn = {}));
/// <reference path="../../Game.ts" />
/// <reference path="../../Engine/GraphicsComponent.ts" />
var Oddkyn;
(function (Oddkyn) {
    var GameElement;
    (function (GameElement) {
        var Square = (function () {
            function Square(i, j, k, key, orientation) {
                if (k === void 0) { k = 0; }
                if (key === void 0) { key = "grass"; }
                if (orientation === void 0) { orientation = Oddkyn.Orientation.North; }
                this._position = new Oddkyn.Position(i, j, k);
                this._key = key;
                this._orientation = orientation;
                this._neighbours = new Array(6);
            }
            Square.prototype.i = function () {
                return this._position.i();
            };
            Square.prototype.j = function () {
                return this._position.j();
            };
            Square.prototype.k = function () {
                return this._position.k();
            };
            Square.prototype.key = function () {
                return this._key;
            };
            Square.prototype.orientation = function () {
                return this._orientation;
            };
            Square.prototype.isTop = function () {
                return this.onTop() === undefined;
            };
            Square.prototype.onTop = function () {
                return this._neighbours[Oddkyn.Neighbour.Up];
            };
            Square.prototype.getTop = function () {
                if (this.isTop()) {
                    return this;
                }
                else {
                    return this.onTop().getTop();
                }
            };
            Square.prototype.isNorth = function () {
                return this.onNorth() === undefined;
            };
            Square.prototype.onNorth = function () {
                return this._neighbours[Oddkyn.Neighbour.North];
            };
            Square.prototype.isEast = function () {
                return this.onEast() === undefined;
            };
            Square.prototype.onEast = function () {
                return this._neighbours[Oddkyn.Neighbour.East];
            };
            Square.prototype.isSouth = function () {
                return this.onSouth() === undefined;
            };
            Square.prototype.onSouth = function () {
                return this._neighbours[Oddkyn.Neighbour.South];
            };
            Square.prototype.isWest = function () {
                return this.onWest() === undefined;
            };
            Square.prototype.onWest = function () {
                return this._neighbours[Oddkyn.Neighbour.West];
            };
            Square.prototype.rotate = function (to) {
                switch (to) {
                    case Oddkyn.Rotation.Right:
                        this._orientation = (this._orientation - 1) % 4;
                        break;
                    case Oddkyn.Rotation.Left:
                        this._orientation = (this._orientation + 1) % 4;
                        break;
                }
            };
            Square.prototype.computeNeighbours = function (board, top) {
                if (top) {
                    if (top === this && top.k() != 0) {
                        var down = this._neighbours[Oddkyn.Neighbour.Down];
                        down._neighbours[Oddkyn.Neighbour.Up] = undefined;
                    }
                    else if (top != this) {
                        this._neighbours[Oddkyn.Neighbour.Up] = top;
                        top._neighbours[Oddkyn.Neighbour.Down] = this;
                    }
                }
                if (board.isSquare(this.i() - 1, this.j())) {
                    var north = board.square(this.i() - 1, this.j());
                    this._neighbours[Oddkyn.Neighbour.North] = north;
                    north._neighbours[Oddkyn.Neighbour.South] = this;
                }
                if (board.isSquare(this.i() + 1, this.j())) {
                    var south = board.square(this.i() + 1, this.j());
                    this._neighbours[Oddkyn.Neighbour.South] = south;
                    south._neighbours[Oddkyn.Neighbour.North] = this;
                }
                if (board.isSquare(this.i(), this.j() - 1)) {
                    var west = board.square(this.i(), this.j() - 1);
                    this._neighbours[Oddkyn.Neighbour.West] = west;
                    west._neighbours[Oddkyn.Neighbour.East] = this;
                }
                if (board.isSquare(this.i(), this.j() + 1)) {
                    var east = board.square(this.i(), this.j() + 1);
                    this._neighbours[Oddkyn.Neighbour.East] = east;
                    east._neighbours[Oddkyn.Neighbour.West] = this;
                }
            };
            Square.prototype.computeEffects = function () {
                var life = 0;
                var mana = 0;
                var movement = 0;
                var range = 0;
                return [life, mana, movement, range];
            };
            Square.prototype.toStr = function () {
                /*
        
                let down = top;
                console.log("--------------------------------------")
                while(down._neighbours[Neighbour.Down] != undefined)
                {
                    console.log(down.toStr());
                    down = down._neighbours[Neighbour.Down];
                }
                */
                return "Square: " + this._position.i() + " " + this._position.j() + " " + this._position.k();
            };
            return Square;
        }());
        GameElement.Square = Square;
        var Square;
        (function (Square) {
            var Data = (function () {
                function Data() {
                }
                Data.Height = 75;
                Data.Width = 50;
                Data.Diagonal = 28;
                Data.Side = 16;
                return Data;
            }());
            Square.Data = Data;
        })(Square = GameElement.Square || (GameElement.Square = {}));
    })(GameElement = Oddkyn.GameElement || (Oddkyn.GameElement = {}));
})(Oddkyn || (Oddkyn = {}));
/// <reference path="../Game.ts" />
/// <reference path="Square/Square.ts" />
var Oddkyn;
(function (Oddkyn) {
    var GameElement;
    (function (GameElement) {
        var Board = (function () {
            function Board(size, load) {
                this._size = size;
                if (load) {
                }
                else {
                    this._representation = new Array(size);
                    for (var i = 0; i < this._size; ++i) {
                        this._representation[i] = new Array(size);
                        for (var j = 0; j < this._size; ++j) {
                            this._representation[i][j] = new GameElement.Square(i, j);
                        }
                    }
                    for (var i = 0; i < this._size; ++i) {
                        for (var j = 0; j < this._size; ++j) {
                            this._representation[i][j].computeNeighbours(this);
                        }
                    }
                }
            }
            Board.prototype.size = function () {
                return this._size;
            };
            Board.prototype.isSquare = function (i, j) {
                return i >= 0 && j >= 0 && i < this._size && j < this._size;
            };
            Board.prototype.square = function (i, j) {
                return this._representation[i][j];
            };
            Board.prototype.rotate = function (to) {
                var copy = this._representation.map(function (arr) {
                    return arr.slice();
                });
                switch (to) {
                    case Oddkyn.Rotation.Right:
                        for (var i = 0; i < this._size; ++i) {
                            for (var j = 0; j < this._size; ++j) {
                                console.log(i, j, " ", j, this._size - 1 - i);
                                copy[i][j] = this._representation[j][this._size - 1 - i];
                            }
                        }
                        break;
                    case Oddkyn.Rotation.Left:
                        for (var i = 0; i < this._size; ++i) {
                            for (var j = 0; j < this._size; ++j) {
                                copy[i][j] = this._representation[this._size - 1 - j][i];
                            }
                        }
                        break;
                }
                for (var i = 0; i < this._size; ++i) {
                    for (var j = 0; j < this._size; ++j) {
                        this._representation[i][j].computeNeighbours(this);
                    }
                }
            };
            // Mist = brume
            Board.prototype.computeMist = function () {
                var mist = new Array();
            };
            return Board;
        }());
        GameElement.Board = Board;
    })(GameElement = Oddkyn.GameElement || (Oddkyn.GameElement = {}));
})(Oddkyn || (Oddkyn = {}));
var Oddkyn;
(function (Oddkyn) {
    var Character = (function () {
        function Character() {
        }
        Character.prototype.key = function () {
            return this._key;
        };
        return Character;
    }());
    Oddkyn.Character = Character;
})(Oddkyn || (Oddkyn = {}));
/// <reference path="../../tsDefinitions/phaser.d.ts" />
var Oddkyn;
(function (Oddkyn) {
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
    Oddkyn.Splash = Splash;
})(Oddkyn || (Oddkyn = {}));
var Oddkyn;
(function (Oddkyn) {
    var Engine;
    (function (Engine) {
        var Block = (function () {
            function Block() {
            }
            Block.prototype.visibility = function (visible) {
            };
            Block.prototype.percentH = function () {
                return this._percentH;
            };
            Block.prototype.percentW = function () {
                return this._percentW;
            };
            Block.prototype.resize = function (height, width) {
                this._height = height;
                this._width = width;
            };
            Block.prototype.move = function (x, y) {
                this._x = x;
                this._y = y;
            };
            return Block;
        }());
        Engine.Block = Block;
    })(Engine = Oddkyn.Engine || (Oddkyn.Engine = {}));
})(Oddkyn || (Oddkyn = {}));
var Oddkyn;
(function (Oddkyn) {
    var Engine;
    (function (Engine) {
        var BlockManager = (function () {
            function BlockManager(state) {
                this._state = state;
            }
            BlockManager.prototype.add = function (part, id, block, visible) {
                if (visible === void 0) { visible = true; }
                block.visibility(visible);
                this._blocks[part][id] = block;
            };
            BlockManager.prototype.update = function () {
                var percentages = new Array();
                for (var part in this._blocks) {
                    var tower = this._blocks[part];
                    for (var id in tower) {
                        percentages.push([tower[id].percentH(), tower[id].percentW()]);
                        break;
                    }
                }
                var update = this._computeXYHeightWidth(percentages);
                var idx = 0;
                for (var part in this._blocks) {
                    var tower = this._blocks[part];
                    for (var id in tower) {
                        tower[id].resize(update[idx][2], update[idx][3]);
                        tower[id].move(update[idx][0], update[idx][1]);
                    }
                    idx++;
                }
            };
            BlockManager.prototype._computeXYHeightWidth = function (percentages) {
                var XYHeightWidth = new Array(percentages.length);
                var h = this._state.game.height;
                var w = this._state.game.width;
                var x = 0;
                var y = 0;
                var percentageH = new Array();
                var resizableH = new Array();
                var percentageW = new Array();
                var resizableW = new Array();
                for (var _i = 0, percentages_1 = percentages; _i < percentages_1.length; _i++) {
                    var p = percentages_1[_i];
                    percentageH.push(p[0]);
                    resizableH.push(p[0] == 100);
                    percentageW.push(p[1]);
                    resizableW.push(p[0] == 100);
                }
                for (var _a = 0, percentageH_1 = percentageH; _a < percentageH_1.length; _a++) {
                    var pH = percentageH_1[_a];
                }
                return XYHeightWidth;
            };
            return BlockManager;
        }());
        Engine.BlockManager = BlockManager;
    })(Engine = Oddkyn.Engine || (Oddkyn.Engine = {}));
})(Oddkyn || (Oddkyn = {}));
var Oddkyn;
(function (Oddkyn) {
    var Engine;
    (function (Engine) {
        var Display = (function (_super) {
            __extends(Display, _super);
            function Display(game, percentH, percentW) {
                _super.call(this, game);
                this._percentH = percentH;
                this._percentW = percentW;
            }
            Display.prototype.setTopLeft = function (x, y) {
                this._x = x;
                this._y = y;
            };
            Display.prototype.percentH = function () {
                return this._percentH;
            };
            Display.prototype.percentW = function () {
                return this._percentW;
            };
            Display.prototype.layerVisibility = function (id, toggle) {
                this._layers.layer(id).visible = toggle;
            };
            return Display;
        }(Phaser.Group));
        Engine.Display = Display;
    })(Engine = Oddkyn.Engine || (Oddkyn.Engine = {}));
})(Oddkyn || (Oddkyn = {}));
/// <reference path="../Game.ts" />
/// <reference path="../Core/Board.ts" />
var Oddkyn;
(function (Oddkyn) {
    var Engine;
    (function (Engine) {
        var InGameDisplay = (function (_super) {
            __extends(InGameDisplay, _super);
            function InGameDisplay(game, percentH, percentW) {
                if (percentH === void 0) { percentH = 100; }
                if (percentW === void 0) { percentW = 100; }
                _super.call(this, game, percentH, percentW);
                this._layers = new Engine.LayerManager(game, this);
                this._layers.addLayer("InGame");
                this._layers.addLayer("InMenu");
                this._layers.addLayer("Pause");
                this._layers.layer("Pause").visible = false;
            }
            InGameDisplay.prototype._createInGame = function () {
            };
            InGameDisplay.prototype._createInMenu = function () {
            };
            InGameDisplay.prototype._createPause = function () {
            };
            InGameDisplay.prototype.updateInGame = function () {
            };
            return InGameDisplay;
        }(Engine.Display));
        Engine.InGameDisplay = InGameDisplay;
    })(Engine = Oddkyn.Engine || (Oddkyn.Engine = {}));
})(Oddkyn || (Oddkyn = {}));
var Oddkyn;
(function (Oddkyn) {
    var Engine;
    (function (Engine) {
        var Layer = (function (_super) {
            __extends(Layer, _super);
            function Layer(game, parent) {
                _super.call(this, game, parent);
            }
            return Layer;
        }(Phaser.Group));
        Engine.Layer = Layer;
    })(Engine = Oddkyn.Engine || (Oddkyn.Engine = {}));
})(Oddkyn || (Oddkyn = {}));
var Oddkyn;
(function (Oddkyn) {
    var Engine;
    (function (Engine) {
        var LayerManager = (function (_super) {
            __extends(LayerManager, _super);
            function LayerManager(game, parent, ids) {
                _super.call(this, game, parent);
                if (ids) {
                    for (var _i = 0, ids_1 = ids; _i < ids_1.length; _i++) {
                        var id = ids_1[_i];
                        this.addLayer(id);
                    }
                }
            }
            LayerManager.prototype.addLayer = function (id) {
                if (!this.isLayer(id)) {
                    this._layers[id] = new Engine.Layer(this.game, this);
                    this.game.add.group(this, id);
                }
            };
            LayerManager.prototype.removeLayer = function (id) {
                delete this._layers[id];
            };
            LayerManager.prototype.updateLayer = function (id) {
            };
            LayerManager.prototype.layer = function (id) {
                return this._layers[id];
            };
            LayerManager.prototype.isLayer = function (id) {
                return id in this._layers;
            };
            return LayerManager;
        }(Phaser.Group));
        Engine.LayerManager = LayerManager;
    })(Engine = Oddkyn.Engine || (Oddkyn.Engine = {}));
})(Oddkyn || (Oddkyn = {}));
var Oddkyn;
(function (Oddkyn) {
    var InputManager = (function () {
        function InputManager(game) {
            this.onReleased = new Phaser.Signal();
            this.onPressed = new Phaser.Signal();
            this.onOver = new Phaser.Signal();
            this.onOut = new Phaser.Signal();
            this._environmentNeedUpdate = true;
            this._game = game;
            this.onReleased.add(this._onSquareReleased, this);
            this.onPressed.add(this._onSquarePressed, this);
            this.onOver.add(this._onSquareOver, this);
            this.onOut.add(this._onSquareOut, this);
        }
        InputManager.prototype._onSquareReleased = function (gc, p) {
            var square = gc.object();
            var oldTop = square.getTop();
            if (p.leftButton.justReleased()) {
                var newTop = new Oddkyn.GameElement.Square(oldTop.i(), oldTop.j(), oldTop.k() + 1, oldTop.key(), oldTop.orientation());
                oldTop.computeNeighbours(this._game.state.getCurrentState().board, newTop);
                this._environmentNeedUpdate = true;
            }
            if (p.middleButton.justReleased()) {
                oldTop.computeNeighbours(this._game.state.getCurrentState().board, oldTop);
                this._environmentNeedUpdate = true;
            }
            p.reset();
        };
        InputManager.prototype._onSquarePressed = function (gc, p) {
        };
        InputManager.prototype._onSquareOver = function (gc, p) {
            if (gc.isSquare()) {
                gc.tint = 0xFF00FF;
            }
        };
        InputManager.prototype._onSquareOut = function (gc, p) {
            if (gc.isSquare()) {
                gc.tint = 0xFFFFFF;
            }
        };
        InputManager.prototype.environmentNeedUpdate = function () {
            var old = this._environmentNeedUpdate;
            if (old) {
                this._environmentNeedUpdate = false;
            }
            return old;
        };
        return InputManager;
    }());
    Oddkyn.InputManager = InputManager;
})(Oddkyn || (Oddkyn = {}));
var Oddkyn;
(function (Oddkyn) {
    var State;
    (function (State) {
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
                    var splash = new Oddkyn.Splash(this.game, keys[this.idx]);
                    this.idx++;
                }
                else {
                    this.game.state.start('PreLoader', true, false);
                }
            };
            return Boot;
        }(Phaser.State));
        State.Boot = Boot;
    })(State = Oddkyn.State || (Oddkyn.State = {}));
})(Oddkyn || (Oddkyn = {}));
var Oddkyn;
(function (Oddkyn) {
    var State;
    (function (State) {
        var BaseState = (function (_super) {
            __extends(BaseState, _super);
            function BaseState() {
                _super.apply(this, arguments);
            }
            return BaseState;
        }(Phaser.State));
        State.BaseState = BaseState;
        var PlayableState = (function (_super) {
            __extends(PlayableState, _super);
            function PlayableState() {
                _super.apply(this, arguments);
            }
            return PlayableState;
        }(BaseState));
        State.PlayableState = PlayableState;
        var MenuState = (function (_super) {
            __extends(MenuState, _super);
            function MenuState() {
                _super.apply(this, arguments);
            }
            return MenuState;
        }(BaseState));
        State.MenuState = MenuState;
    })(State = Oddkyn.State || (Oddkyn.State = {}));
})(Oddkyn || (Oddkyn = {}));
/// <reference path="../Core/Board.ts" />
/// <reference path="../Game.ts" />
/// <reference path="State.ts" />
var Oddkyn;
(function (Oddkyn) {
    var State;
    (function (State) {
        var Editor = (function (_super) {
            __extends(Editor, _super);
            function Editor() {
                _super.apply(this, arguments);
            }
            Editor.prototype.init = function () {
                this.game.stage.backgroundColor = "#A4A4A4";
            };
            Editor.prototype.preload = function () {
            };
            Editor.prototype.create = function () {
                this.game.input.mouse.capture = true;
                this.board = new Oddkyn.GameElement.Board(5);
                this.blockManager = new Oddkyn.Engine.BlockManager(this);
                this.blockManager.add("Game", new Oddkyn.Engine.InGame(this));
                this.blockManager.add("Game", new Oddkyn.Engine.InMenu(this));
                this.blockManager.add("Game", new Oddkyn.Engine.InPause(this));
                this.blockManager.add("Editor", new Oddkyn.Engine.Editor(this), false);
                this.blockManager.update();
            };
            Editor.prototype.update = function () {
                if (this.events.environmentNeedUpdate()) {
                    console.log("Update");
                }
                /*
                if(this.game.input.activePointer.leftButton.isDown && this.notDown)
                {
                    this.notDown = false;
                    console.log("COUCOU", this.notDown);
                    
                }
                else if(this.game.input.activePointer.leftButton.isUp)
                {
                    this.notDown = true;
                }
                */
            };
            return Editor;
        }(State.PlayableState));
        State.Editor = Editor;
    })(State = Oddkyn.State || (Oddkyn.State = {}));
})(Oddkyn || (Oddkyn = {}));
/// <reference path="../Game.ts" />
var Oddkyn;
(function (Oddkyn) {
    var State;
    (function (State) {
        var Load = (function (_super) {
            __extends(Load, _super);
            function Load() {
                _super.apply(this, arguments);
            }
            Load.prototype.preload = function () {
                this._preLoadBar = this.add.sprite(200, 250, 'preLoadBar');
                this.load.setPreloadSprite(this._preLoadBar);
                this.load.spritesheet('grass', 'assets/tiles/new_model.png', 50, 75, 4);
                this.load.spritesheet('empty', 'assets/tiles/empty.png', 50, 75, 4);
                this.load.spritesheet('arrows_rotation', 'assets/meni/arrows_rotation.png', 50, 50, 3);
            };
            Load.prototype.create = function () {
                var tween = this.add.tween(this._preLoadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
                tween.onComplete.add(this.startMainMenu, this);
            };
            Load.prototype.startMainMenu = function () {
                this.game.state.start('LevelEditor', true, false);
            };
            return Load;
        }(Phaser.State));
        State.Load = Load;
    })(State = Oddkyn.State || (Oddkyn.State = {}));
})(Oddkyn || (Oddkyn = {}));
var Oddkyn;
(function (Oddkyn) {
    var State;
    (function (State) {
        var Menu = (function (_super) {
            __extends(Menu, _super);
            function Menu() {
                _super.apply(this, arguments);
            }
            Menu.prototype.init = function () {
            };
            Menu.prototype.preload = function () {
            };
            Menu.prototype.create = function () {
                this.game.input.mouse.capture = true;
                this.blockManager = new Oddkyn.Engine.BlockManager(this);
                this.blockManager.add("Menu", new Oddkyn.Engine.Menu(this));
            };
            Menu.prototype.update = function () {
            };
            return Menu;
        }(State.MenuState));
        State.Menu = Menu;
    })(State = Oddkyn.State || (Oddkyn.State = {}));
})(Oddkyn || (Oddkyn = {}));
