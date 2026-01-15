// src/index.js

import { GameEngine } from "./domain/services/GameEngine.js";

class RogueGame {
    constructor() {
        this.gameEngine_ = new GameEngine();
    }

    get map() { return this.gameEngine_.map; }

    start() {
        this.gameEngine_.startNewGame();
    }

}

const game = new RogueGame();
game.start();
const map = game.map;
map.printMap();
// const viewRooms = map.viewRooms;
// const notViewRooms = map.notViewRooms;

// viewRooms.map(r => r.printRoom());
// notViewRooms.map(r => r.printRoom());