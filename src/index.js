// src/index.js

import { GameEngine } from "./domain/services/GameEngine.js"

class RogueGame {
    constructor() {
        this.gameEngine_ = new GameEngine();
    }
    

    start() {
        this.gameEngine_.startNewGame();
    }

}

const game = new RogueGame();
game.start();