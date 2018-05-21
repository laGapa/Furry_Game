import {
    Game
} from "./game";

const game = new Game();
document.addEventListener('keydown', function(event) {
    game.turnFurry(event);
});
game.showFurry();
game.showCoin();
game.startGame();
