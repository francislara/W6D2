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

const HanoiView = __webpack_require__(1);
const HanoiGame = __webpack_require__(2);

$( () => {
  const rootEl = $('.hanoi');
  const game = new HanoiGame();
  new HanoiView(game, rootEl);
});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

const HanoiView = function (game, $el) {
    this.game = game;
    this.setupTowers($el);
    this.bindClicks();
};

HanoiView.prototype.bindClicks = function() {
    let startPos = -1;
    this.towers.forEach( function(element) {
        element.on('click', ()=> {
            if (startPos === -1) {
                startPos = element.attr('pos');
                element.addClass("selected");
            } else {
                if (this.game.move(startPos, element.attr('pos'))) {
                    this.makeUIMove(startPos, element.attr('pos'));
                    this.towers[startPos].removeClass("selected");
                    startPos = -1;
                    if(this.game.isWon()) {
                        this.gameOver();
                    }
                }
            }
        })
    }, this);
};

HanoiView.prototype.setupTowers = function($el) {
    this.towers = [];
    
    for (let i = 0; i < 3; i++) {
        $tower = $('<ul class="tower"></ul>');
        $tower.attr('pos', i);
        $el.append($tower);
        this.towers.push($tower);
        if(i === 0) {
            for(let i = 3; i > 0; i--) {
                $stone = $(`<li class="stone stone-${i}"></li>`);
                $stone.attr('stone-size', i);
                $tower.append($stone);                
            }
            
        }
    }
};

HanoiView.prototype.makeUIMove = function(start, end) {
    let startTower;
    this.towers.forEach( (tower) => {
        if(tower.attr('pos') === start) {
            startTower = tower.children().last()
            startTower.remove();
        }
    });
    this.towers.forEach((tower) => {
        if (tower.attr('pos') === end) {
            tower.append(startTower);
        }
    });
}

HanoiView.prototype.gameOver = function() {
    this.towers[this.towers.length - 1].parent().after('<h1 class="winner">You Win!</h1>');
    $(".stone").addClass("green");
};

// Hanoi.prototype.render = function() {
//     this.game.towers.forEach((tower) => {

//     });
// };

module.exports = HanoiView;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

class Game {
  constructor() {
    this.towers = [[3, 2, 1], [], []];
  }

  isValidMove(startTowerIdx, endTowerIdx) {
      const startTower = this.towers[startTowerIdx];
      const endTower = this.towers[endTowerIdx];

      if (startTower.length === 0) {
        return false;
      } else if (endTower.length == 0) {
        return true;
      } else {
        const topStartDisc = startTower[startTower.length - 1];
        const topEndDisc = endTower[endTower.length - 1];
        return topStartDisc < topEndDisc;
      }
  }

  isWon() {
      // move all the discs to the last or second tower
      return (this.towers[2].length == 3) || (this.towers[1].length == 3);
  }

  move(startTowerIdx, endTowerIdx) {
      if (this.isValidMove(startTowerIdx, endTowerIdx)) {
        this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
        return true;
      } else {
        return false;
      }
  }

  print() {
      console.log(JSON.stringify(this.towers));
  }

  promptMove(reader, callback) {
      this.print();
      reader.question("Enter a starting tower: ", start => {
        const startTowerIdx = parseInt(start);
        reader.question("Enter an ending tower: ", end => {
          const endTowerIdx = parseInt(end);
          callback(startTowerIdx, endTowerIdx);
        });
      });
  }

  run(reader, gameCompletionCallback) {
      this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
        if (!this.move(startTowerIdx, endTowerIdx)) {
          console.log("Invalid move!");
        }

        if (!this.isWon()) {
          // Continue to play!
          this.run(reader, gameCompletionCallback);
        } else {
          this.print();
          console.log("You win!");
          gameCompletionCallback();
        }
      });
  }
}

module.exports = Game;


/***/ })
/******/ ]);