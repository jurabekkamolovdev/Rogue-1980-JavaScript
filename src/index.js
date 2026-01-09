//src/index.js

import { GameEngine } from "./domain/services/GameEngine.js"

class RogueGame {
    constructor() {
        this.gameEngine_ = new GameEngine();
    }

    start() {
        this.gameEngine_.startNewGame();
    }

    getPlayerState() {
        return this.gameEngine_.player_.getState();
    }
}

const game = new RogueGame();
game.start();
console.log(game.getPlayerState());