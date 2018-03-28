/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//工具集
/*
矩阵工具
 */

var shuduToolkit = {
    makeRow: function makeRow() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        var array = new Array(9);
        array.fill(v);
        return array;
    },
    makeShudu: function makeShudu() {
        var _this = this;

        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        return Array.from({ length: 9 }, function () {
            return _this.makeRow(v);
        });
    },


    // 洗牌算法Fisher-Yates
    shuffle: function shuffle(array) {
        var endIndex = array.length - 2;
        var length = array.length;
        for (var i = 0; i <= endIndex; i++) {
            var j = i + Math.floor(Math.random() * (length - i));
            var _ref = [array[j], array[i]];
            array[i] = _ref[0];
            array[j] = _ref[1];
        }
        return array;
    },

    //检查填写的数是否可以填写
    checkFill: function checkFill(shudu, n, rowIndex, colIndex) {
        var row = shudu[rowIndex];
        var col = this.makeRow().map(function (v, i) {
            return shudu[i][colIndex];
        });

        var _boxToolkit$getboxNum = boxToolkit.getboxNumber(rowIndex, colIndex),
            boxIndex = _boxToolkit$getboxNum.boxIndex;

        var box = boxToolkit.getboxCells(shudu, boxIndex);
        for (var i = 0; i < 9; i++) {
            if (row[i] === n || col[i] === n || box[i] === n) {
                return false;
            }
        }
        return true;
    }
};

var boxToolkit = {
    //获取宫所有值
    getboxCells: function getboxCells(shudu, boxIndex) {
        var starRow = Math.floor(boxIndex / 3) * 3;
        var starCol = boxIndex % 3 * 3;
        var result = [];
        for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
            var rowIndex = starRow + Math.floor(cellIndex / 3);
            var colIndex = starCol + cellIndex % 3;
            result.push(shudu[rowIndex][colIndex]);
        }
        return result;
    },

    // 获取宫的位置信息及格子在宫内排序信息
    getboxNumber: function getboxNumber(rowIndex, colIndex) {
        return {
            boxIndex: 3 * Math.floor(rowIndex / 3) + Math.floor(colIndex / 3),
            cellIndex: rowIndex % 3 * 3 + colIndex % 3
        };
    },

    //获取宫在大矩阵里的位置信息
    fromboxNumber: function fromboxNumber(boxIndex, cellIndex) {
        return {
            rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
            colIndex: boxIndex % 3 * 3 + cellIndex % 3
        };
    }
};

/*
宫坐标系工具
 */
