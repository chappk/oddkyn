var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
            this.input.pixelPerfectAlpha = 5;
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
    var CaseEditor = (function (_super) {
        __extends(CaseEditor, _super);
        function CaseEditor(game, board, x, y, key, ori) {
            if (ori === void 0) { ori = Oddkyn.Orientation.North; }
            _super.call(this, game, x, y, key, ori);
            this.events.onInputOver.add(this.mouseOver, this);
            this.events.onInputOut.add(this.mouseOut, this);
            game.add.existing(this);
            this.board = board;
            this.effects = key;
            this.floor = 0;
            this.events.onInputDown.add(this.__click, this);
            this.neighbours = new Array(6);
        }
        CaseEditor.prototype.stack = function (key, ori) {
            if (ori === void 0) { ori = Oddkyn.Orientation.North; }
            var c = this.board.stack(this, key, ori);
            this.computeNeighbours(c);
        };
        CaseEditor.prototype.computeNeighbours = function (c) {
            if (this.floor != 0) {
                this.neighbours[Neighbour.Up] = c;
                c.neighbours[Neighbour.Down] = this;
            }
            if (this.board[this.i + 1][this.j].effects != "empty") {
                this.neighbours[Neighbour.East] = this.board[this.i + 1][this.j];
            }
            if (this.board[this.i - 1][this.j].effects != "empty") {
                this.neighbours[Neighbour.West] = this.board[this.i - 1][this.j];
            }
            if (this.board[this.i][this.j + 1].effects != "empty") {
                this.neighbours[Neighbour.North] = this.board[this.i][this.j + 1];
            }
            if (this.board[this.i][this.j - 1].effects != "empty") {
                this.neighbours[Neighbour.South] = this.board[this.i][this.j - 1];
            }
        };
        CaseEditor.prototype.unstack = function () {
        };
        CaseEditor.prototype.mouseOver = function () {
            this.tint = 0x00FF00;
        };
        CaseEditor.prototype.mouseOut = function () {
            this.tint = 0xFFFFFF;
        };
        CaseEditor.prototype.__click = function (pointer) {
            this.stack("grass");
            if (pointer.rightButton) {
            }
            else if (pointer.middleButton) {
                console.log("left");
            }
        };
        return CaseEditor;
    }(Oddkyn.Visual));
    Oddkyn.CaseEditor = CaseEditor;
    var CaseEditor;
    (function (CaseEditor) {
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
        CaseEditor.Data = Data;
    })(CaseEditor = Oddkyn.CaseEditor || (Oddkyn.CaseEditor = {}));
})(Oddkyn || (Oddkyn = {}));
/// <reference path="Case.ts" />
var Oddkyn;
(function (Oddkyn) {
    var BoardEditor = (function (_super) {
        __extends(BoardEditor, _super);
        function BoardEditor(game, size) {
            if (size === void 0) { size = 17; }
            _super.call(this);
            this.game = game;
            this.size = size;
            this.board = game.add.group();
            this.casesLayer = new Array();
            this.charactersLayer = new Array();
            this.boardArray = new Array();
            this.addLayer();
            for (var i = 0; i < this.size; i++) {
                this.boardArray[i] = new Array();
                for (var j = 0; j < this.size; j++) {
                    var _a = this.ijToxy(i, j), x = _a[0], y = _a[1];
                    this.boardArray[i][j] = new Oddkyn.CaseEditor(game, this, x, y, "empty");
                    this.casesLayer[0].add(this.boardArray[i][j]);
                }
            }
            //Construct Polygon View
            var gCX = game.world.centerX;
            var gCY = game.world.centerY;
            var gHH = game.world.height * 0.5;
            var gHW = game.world.width * 0.5;
            var dH = (this.size - 1) * 0.5 * (Oddkyn.CaseEditor.Data.height - Oddkyn.CaseEditor.Data.side) + Oddkyn.CaseEditor.Data.halfHeight;
            var dW = this.size * Oddkyn.CaseEditor.Data.halfWidth;
            this.points = new Array();
            this.points.push(new Phaser.Point(gCX, gCY - dH));
            this.points.push(new Phaser.Point(gCX + dW, gCY - Oddkyn.CaseEditor.Data.upperSide));
            this.points.push(new Phaser.Point(gCX, gCY + dH - Oddkyn.CaseEditor.Data.side));
            this.points.push(new Phaser.Point(gCX - dW, gCY - Oddkyn.CaseEditor.Data.upperSide));
            var graphic = game.add.graphics(0, 0);
            graphic.alpha = 0.2;
            graphic.beginFill(0xFF33FF);
            graphic.drawPolygon(this);
            graphic.endFill();
            //game.input.onDown.add(this.click, this);
            game.world.bringToTop(this.board);
        }
        BoardEditor.prototype.translate = function (x, y) {
            for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
                var p = _a[_i];
                p.setTo(p.x + x, p.y + y);
            }
        };
        BoardEditor.prototype.addLayer = function () {
            this.casesLayer.push(this.game.add.group(this.board));
            this.charactersLayer.push(this.game.add.group(this.board));
        };
        BoardEditor.prototype.click = function (pointer) {
            if (this.contains(pointer.x, pointer.y)) {
                var _a = this.xyToij(pointer.x, pointer.y), i = _a[0], j = _a[1];
                if (i < this.size && j < this.size && i >= 0 && j >= 0 &&
                    this.boardArray[i][j] == null) {
                    this.addCase(i, j);
                }
                else {
                    var c = this.boardArray[i][j].stack("grass");
                }
            }
        };
        BoardEditor.prototype.stack = function (c, key, ori) {
            while (c.neighbours[Oddkyn.Neighbour.Up]) {
                c = c.neighbours[Oddkyn.Neighbour.Up];
            }
            var y = c.y - Oddkyn.CaseEditor.Data.side;
            var cTop = new Oddkyn.CaseEditor(this.game, this, c.x, y, key, ori);
            cTop.floor = c.floor + 1;
            if (cTop.floor >= this.casesLayer.length) {
                this.addLayer();
            }
            this.casesLayer[cTop.floor].add(cTop);
            this.casesLayer[cTop.floor].sort('y', Phaser.Group.SORT_ASCENDING);
            return cTop;
        };
        BoardEditor.prototype.addCase = function (i, j, key, ori) {
            if (key === void 0) { key = "grass"; }
            if (ori === void 0) { ori = Oddkyn.Orientation.North; }
            var _a = this.ijToxy(i, j), x = _a[0], y = _a[1];
            //this.boardArray[i][j] = new CaseEditor(this.game, x, y, key, ori);
            //this.cases.add(this.boardArray[i][j]);
            //this.cases.sort('y', Phaser.Group.SORT_ASCENDING);
        };
        BoardEditor.prototype.xyToij = function (x, y) {
            var dH = this.game.height * 0.5 -
                ((this.size - 1) * 0.5 * (Oddkyn.CaseEditor.Data.height - Oddkyn.CaseEditor.Data.side) +
                    Oddkyn.CaseEditor.Data.halfHeight);
            var dW = this.game.width * 0.5 - Oddkyn.CaseEditor.Data.halfWidth;
            var xx = x - dW;
            var yy = y - dH;
            var cw = Oddkyn.CaseEditor.Data.width;
            var chw = Oddkyn.CaseEditor.Data.halfWidth;
            var ch = Oddkyn.CaseEditor.Data.height;
            var chh = Oddkyn.CaseEditor.Data.halfHeight;
            var cdhs = Oddkyn.CaseEditor.Data.height - Oddkyn.CaseEditor.Data.side;
            var cdhus2 = chh - Oddkyn.CaseEditor.Data.upperSide;
            var i0 = Math.floor(xx / cw);
            var j0 = Math.floor(yy / cdhs);
            var i = i0 + j0;
            var j = j0 - i0;
            var ox = i0 * cw + dW;
            var oy = j0 * cdhs + dH;
            if (this.inTriangle(ox, oy, ox + chw, oy, ox, oy + cdhus2, x, y)) {
                i--;
            }
            else if (this.inTriangle(ox + chw, oy, ox + cw, oy, ox + cw, oy + cdhus2, x, y)) {
                j--;
            }
            else if (this.inTriangle(ox + chw, oy + ch, ox + cw, oy + cdhus2, ox + cw, oy + ch, x, y) ||
                this.inTriangle(ox + chw, oy + ch, ox + chw, oy + cdhs, ox + cw, oy + cdhus2, x, y)) {
                i++;
            }
            else if (this.inTriangle(ox, oy + cdhus2, ox + chw, oy + cdhs, ox + chw, oy + ch, x, y) ||
                this.inTriangle(ox, oy + cdhus2, ox, oy + ch, ox + chw, oy + cdhs, x, y)) {
                j++;
            }
            return [i, j];
        };
        BoardEditor.prototype.ijToxy = function (i, j) {
            var i0 = (i - j) * 0.5;
            var j0 = (i + j) * 0.5;
            var dH = this.game.height * 0.5 -
                ((this.size - 1) * 0.5 * (Oddkyn.CaseEditor.Data.height - Oddkyn.CaseEditor.Data.side) +
                    Oddkyn.CaseEditor.Data.halfHeight);
            var dW = this.game.width * 0.5 - Oddkyn.CaseEditor.Data.halfWidth;
            var cdhs = Oddkyn.CaseEditor.Data.height - Oddkyn.CaseEditor.Data.side;
            var x = i0 * Oddkyn.CaseEditor.Data.width + dW;
            var y = j0 * cdhs + dH;
            return [x, y];
        };
        BoardEditor.prototype.inTriangle = function (p0x, p0y, p1x, p1y, p2x, p2y, px, py) {
            var Area = 0.5 * (-p1y * p2x + p0y * (-p1x + p2x) + p0x * (p1y - p2y) + p1x * p2y);
            var s = 1 / (2 * Area) * (p0y * p2x - p0x * p2y + (p2y - p0y) * px + (p0x - p2x) * py);
            var t = 1 / (2 * Area) * (p0x * p1y - p0y * p1x + (p0y - p1y) * px + (p1x - p0x) * py);
            return s > 0 && t > 0 && 1 - t - s > 0;
        };
        return BoardEditor;
    }(Phaser.Polygon));
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
            this.board = new Oddkyn.BoardEditor(this.game, 9);
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
