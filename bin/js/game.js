var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Oddkyn;
(function (Oddkyn) {
    /// <reference path="Case.ts" />
    var Board = (function (_super) {
        __extends(Board, _super);
        function Board(game, size) {
            if (size === void 0) { size = 17; }
            _super.call(this);
            this.game = game;
            //Construct Board View
            this.size = size;
            this.gameCenterX = game.world.centerX;
            this.gameCenterY = game.world.centerY;
            this.gameHalfHeight = game.world.height * 0.5;
            this.gameHalfWidth = game.world.width * 0.5;
            var H = this.size * Oddkyn.Case.Data.halfHeight;
            var W = this.size * Oddkyn.Case.Data.halfWidth;
            this.points = new Array();
            this.points.push(new Phaser.Point(this.gameCenterX, this.gameCenterY + H));
            this.points.push(new Phaser.Point(this.gameCenterX + W, this.gameCenterY + Oddkyn.Case.Data.upperSide));
            this.points.push(new Phaser.Point(this.gameCenterX + W, this.gameCenterY - Oddkyn.Case.Data.lowerSide));
            this.points.push(new Phaser.Point(this.gameCenterX, this.gameCenterY - H));
            this.points.push(new Phaser.Point(this.gameCenterX - W, this.gameCenterY - Oddkyn.Case.Data.upperSide));
            this.points.push(new Phaser.Point(this.gameCenterX - W, this.gameCenterY + Oddkyn.Case.Data.lowerSide));
            var graphic = game.add.graphics(0, 0);
            graphic.alpha = 0.2;
            graphic.beginFill(0xFF33FF);
            graphic.drawPolygon(this);
            graphic.endFill();
            game.input.onDown.add(this.click, this);
            //Init cases
            this.cases = new Array();
            for (var i = 0; i < this.size; i++) {
                this.cases[i] = new Array();
                for (var j = 0; j < this.size; j++) {
                    this.cases[i][j] = null;
                }
            }
        }
        Board.prototype.translate = function (x, y) {
            for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
                var p = _a[_i];
                p.setTo(p.x + x, p.y + y);
            }
        };
        Board.prototype.click = function (pointer) {
            if (this.contains(pointer.x, pointer.y)) {
                console.log(pointer.x, pointer.y);
                var _a = this.xyToij(pointer.x, pointer.y), i = _a[0], j = _a[1];
                console.log(i, j);
                var _b = this.ijToxy(0, 0), x = _b[0], y = _b[1];
                console.log(x, y);
                new Oddkyn.Case(this.game, x, y, "grass");
            }
        };
        Board.prototype.addCase = function (i, j) {
        };
        Board.prototype.xyToij = function (x, y) {
            var xx = x - (this.game.width * 0.5 - this.size * 0.5 * Oddkyn.Case.Data.width);
            var yy = y - (this.game.height * 0.5 - this.size * 0.5 * Oddkyn.Case.Data.height);
            var i = Math.floor(xx / Oddkyn.Case.Data.width);
            var j = Math.floor(yy / (Oddkyn.Case.Data.height));
            return [i, j];
        };
        Board.prototype.ijToxy = function (i, j) {
            var x = this.gameHalfWidth + (i - j - 1) * Oddkyn.Case.Data.halfWidth;
            var C = this.gameHalfHeight - (Oddkyn.Case.Data.halfHeight - Oddkyn.Case.Data.upperSide) -
                (((this.size + 1) * 0.5 - 1) * Oddkyn.Case.Data.upperSide -
                    (this.size - 1) * Oddkyn.Case.Data.upperSide);
            var y = C + (i + j) * (Oddkyn.Case.Data.halfHeight - Oddkyn.Case.Data.upperSide);
            return [x, y];
        };
        return Board;
    }(Phaser.Polygon));
    Oddkyn.Board = Board;
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
    (function (Orientation) {
        Orientation[Orientation["North"] = 0] = "North";
        Orientation[Orientation["West"] = 1] = "West";
        Orientation[Orientation["South"] = 2] = "South";
        Orientation[Orientation["East"] = 3] = "East";
    })(Oddkyn.Orientation || (Oddkyn.Orientation = {}));
    var Orientation = Oddkyn.Orientation;
    var Visual = (function (_super) {
        __extends(Visual, _super);
        function Visual(game, x, y, key, ori) {
            if (ori === void 0) { ori = Orientation.North; }
            _super.call(this, game, x, y, key);
            this.inputEnabled = true;
            this.input.pixelPerfectOver = true;
            this.input.pixelPerfectClick = true;
            this.orientation = ori;
            this.frame = this.orientation;
        }
        Visual.prototype.rotateRight = function () {
            this.frame = (this.orientation + 1) % 4;
        };
        Visual.prototype.rotateLeft = function () {
            this.frame = (this.orientation - 1) % 4;
        };
        return Visual;
    }(Phaser.Sprite));
    Oddkyn.Visual = Visual;
})(Oddkyn || (Oddkyn = {}));
/// <reference path="Visual.ts" />
var Oddkyn;
(function (Oddkyn) {
    var Case = (function (_super) {
        __extends(Case, _super);
        function Case(game, x, y, key, ori) {
            if (ori === void 0) { ori = Oddkyn.Orientation.North; }
            _super.call(this, game, x, y, key, ori);
            this.events.onInputOver.add(this.mouseOver, this);
            this.events.onInputOut.add(this.mouseOut, this);
            game.add.existing(this);
            this.effects = key;
        }
        Case.prototype.mouseOver = function () {
            this.tint = 0x00FF00;
        };
        Case.prototype.mouseOut = function () {
            this.tint = 0xFFFFFF;
        };
        return Case;
    }(Oddkyn.Visual));
    Oddkyn.Case = Case;
    var Case;
    (function (Case) {
        var Data = (function () {
            function Data() {
            }
            Data.height = 66;
            Data.width = 100;
            Data.halfHeight = Data.height * 0.5;
            Data.halfWidth = Data.width * 0.5;
            Data.side = 12;
            Data.upperSide = 6;
            Data.lowerSide = 6;
            return Data;
        }());
        Case.Data = Data;
    })(Case = Oddkyn.Case || (Oddkyn.Case = {}));
})(Oddkyn || (Oddkyn = {}));
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
            this.board = new Oddkyn.Board(this.game, 5);
        };
        return LevelEditor;
    }(Phaser.State));
    Oddkyn.LevelEditor = LevelEditor;
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
/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="../src/Splash.ts" />
var LOL = (function () {
    function LOL() {
        // create our phaser game
        // 800 - width
        // 600 - height
        // Phaser.AUTO - determine the renderer automatically (canvas, webgl)
        // 'content' - the name of the container to add our game to
        // { preload:this.preload, create:this.create} - functions to call for our states
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: this.preload, create: this.create });
        //this.game.add('Load', )
        this.idx = 0;
    }
    LOL.prototype.preload = function () {
    };
    LOL.prototype.create = function () {
        var splashs_key = this.game.cache.getKeys(Phaser.Cache.IMAGE);
        var splash_events = this.game.time.events.repeat(3 * Phaser.Timer.SECOND, splashs_key.length, this.showSplash, this);
    };
    LOL.prototype.showSplash = function (keys) {
        if (this.idx < keys.length) {
            var splash = new Splash(this.game, keys[this.idx]);
        }
        else {
            this.game.cache.destroy();
            this.game.state.start('Load');
        }
    };
    return LOL;
}());
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
            //this.load.spritesheet('dirt', 'assets/tiles/dirt.png', 50, 50, 4);
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
