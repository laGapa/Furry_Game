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

"use strict";


var _game = __webpack_require__(1);

var game = new _game.Game();
document.addEventListener('keydown', function (event) {
    game.turnFurry(event);
});
game.showFurry();
game.showCoin();
game.startGame();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Game = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _furry = __webpack_require__(2);

var _coin = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = exports.Game = function () {
    function Game() {
        _classCallCheck(this, Game);

        this.board = document.querySelectorAll('#board div');
        this.furry = new _furry.Furry();
        this.coin = new _coin.Coin();
        this.score = 0;
        this.state = 'on';
        // this.idSetInterval = undefined;
    }

    _createClass(Game, [{
        key: "getPositionArray",
        value: function getPositionArray(x, y) {
            return x + y * 10;
        }
    }, {
        key: "showFurry",
        value: function showFurry() {
            if (this.state == 'on') {
                var index = this.getPositionArray(this.furry.x, this.furry.y);
                this.board[index].classList.add('furry');
            }
        }
    }, {
        key: "showCoin",
        value: function showCoin() {
            var index = this.getPositionArray(this.coin.x, this.coin.y);
            this.board[index].classList.add('coin');
        }
    }, {
        key: "startGame",
        value: function startGame() {
            var self = this;
            this.idSetInterval = setInterval(function () {
                self.moveFurry();
            }, 250);
        }
    }, {
        key: "moveFurry",
        value: function moveFurry() {
            this.hideVisibleFurry();
            if (this.furry.direction === 'right') {
                this.furry.x += 1;
                this.gameOver();
                this.showFurry();
            } else if (this.furry.direction === 'left') {
                this.furry.x -= 1;
                this.gameOver();
                this.showFurry();
            } else if (this.furry.direction === 'down') {
                this.furry.y += 1;
                this.gameOver();
                this.showFurry();
            } else {
                this.furry.y -= 1;
                this.gameOver();
                this.showFurry();
            }
            this.checkCoinCollision();
        }
    }, {
        key: "hideVisibleFurry",
        value: function hideVisibleFurry() {
            var furryVisible = document.querySelector('.furry');
            furryVisible.classList.remove('furry');
        }
    }, {
        key: "turnFurry",
        value: function turnFurry() {
            switch (event.which) {
                case 37:
                    this.furry.direction = 'left';
                    // console.log('left');
                    // console.log(event.which);
                    break;
                case 38:
                    this.furry.direction = 'up';
                    // console.log('up');
                    // console.log(event.which);
                    break;
                case 39:
                    this.furry.direction = 'right';
                    // console.log('right');
                    // console.log(event.which);
                    break;
                case 40:
                    this.furry.direction = 'down';
                    // console.log('down');
                    // console.log(event.which);
                    break;
            }
        }
    }, {
        key: "checkCoinCollision",
        value: function checkCoinCollision() {
            if (this.coin.x === this.furry.x && this.coin.y === this.furry.y) {
                //usunięcie klasy coin z bieżącego elementu
                var index = this.getPositionArray(this.coin.x, this.coin.y);
                this.board[index].classList.remove('coin');

                this.score += 1;
                // console.log(this.score);
                var divScore = document.querySelector('#score div');
                // console.log(divScore);
                divScore.innerHTML = 'SCORE<br><strong>' + this.score + '</strong>';

                this.coin = new _coin.Coin();
                this.showCoin();
            }
        }
    }, {
        key: "gameOver",
        value: function gameOver() {
            if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
                clearInterval(this.idSetInterval);
                this.state = 'off';
                // this.hideVisibleFurry();
                var sectionOver = document.querySelector('#over');
                sectionOver.classList.remove('invisible');
                sectionOver.style.display = 'flex';
                sectionOver.style.alignItems = 'center';
                sectionOver.style.justifyContent = 'center';

                var textOver = document.createElement('h2');
                textOver.innerHTML = 'GAME OVER<br>SCORE: ' + this.score;
                textOver.style.fontSize = '100px';
                textOver.style.letterSpacing = '0.1em';
                textOver.style.wordSpacing = '0.2em';

                sectionOver.appendChild(textOver);
            }
        }
    }]);

    return Game;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Furry = exports.Furry = function Furry() {
    _classCallCheck(this, Furry);

    this.x = 0;
    this.y = 0;
    this.direction = 'right';
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Coin = exports.Coin = function Coin() {
    _classCallCheck(this, Coin);

    //Pomijamy startową pozycję Furusia
    var x = Math.floor(Math.random() * 10);
    var y = Math.floor(Math.random() * 10);
    while (x === 0 && y === 0) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
    }
    this.x = x;
    this.y = y;
};

/***/ })
/******/ ]);