module.exports = function () {
    function Toolkit() {
        _classCallCheck(this, Toolkit);
    }

    _createClass(Toolkit, null, [{
        key: "shudu",

        // 矩阵相关工具
        get: function get() {
            return shuduToolkit;
        }

        //宫坐标系工具

    }, {
        key: "box",
        get: function get() {
            return boxToolkit;
        }
    }]);

    return Toolkit;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//弹出的操作面板

// 流程： Cell.onclick => pop.appear => pop.cell.onclick =>cell.fill n => pop.hidden

module.exports = function () {
    function popupnumbers($pop) {
        var _this = this;

        _classCallCheck(this, popupnumbers);

        this._$pop = $pop.hide().removeClass("hidden");
        //回填数字 样式 及 空白
        this._$pop.on("click", "span", function (e) {
            var $Cell = _this._$Cell;
            var $span = $(e.target);
            if ($span.hasClass("mark1")) {
                if ($Cell.hasClass("mark2")) {
                    $Cell.removeClass("mark2");
                }
                if ($Cell.hasClass("mark1")) {
                    $Cell.removeClass("mark1");
                } else {
                    $Cell.addClass("mark1");
                }
            } else if ($span.hasClass("mark2")) {
                if ($Cell.hasClass("mark1")) {
                    $Cell.removeClass("mark1");
                }
                if ($Cell.hasClass("mark2")) {
                    $Cell.removeClass("mark2");
                } else {
                    $Cell.addClass("mark2");
                }
            } else if ($span.hasClass("empty")) {
                $Cell.text(0).removeClass("mark2 mar1").addClass("empty");
            } else {
                //回填数字
                $Cell.removeClass("empty").text($span.text());
            }
            _this.hide();
        });
    }

    _createClass(popupnumbers, [{
        key: "popup",
        value: function popup($Cell) {
            this._$Cell = $Cell;

            var _$Cell$position = $Cell.position(),
                left = _$Cell$position.left,
                top = _$Cell$position.top;

            var width = $(window).width();
            var height = $(window).height();
            this._$pop.css({
                left: (width - left < 130 ? width - 130 : left) + "px",
                top: (height - top < this._$pop.height() ? height - this._$pop.height : top) + "px"
            }).show();
        }
    }, {
        key: "hide",
        value: function hide() {
            this._$pop.hide();
        }
    }]);

    return popupnumbers;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Grid = __webpack_require__(3);
var Popupnumber = __webpack_require__(1);

var grid = new Grid($("#container"));
var pop = new Popupnumber($("#popupNumbers"));
grid.build();
grid.layout();
grid.bindpop(pop);

$("#check").on("click", function (e) {
    grid.check();
});
$("#reset").on("click", function (e) {
    grid.reset();
});
$("#clear").on("click", function (e) {
    grid.clear();
});
$("#rebuild").on("click", function (e) {
    grid.rebuild();
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//生成界面 面板

var Toolkit = __webpack_require__(0);
var Sodu = __webpack_require__(4);
var popupNumbers = __webpack_require__(1);
var Checker = __webpack_require__(6);
// const Generator = require("../core/generator");

var Grid = function () {
    function Grid(container) {
        _classCallCheck(this, Grid);

        this._$container = container;
    }

    _createClass(Grid, [{
        key: "build",
        value: function build() {
            var sd = new Sodu();
            sd.make(5);
            //const gen = new Generator();
            //gen.generate();
            var shudu = sd.puzzleShudu;
            var rowGrupClasses = ["row_g_top", "row_g_mid", "row_g_bot"];
            var colGrupClasses = ["col_g_top", "col_g_mid", "col_g_bot"];

            var $cells = shudu.map(function (rowValues) {
                return rowValues.map(function (cellValue, colIndex) {
                    return $("<span>").addClass(colGrupClasses[colIndex % 3]).addClass(cellValue ? "fixed" : "empty").text(cellValue);
                });
            });

            var $divArray = $cells.map(function ($spanArray, rowIndex) {
                return $("<div>").addClass("row").addClass(rowGrupClasses[rowIndex % 3]).append($spanArray);
            });

            this._$container.append($divArray);
        }
    }, {
        key: "layout",
        value: function layout() {
            /* let sonObj = document.getElementsByClassName('row')[0].getElementsByTagName('span')[0];
            const width = sonObj.offsetWidth;*/

            var width = $("span:first", this._$container).width();
            $("span", this._$container).height(width).css({
                "line-height": width + "px",
                "font-weight": width < 32 ? width / 2 + "px" : ""
            });
        }
        //绑定弹出框

    }, {
        key: "bindpop",
        value: function bindpop(popupNumbers) {
            this._$container.on("click", "span", function (e) {
                var $Cell = $(e.target);
                if ($Cell.hasClass("fixed")) {
                    return;
                }
                popupNumbers.popup($Cell);
            });
        }
        //检查按钮 =>  获取数组数据 => 检查 然后输出结果并 标记error

    }, {
        key: "check",
        value: function check() {
            var data = this._$container.children().map(function (rowIndex, div) {
                return $(div).children().map(function (colIndex, span) {
                    return parseInt($(span).text()) || 0;
                });
            }).toArray().map(function ($data) {
                return $data.toArray();
            });
            // console.log(data);
            var checker = new Checker(data);
            if (checker.check()) {
                alert("全对，恭喜！");
                return true;
            }
            //标记错误
            var marks = checker.shuduMarks;
            //console.log(marks);
            this._$container.children().each(function (rowIndex, div) {
                $(div).children().each(function (colIndex, span) {
                    if (marks[rowIndex][colIndex] || $(span).hasClass("fixed")) {
                        $(span).removeClass("error");
                    } else {
                        $(span).addClass("error");
                    }
                });
            });
        }
        //重置按钮 => 清除所有标记、数值 => 转化为empty

    }, {
        key: "reset",
        value: function reset() {
            this._$container.find("span:not(.fixed)").removeClass("error mark1 mark2").addClass("empty").text(0);
            /*
            this._$container.children()
                .each((rowIndex ,div) => {
                $(div).children()
                    .each((colIndex ,span) => {
                        if($(span).hasClass("fixed")){
                            return;
                        }
                        $(span).removeClass("error mark1 mark2")
                            .addClass("empty")
                            .text(0);
                    })
            })
            */
        }
        //清理按钮 => 清除error标记及数值

    }, {
        key: "clear",
        value: function clear() {
            this._$container.find("span.error").removeClass("error");
            /*
            this._$container.children()
                .each((rowIndex,div) => {
                    $(div).children()
                        .removeClass("error");
                })
            */
        }
        //重建按钮 => 清除原矩阵 => 建立新矩阵

    }, {
        key: "rebuild",
        value: function rebuild() {
            this._$container.empty();
            this.build();
            this.layout();
        }
    }]);

    return Grid;
}();

module.exports = Grid;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//生成数独游戏

// 1. 生成完成的解决方案 （√）
//2.随机去除一部分数据：按比例

var Generator = __webpack_require__(5);

module.exports = function () {
    function Sodu() {
        _classCallCheck(this, Sodu);

        var generator = new Generator();
        generator.generate();
        this.completeShudu = generator.shudu;
    }
    //随机挑出无值区域


    _createClass(Sodu, [{
        key: "make",
        value: function make(level) {
            this.puzzleShudu = this.completeShudu.map(function (row) {
                return row.map(function (cell) {
                    return Math.random() * 9 < level ? 0 : cell;
                });
            });
            /*
            this.puzzleShudu = this.completeShudu.map(row => row.map(cell => {
                return Math.random() * 9 < level 0 : cell;
            }));
            */
        }
    }]);

    return Sodu;
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//生成数独de解决方案
var Toolkit = __webpack_require__(0);

module.exports = function () {
    function Generator() {
        _classCallCheck(this, Generator);
    }

    _createClass(Generator, [{
        key: "generate",
        value: function generate() {
            while (!this.internalgenerate()) {
                console.warn("tryed");
            }
        }
    }, {
        key: "internalgenerate",
        value: function internalgenerate() {
            // TODO 入口方法
            this.shudu = Toolkit.shudu.makeShudu();
            // 随机选择列
            this.orders = Toolkit.shudu.makeShudu().map(function (row) {
                return row.map(function (v, i) {
                    return i;
                });
            }).map(function (row) {
                return Toolkit.shudu.shuffle(row);
            });

            //  every
            for (var n = 1; n <= 9; n++) {
                if (!this.fillNumber(n)) {
                    return false;
                }
            }
            return true;
        }
    }, {
        key: "fillNumber",
        value: function fillNumber(n) {
            return this.fillRow(n, 0);
        }
    }, {
        key: "fillRow",
        value: function fillRow(n, rowIndex) {
            if (rowIndex > 8) {
                return true;
            }

            var row = this.shudu[rowIndex];
            // 随机选择列
            var orders = this.orders[rowIndex];
            for (var i = 0; i < 9; i++) {
                var colIndex = orders[i];
                // 如果这个位置有值
                if (row[colIndex]) {
                    continue;
                }

                // 检查这个位置是否可以填 n
                if (!Toolkit.shudu.checkFill(this.shudu, n, rowIndex, colIndex)) {
                    continue;
                }
                row[colIndex] = n;

                if (!this.fillRow(n, rowIndex + 1)) {
                    row[colIndex] = 0;
                    continue;
                }
                return true;
            }
            return false;
        }
    }]);

    return Generator;
}();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//检查数独解决方案

var Toolkit = __webpack_require__(0);
//输入：用户补充完成的九宫格 数独游戏 矩阵
//处理：把错误的数组元素添加error的class
//输出：alert成功或失败 并输出marks
module.exports = function () {
    function Checker(shudu) {
        _classCallCheck(this, Checker);

        this._shudu = shudu;
        this._shuduMarks = Toolkit.shudu.makeShudu(true);
    }
    //检查一个数组的方法


    _createClass(Checker, [{
        key: "checkArray",
        value: function checkArray(array) {
            var length = array.length;
            var marks = new Array(length);
            marks.fill(true);
            for (var i = 0; i < length; i++) {
                if (!marks[i]) {
                    continue;
                }
                var value = array[i];
                //检查值是否为零或已为false
                if (!value) {
                    marks[i] = false;
                    continue;
                }
                //检查后面的值是否重复
                for (var j = i + 1; j < length; j++) {
                    if (value === array[j]) {
                        marks[i] = marks[j] = false;
                    }
                }
            }
            return marks;
        }
    }, {
        key: "check",
        value: function check() {
            this.checkRows();
            this.checkCols();
            this.checkBoxes();
            this._success = this._shuduMarks.every(function (row) {
                return row.every(function (mark) {
                    return mark;
                });
            });
            return this._success;
        }
    }, {
        key: "checkRows",
        value: function checkRows() {
            for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
                var rows = this._shudu[rowIndex];
                var marks = this.checkArray(rows);
                // 将marks转入大marks矩阵中
                for (var colIndex = 0; colIndex < marks.length; colIndex++) {
                    if (!marks[colIndex]) {
                        this._shuduMarks[rowIndex][colIndex] = false;
                    }
                }
            }
        }
    }, {
        key: "checkCols",
        value: function checkCols() {
            for (var colIndex = 0; colIndex < 9; colIndex++) {
                var cols = [];
                for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
                    cols[rowIndex] = this._shudu[rowIndex][colIndex];
                }
                var marks = this.checkArray(cols);
                for (var i = 0; i < marks.length; i++) {
                    if (!marks[i]) {
                        this._shuduMarks[i][colIndex] = false;
                    }
                }
            }
        }
    }, {
        key: "checkBoxes",
        value: function checkBoxes() {
            for (var boxIndex = 0; boxIndex < 9; boxIndex++) {
                var boxes = Toolkit.box.getboxCells(this._shudu, boxIndex);
                var marks = this.checkArray(boxes);
                for (var cellIndex = 0; cellIndex < marks.length; cellIndex++) {
                    if (!marks[cellIndex]) {
                        var _Toolkit$box$fromboxN = Toolkit.box.fromboxNumber(boxIndex, cellIndex),
                            rowIndex = _Toolkit$box$fromboxN.rowIndex,
                            colIndex = _Toolkit$box$fromboxN.colIndex;

                        this._shuduMarks[rowIndex][colIndex] = false;
                    }
                }
            }
        }
    }, {
        key: "shuduMarks",
        get: function get() {
            return this._shuduMarks;
        }
    }, {
        key: "isSuccess",
        get: function get() {
            return this._success;
        }
    }]);

    return Checker;
}();
/*
const Generator = require("./generator");
const gen = new Generator();
gen.generate();
const shudu = gen.shudu;
const checker = new Checker(shudu);
console.log("check result",checker.check());
console.log(checker.shuduMarks);

shudu[1][1] = 0;
shudu[2][2] = shudu[3][5] = 5;
const checker2 = new Checker(shudu);
console.log("check result",checker2.check());
console.log(shudu);
console.log(checker2.shuduMarks);
*/

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map