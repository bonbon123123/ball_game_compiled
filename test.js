"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.flip = exports.Game = exports.BoardSize = exports.SoftBlock = void 0;
var SoftBlock = /** @class */ (function () {
    function SoftBlock(target) {
        this.square = document.createElement('div');
        this.target = target;
    }
    /**
    * Metod used for blocking player from doing anythink
    * @param div the element we block with */
    //@blackout
    SoftBlock.prototype.block = function (div) {
        this.square = div;
        this.square.style.width = "450px";
        this.square.style.height = '450px';
        //this.square.style.backgroundColor = `black`
        this.square.style.position = "absolute";
        this.square.style.zIndex = "100";
        //this.square.style.opacity = "0"
        this.target.appendChild(this.square);
    };
    /**
     * unblocking the player via destroing div from block
     *
     *
     */
    SoftBlock.prototype.unblock = function () {
        this.square.remove();
    };
    return SoftBlock;
}());
exports.SoftBlock = SoftBlock;
var BoardSize = /** @class */ (function () {
    function BoardSize() {
    }
    /**
 * instance of important data, the size of the board
 */
    BoardSize.BoardSize = "450px";
    return BoardSize;
}());
exports.BoardSize = BoardSize;
var bulka = 1;
/**
 * Class used for gaming😎
 * @param tab the element we want to block
 *
 */
