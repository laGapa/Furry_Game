import {
    Furry
} from "./furry";
import {
    Coin
} from "./coin";

export class Game {
    constructor() {
        this.board = document.querySelectorAll('#board div');
        this.furry = new Furry();
        this.coin = new Coin();
        this.score = 0;
        this.state = 'on';
        // this.idSetInterval = undefined;
    }

    getPositionArray(x, y) {
        return x + (y * 10);
    }

    showFurry() {
        if (this.state == 'on') {
            let index = this.getPositionArray(this.furry.x, this.furry.y);
            this.board[index].classList.add('furry');
        }

    }

    showCoin() {
        let index = this.getPositionArray(this.coin.x, this.coin.y);
        this.board[index].classList.add('coin');

    }

    startGame() {
        let self = this;
        this.idSetInterval = setInterval(function() {
            self.moveFurry();
        }, 250);
    }

    moveFurry() {
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

    hideVisibleFurry() {
        let furryVisible = document.querySelector('.furry');
        furryVisible.classList.remove('furry');
    }

    turnFurry() {
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

    checkCoinCollision() {
        if ((this.coin.x === this.furry.x) && (this.coin.y === this.furry.y)) {
            //usunięcie klasy coin z bieżącego elementu
            let index = this.getPositionArray(this.coin.x, this.coin.y);
            this.board[index].classList.remove('coin');

            this.score += 1;
            // console.log(this.score);
            const divScore = document.querySelector('#score div');
            // console.log(divScore);
            divScore.innerHTML = 'SCORE<br><strong>' + this.score + '</strong>';

            this.coin = new Coin();
            this.showCoin();
        }
    }

    gameOver() {
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            clearInterval(this.idSetInterval);
            this.state = 'off';
            // this.hideVisibleFurry();
            const sectionOver = document.querySelector('#over');
            sectionOver.classList.remove('invisible');
            sectionOver.style.display = 'flex';
            sectionOver.style.alignItems = 'center';
            sectionOver.style.justifyContent = 'center';

            const textOver = document.createElement('h2');
            textOver.innerHTML = 'GAME OVER<br>SCORE: ' + this.score;
            textOver.style.fontSize = '100px';
            textOver.style.letterSpacing = '0.1em';
            textOver.style.wordSpacing = '0.2em';

            sectionOver.appendChild(textOver);
        }
    }
}
