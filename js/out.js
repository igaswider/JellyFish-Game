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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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


for (var i = 0; i < 100; i++) {
  var boxElement = document.createElement('div');
  var gameBoard = document.getElementById('board');
  gameBoard.appendChild(boxElement);
}

var Jellyfish = function Jellyfish() {
  this.x = 0;
  this.y = 0;
  this.direction = "right";
};

var Coin = function Coin() {
  this.randomizePosition = function () {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
  };
};

var Game = function Game() {
  var self = this;
  this.board = document.querySelectorAll("#board div");
  this.jellyfish = new Jellyfish();
  this.coin = new Coin();
  this.score = 0;
  this.speedUp = 250;
  this.index = function (x, y) {
    return x + y * 10;
  };

  this.init = function () {
    this.jellyfish.x = 0;
    this.jellyfish.y = 0;
    this.jellyfish.direction = "right";
    this.score = 0;
    this.speedUp = 250;

    document.getElementById('score').style.visibility = 'visible';
    document.querySelector('#score>div>strong').innerText = '0';

    this.showJellyfish();
    this.showCoin();
    this.startGame();
  };

  this.showJellyfish = function () {
    this.board[this.index(this.jellyfish.x, this.jellyfish.y)].classList.add('jellyfish');
  };

  this.hideVisibleJellyfish = function () {
    var divElement = document.querySelector(".jellyfish");
    if (divElement !== null) {
      divElement.classList.remove("jellyfish");
    }
  };

  this.showCoin = function () {
    this.coin.randomizePosition();
    this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
  };

  this.hideVisibleCoin = function () {
    var coin = document.querySelector(".coin");

    if (coin !== null) {
      coin.classList.remove("coin");
    }
    return false;
  };

  this.turnJellyfish = function (event) {
    var x = event.keyCode;
    if (x == 37) {
      this.jellyfish.direction = 'left';
    } else if (x == 38) {
      this.jellyfish.direction = 'up';
    } else if (x == 39) {
      this.jellyfish.direction = 'right';
    } else if (x == 40) {
      this.jellyfish.direction = 'down';
    } else {
      return;
    }
  };

  this.moveJellyfish = function () {
    this.hideVisibleJellyfish();
    if (this.jellyfish.direction === 'right') {
      this.jellyfish.x = this.jellyfish.x + 1;
    } else if (this.jellyfish.direction === 'left') {
      this.jellyfish.x = this.jellyfish.x - 1;
    } else if (this.jellyfish.direction === 'up') {
      this.jellyfish.y = this.jellyfish.y - 1;
    } else if (this.jellyfish.direction === 'down') {
      this.jellyfish.y = this.jellyfish.y + 1;
    } else {
      return;
    }
    this.checkCoinCollision();
    if (!this.checkJellyfishCollision()) {
      this.showJellyfish();
    }
  };

  this.checkCoinCollision = function () {
    if (this.jellyfish.x === this.coin.x && this.jellyfish.y === this.coin.y) {
      this.hideVisibleCoin();
      this.score++;
      var summary = document.querySelector("#score strong");
      summary.innerText = this.score;
      this.moveFaster();
      this.showCoin();
      return true;
    }
    return false;
  };

  this.checkJellyfishCollision = function () {
    if (this.jellyfish.x < 0 || this.jellyfish.x > 9 || this.jellyfish.y < 0 || this.jellyfish.y > 9) {
      this.gameOver();
      return true;
    }
    return false;
  };

  this.gameOver = function () {
    clearInterval(self.idSetInterval);
    var gameOver = document.querySelector(".gameOver").classList.add("show");
    this.hideVisibleCoin();
    this.hideVisibleJellyfish();
  };

  this.moveFaster = function () {

    if (this.score > 5 && this.score <= 10) {
      this.speedUp = 200;
    } else if (this.score > 10) {
      this.speedUp = 150;
    }

    clearInterval(self.idSetInterval);
    self.idSetInterval = setInterval(function () {
      self.moveJellyfish();
    }, this.speedUp);
  };

  this.startGame = function () {
    self.idSetInterval = setInterval(function () {
      self.moveJellyfish();
    }, this.speedUp);
  };
};

var newGame = new Game();
newGame.init();

document.addEventListener('keydown', function (event) {
  event.preventDefault();
  newGame.turnJellyfish(event);
});

var buttonAgain = document.querySelector(".gameOver button");

buttonAgain.addEventListener("click", function (event) {
  event.preventDefault();
  var gameOver = document.querySelector(".gameOver").classList.remove("show");
  newGame.init();
});

/***/ })
/******/ ]);