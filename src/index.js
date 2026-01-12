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

    getWeaponState() {
        return this.gameEngine_.weapons;
    }

    getEnemyState() {
        return this.gameEngine_.enems;
    }
}

const game = new RogueGame();
game.start();
console.log(game.getPlayerState());
const weapons = game.getWeaponState();
weapons.map(weapon => console.log(weapon.getState()));

const enems = game.getEnemyState();
enems.map(enemy => console.log(enemy.getState()));
// console.log(game.getWeaponState());
// console.log(game.getEnemyState());