var Game = /** @class */ (function () {
    function Game() {
        /**
         * array with all elements
        */
        this.tab = [];
        /**
     * array used for storing shortest patch to ball
    */
        this.positionTab = [];
        /**
    * array used for storing divs. that are addet to scream
    */
        this.squareTab = [];
        /**
    * div of board that game takes place on
    */
        this.board = document.createElement('div');
        /**
    * defines the stage of the game
    */
        this.stage = "";
        /**
    * id of every new ball
    */
        this.globalId = 0;
        /**
    * breakpoint for filling tab with numbers
    */
        this.breakpoint = false;
        /**
    * number of empty solts on the board
    */
        this.emptySlots = 0;
        /**
    * array of possible ball colors
    */
        this.colorArray = ['red', 'blue', 'green', 'red', 'yellow', 'orange', 'pink'];
        /**
    * array of balls
    */
        this.ballPositionTab = [];
        /**
    * div that stores balls that will apear next round
    */
        this.boxForNextBalls = document.createElement('div');
        /**
    * array of balls that will apear next round
    */
        this.tabForNextBalls = [];
        /**
    * object of class softblock
    */
        this.soft = new SoftBlock(this.board);
    }
    /**
* prepares balls for next round
*/
    // @fliper
    Game.prototype.nextBalls = function () {
        this.tabForNextBalls = [];
        for (var i = 0; i < 3; i++) {
            var myColor = this.colorArray[this.getRandomInt(0, 6)];
            this.tabForNextBalls.push(myColor);
        }
        this.fillBoxForNextBalls(this.tabForNextBalls);
    };
    /**
* fills div with balls for next round
*@param tabOfColors collors that will be used
*/
    Game.prototype.fillBoxForNextBalls = function (tabOfColors) {
        for (var i = 0; i < tabOfColors.length; i++) {
            var square = document.createElement('div');
            square.className = "square";
            square.style.left = "".concat((i) * 50, "px");
            square.style.backgroundColor = "".concat(tabOfColors[i]);
            square.style.borderRadius = "30%";
            this.boxForNextBalls.appendChild(square);
        }
    };
    /**
 * checks if gane sould end and randomizes positions of balls
 */
    Game.prototype.doNewBalls = function () {
        this.emptySlots = 0;
        for (var i = 2; i <= 10; i++) {
            for (var j = 2; j <= 10; j++) {
                if (this.tab[i][j] == 0) {
                    this.emptySlots++;
                }
            }
        }
        if (this.emptySlots > 3) {
            for (var i = 0; i < 3; i++) {
                var myX = this.getRandomInt(2, 10);
                var myY = this.getRandomInt(2, 10);
                var myColor = this.tabForNextBalls[i];
                if (this.tab[myY][myX] == 0) {
                    this.createBall(myX, myY, myColor);
                }
                else {
                    i--;
                }
            }
            this.nextBalls();
        }
        else {
            alert("Game OVER! Score:".concat(this.score));
        }
    };
    /**
 * prepares instance of ballPosition

 */
    Game.prototype.createBall = function (myX, myY, myColor) {
        var ball;
        ball = {
            id: this.globalId,
            x: myX,
            y: myY,
            color: myColor
        };
        this.globalId++;
        this.ballPositionTab.push(ball);
        this.tab[myY][myX] = ball;
    };
    /**
 * generates random int inclusive from range
 * @param min minimum int
 * @param max maximum int
 */
    Game.prototype.getRandomInt = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    /**
 * changes all non 0 numbers form tab to 0

 */
    Game.prototype.clearNumbers = function () {
        for (var i = 0; i <= 12; i++) {
            for (var j = 0; j <= 12; j++) {
                if (typeof this.tab[i][j] == "number") {
                    this.tab[i][j] = 0;
                    this.positionTab[i][j] = [];
                }
            }
        }
    };
    /**
 * fkickstarts the game
 */
    Game.prototype.start = function () {
        console.log("asas")
        this.nextBalls();
        this.boxForNextBalls.className = "boxForNextBalls";
        document.body.appendChild(this.boxForNextBalls);
        this.board.style.position = "absolute";
        this.board.style.width = "".concat(BoardSize.BoardSize);
        this.board.style.height = "".concat(BoardSize.BoardSize);
        this.board.className = 'board';
        document.body.appendChild(this.board);
        for (var i = 0; i <= 12; i++) {
            this.tab[i] = [];
            this.positionTab[i] = [];
            for (var j = 0; j <= 12; j++) {
                if (j == 0 || i == 0 || j == 1 || i == 1 || j == 11 || i == 11 || j == 12 || i == 12) {
                    this.tab[i][j] = "wall";
                    this.positionTab[i][j] = "wall";
                }
                else {
                    this.tab[i][j] = 0;
                    this.positionTab[i][j] = [];
                }
            }
        }
        for (var i = 0; i < 3; i++) {
            var myX = this.getRandomInt(2, 10);
            var myY = this.getRandomInt(2, 10);
            var myColor = this.colorArray[this.getRandomInt(0, 6)];
            if (this.tab[myY][myX] == 0) {
                this.createBall(myX, myY, myColor);
            }
            else {
                i--;
            }
        }
        this.recreateBoard();
    };
    /**
     * draws board after all changes
     */
    //@flip
    Game.prototype.strike = function () {
        for (var j = 2; j <= 10; j++) {
            for (var i = 2; i <= 10; i++) {
                if (this.tab[j][i].color != undefined && this.tab[j][i].color == this.tab[j + 1][i].color && this.tab[j][i].color == this.tab[j + 2][i].color) {
                    var bonusStrikeTab = [];
                    var myColor = this.tab[j][i].color;
                    for (var x = 0; x <= 10; x++) {
                        if (this.tab[j + x][i].color != undefined && this.tab[j + x][i].color == myColor) {
                            if (this.tab[j + x][i - 2] != undefined) {
                                if (this.tab[j + x][i].color == this.tab[j + x][i - 2].color
                                    && this.tab[j + x][i].color == this.tab[j + x][i - 1].color) {
                                    bonusStrikeTab.push(-2, -1);
                                }
                            }
                            if (this.tab[j + x][i - 2] != undefined && this.tab[j + x][i + 1].color != undefined) {
                                if (this.tab[j + x][i].color == this.tab[j + x][i + 1].color
                                    && this.tab[j + x][i].color == this.tab[j + x][i - 2].color
                                    && this.tab[j + x][i].color == this.tab[j + x][i - 1].color) {
                                    bonusStrikeTab.push(1, -2, -1);
                                }
                            }
                            if (this.tab[j + x][i + 2] != undefined && this.tab[j + x][i - 1].color != undefined) {
                                if (this.tab[j + x][i].color == this.tab[j + x][i + 1].color
                                    && this.tab[j + x][i].color == this.tab[j + x][i + 2].color
                                    && this.tab[j + x][i].color == this.tab[j + x][i - 1].color) {
                                    bonusStrikeTab.push(1, 2, -1);
                                }
                            }
                            if (this.tab[j + x][i + 2] != undefined) {
                                if (this.tab[j + x][i].color == this.tab[j + x][i + 1].color
                                    && this.tab[j + x][i].color == this.tab[j + x][i + 2].color) {
                                    bonusStrikeTab.push(1, 2);
                                }
                            }
                            bonusStrikeTab.push(0);
                            var uniqueStrikeTab = [];
                            for (var c = 0; c < bonusStrikeTab.length; c++) {
                                if (!uniqueStrikeTab.includes(bonusStrikeTab[c])) {
                                    uniqueStrikeTab.push(bonusStrikeTab[c]);
                                }
                            }
                            for (var a = uniqueStrikeTab.length - 1; a >= 0; a--) {
                                this.tab[j + x][i + uniqueStrikeTab[a]] = 0;
                                this.positionTab[j + x][i + uniqueStrikeTab[a]] = [];
                                this.score++;
                            }
                        }
                        else {
                            break;
                        }
                    }
                }
                else if (this.tab[j][i].color != undefined &&
                    this.tab[j][i].color == this.tab[j][i + 1].color &&
                    this.tab[j][i].color == this.tab[j][i + 2].color) {
                    var bonusStrikeTab = [];
                    var myColor = this.tab[j][i].color;
                    for (var x = 0; x <= 10; x++) {
                        if (this.tab[j][i + x].color != undefined && this.tab[j][i + x].color == myColor) {
                            if (this.tab[j - 2][i + x] != undefined) {
                                if (this.tab[j][i + x].color == this.tab[j - 2][i + x].color
                                    && this.tab[j][i + x].color == this.tab[j - 1][i + x].color) {
                                    bonusStrikeTab.push(-2, -1);
                                }
                            }
                            if (this.tab[j - 2][i + x] != undefined && this.tab[j + 1][i + x].color != undefined) {
                                if (this.tab[j][i + x].color == this.tab[j + 1][i + x].color
                                    && this.tab[j][i + x].color == this.tab[j - 2][i + x].color
                                    && this.tab[j][i + x].color == this.tab[j - 1][i + x].color) {
                                    bonusStrikeTab.push(1, -2, -1);
                                }
                            }
                            if (this.tab[j + 2][i + x] != undefined && this.tab[j - 1][i + x].color != undefined) {
                                if (this.tab[j][i + x].color == this.tab[j + 1][i + x].color
                                    && this.tab[j][i + x].color == this.tab[j + 2][i + x].color
                                    && this.tab[j][i + x].color == this.tab[j - 1][i + x].color) {
                                    bonusStrikeTab.push(1, 2, -1);
                                }
                            }
                            if (this.tab[j + 2][i + x] != undefined) {
                                if (this.tab[j][i + x].color == this.tab[j + 1][i + x].color
                                    && this.tab[j][i + x].color == this.tab[j + 2][i + x].color) {
                                    bonusStrikeTab.push(1, 2);
                                }
                            }
                            bonusStrikeTab.push(0);
                            var uniqueStrikeTab = [];
                            for (var c = 0; c < bonusStrikeTab.length; c++) {
                                if (!uniqueStrikeTab.includes(bonusStrikeTab[c])) {
                                    uniqueStrikeTab.push(bonusStrikeTab[c]);
                                }
                            }
                            for (var a = uniqueStrikeTab.length - 1; a >= 0; a--) {
                                this.positionTab[j + uniqueStrikeTab[a]][i + x] = [];
                                this.tab[j + uniqueStrikeTab[a]][i + x] = 0;
                                this.score++;
                            }
                        }
                        else {
                            break;
                        }
                    }
                }
            }
            this.recreateBoard();
        }
    };
    Game.prototype.recreateBoard = function () {
        var _this = this;
        bulka = this.getRandomInt(-80, 40);
        this.board.innerHTML = '';
        this.soft.unblock();
        this.squareTab.forEach(function (v) { return v.remove(); });
        var _loop_1 = function (i) {
            var _loop_2 = function (j) {
                if (this_1.tab[i][j] == 0) {
                    var square = document.createElement('div');
                    square.className = "square";
                    square.style.top = "".concat((i - 2) * 50, "px");
                    square.style.left = "".concat((j - 2) * 50, "px");
                    square.addEventListener("click", function () {
                        // console.log(this.positionTab[i][j])
                        // console.log("colored squares when clicked", (this.positionTab[i][j] as string[]).length)
                        if (_this.stage == "firstClick" && _this.positionTab[i][j].length != 0) {
                            var div = document.createElement('div');
                            _this.soft.block(div);
                            console.log("miejsce przesuneca ", _this.tab[i][j]);
                            if (_this.tab[i][j] != 0) {
                                _this.stage = "zeroClick";
                                var ball = void 0;
                                ball = {
                                    id: _this.tab[_this.ballMovingY][_this.ballMovingX].id,
                                    x: _this.tab[_this.ballMovingY][_this.ballMovingX].x,
                                    y: _this.tab[_this.ballMovingY][_this.ballMovingX].y,
                                    color: _this.tab[_this.ballMovingY][_this.ballMovingX].color
                                };
                                _this.tab[_this.ballMovingY][_this.ballMovingX] = 0;
                                _this.tab[i][j] = ball;
                                _this.clearNumbers();
                                _this.doNewBalls();
                                _this.squareTab.forEach(function (v) { return v.style.backgroundColor = "grey"; });
                                setTimeout(function () { return _this.strike(); }, 1000);
                            }
                        }
                    });
                    square.addEventListener("mouseover", function () {
                        //console.log("colored squares when hover", this.positionTab.length)
                        _this.colorPath(_this.positionTab[i][j]);
                        // if (stage == "firstClick" && this.tab[i][j] == 0) {
                        // }
                    });
                    this_1.board.append(square);
                }
                if (typeof this_1.tab[i][j] == "object") {
                    var square = document.createElement('div');
                    square.className = "square";
                    square.style.top = "".concat((i - 2) * 50, "px");
                    square.style.left = "".concat((j - 2) * 50, "px");
                    square.style.backgroundColor = "".concat(this_1.tab[i][j].color);
                    square.style.borderRadius = "30%";
                    square.addEventListener("click", function () {
                        //console.log(typeof this.tab[i][j]);
                        //console.log((this.tab[i][j] as ballPosition).color)
                        _this.clearNumbers();
                        console.log(_this.positionTab);
                        console.log(_this.positionTab[i][j]);
                        _this.positionTab[i][j] = ["".concat(i, "_").concat(j)];
                        _this.pathStart(_this.tab[i][j], i, j);
                        _this.ballMovingY = i;
                        _this.ballMovingX = j;
                        _this.stage = "firstClick";
                    });
                    this_1.board.append(square);
                }
            };
            for (var j = 2; j <= 10; j++) {
                _loop_2(j);
            }
        };
        var this_1 = this;
        for (var i = 2; i <= 10; i++) {
            _loop_1(i);
        }
    };
    /**
* creates tomato collored path to cursor after l;ockin in the ball
* @param myPath path to selected endpoint
*/
    Game.prototype.colorPath = function (myPath) {
        this.squareTab.forEach(function (v) { return v.remove(); });
        for (var g = 1; g < myPath.length; g++) {
            var x = parseInt(myPath[g].split("_")[0]);
            var y = parseInt(myPath[g].split("_")[1]);
            //console.log(x, " i ", y)
            var square = document.createElement('div');
            square.className = "path";
            square.style.top = "".concat((x - 2) * 50, "px");
            square.style.left = "".concat((y - 2) * 50, "px");
            square.style.backgroundColor = "tomato";
            this.squareTab.push(square);
            this.board.append(square);
        }
    };
    /** cycles thru whole board and fills tab with numbers and position tab with positions
* @param seeked current number we were seeking
* @param z starting value
* @param x starting value
*/
    Game.prototype.pathStart = function (seeked, z, x) {
        var _this = this;
        if (z === void 0) { z = 1; }
        if (x === void 0) { x = 1; }
        // console.log(typeof seeked)
        if (typeof seeked == "object") {
            //console.log(z, x)
            var lastOne = "".concat(z, "_").concat(x);
            if (this.tab[z + 1][x] == 0) {
                this.tab[z + 1][x] = 1;
                //console.table(positionTab)
                //console.log("men:", (this.positionTab[z + 1][x] as string[]), lastOne);
                this.positionTab[z + 1][x].push(lastOne);
                this.positionTab[z + 1][x].push("".concat(z + 1, "_").concat(x));
            }
            if (this.tab[z - 1][x] == 0) {
                this.tab[z - 1][x] = 1;
                this.positionTab[z - 1][x].push(lastOne);
                this.positionTab[z - 1][x].push("".concat(z - 1, "_").concat(x));
            }
            if (this.tab[z][x + 1] == 0) {
                this.tab[z][x + 1] = 1;
                this.positionTab[z][x + 1].push(lastOne);
                this.positionTab[z][x + 1].push("".concat(z, "_").concat(x + 1));
            }
            if (this.tab[z][x - 1] == 0) {
                this.tab[z][x - 1] = 1;
                this.positionTab[z][x - 1].push(lastOne);
                this.positionTab[z][x - 1].push("".concat(z, "_").concat(x - 1));
            }
            this.pathStart(1);
        }
        else if (typeof seeked == "number") {
            var brek = false;
            for (var i = 2; i <= 10; i++) {
                for (var j = 2; j <= 10; j++) {
                    brek = false;
                    //console.log("seeked ", seeked)
                    if (this.tab[i][j] == seeked) {
                        //console.log(j)
                        //let lastOne = [...(this.positionTab[i][j] as string[])]
                        //console.log("seeked", lastOne)
                        if (this.tab[i + 1][j] == 0) {
                            //console.log("bon1 ", seeked)
                            this.tab[i + 1][j] = seeked + 1;
                            if (this.positionTab[i + 1][j].length == 0) {
                                this.positionTab[i + 1][j] = __spreadArray([], this.positionTab[i][j], true);
                                this.positionTab[i + 1][j].push("".concat(i + 1, "_").concat(j));
                            }
                            brek = true;
                        }
                        if (this.tab[i - 1][j] == 0) {
                            //console.log("bon2")
                            this.tab[i - 1][j] = seeked + 1;
                            if (this.positionTab[i - 1][j].length == 0) {
                                this.positionTab[i - 1][j] = __spreadArray([], this.positionTab[i][j], true);
                                this.positionTab[i - 1][j].push("".concat(i - 1, "_").concat(j));
                            }
                            brek = true;
                        }
                        if (this.tab[i][j + 1] == 0) {
                            //console.log("bon3")
                            this.tab[i][j + 1] = seeked + 1;
                            if (this.positionTab[i][j + 1].length == 0) {
                                this.positionTab[i][j + 1] = __spreadArray([], this.positionTab[i][j], true);
                                this.positionTab[i][j + 1].push("".concat(i, "_").concat(j + 1));
                            }
                            brek = true;
                        }
                        if (this.tab[i][j - 1] == 0) {
                            //console.log("bon4")
                            this.tab[i][j - 1] = seeked + 1;
                            if (this.positionTab[i][j - 1].length == 0) {
                                this.positionTab[i][j - 1] = __spreadArray([], this.positionTab[i][j], true);
                                this.positionTab[i][j - 1].push("".concat(i, "_").concat(j - 1));
                            }
                            brek = true;
                        }
                        //console.log(tab)
                        // if (i == ballMovingY && j == ballMovingX) {
                        // }
                    }
                }
            }
            //console.log(brek)
            if (!brek) {
                setTimeout(function () { return _this.pathStart(seeked + 1); }, 1);
            }
        }
        //console.table(tab);
        //console.table(positionTab)
    };
    return Game;
}());
exports.Game = Game;
/**
 * Decorator used for randomly changing position of the board after move
 *
 */
function flip(target, name, descriptor) {
    var originalMethod = descriptor.value;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var result = originalMethod.apply(this, args);
        console.log("Wywo\u0142uj\u0119: ".concat(name));
        console.log(result);
        document.body.style.transform = "rotate(".concat(bulka, "deg)");
        return result;
    };
}
exports.flip = flip;
/**
 * Decorator used for shifting board between moves
 *
 *
 */
// export function fliper(target: any, name: string, descriptor: any) {
//     var originalMethod = descriptor.value;
//     descriptor.value = function (...args: any[]) {
//         var result = originalMethod.apply(this, args);
//         console.log(`Wywołuję: ${name}`);
//         console.log(result);
//         document.body.style.transform = `scale3d(-3, 3, 3)`;
//         return result;
//     }
// }
var game = new Game();
game.start();
