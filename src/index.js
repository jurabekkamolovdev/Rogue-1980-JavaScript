// src/index.js

import { GameEngine } from "./domain/services/GameEngine.js"
import { GameUI } from "./presentation/GameUI.js"

class RogueGame {
    constructor() {
        this.gameEngine_ = new GameEngine();
        this.ui_ = new GameUI();
    }

    get map() { return this.gameEngine_.map; }

    start() {
        this.gameEngine_.startNewGame();
    }

    render() {
        this.ui_.renderMap(this.gameEngine_.map.grid)
    }

}

const game = new RogueGame();
game.start();
game.render();
// const viewRooms = map.viewRooms;
// const notViewRooms = map.notViewRooms;

// viewRooms.map(r => r.printRoom());
// notViewRooms.map(r => r.printRoom());