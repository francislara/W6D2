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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(1);
const View = __webpack_require__(3);

$(() => {
    const board = new Board();
    const $el = $('.snake-game');
    const view = new View(board, $el);
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Snake = __webpack_require__(2);

class Board {
    constructor() {
        this.makeGrid();
        this.snake = new Snake();
    }

    makeGrid() {
        this.grid = [];
        for (var i = 0; i < 10; i++) {
            this.grid.push([]);
            for (var j = 0; j < 10; j++) {
                this.grid[i].push([]);
            }
        }
    }
}

module.exports = Board;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

class Snake {
    constructor() {
        this.direction = 'E';
        this.segments = [[0,0]];
    }

    move() {
        const head = this.segments[0];
        switch (this.direction) {
            case 'E':
                head[0] += 1;
                break;
            case 'W':
                head[0] -= 1;
                break;
            case 'N':
                head[1] -= 1;
                break;
            case 'S':
                head[1] += 1;
                break;
        }
        let previous = head;
        for (let i = 1; i < this.segments.length; i++) {
            const temp = this.segments[i];
            this.segments[i] = previous;
            previous = temp;
        }
    }

    inSegment(pos) {
        const [x, y] = pos;
        this.segments.forEach((seg) => {
            console.log(seg[1]);
            if (seg[0] === x && seg[1] === y)  {
                return true;
            }
        });
        return false;
    }
}

module.exports = Snake;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

class View {
    constructor(board, $el) {
        this.board = board;
        this.setupGrid($el);
    }

    setupGrid($el) {
        let i = 0;
        this.board.grid.forEach(function(element) {
            let j = 0;
            const row = $('<ul class="row"></ul>');
            $el.append(row);
            element.forEach(() => {
                const $square = '<li class="square"></li>';
                
                if (this.board.snake.inSegment([i,j])) {
                    $square.addClass('snake');
                }
                row.append($square);
                j++;
            });
            i++;
        }, this);
    }
}

module.exports = View;

/***/ })
/******/ ]);