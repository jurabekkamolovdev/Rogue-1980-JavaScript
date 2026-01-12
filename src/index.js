// //src/index.js

// import { GameEngine } from "./domain/services/GameEngine.js"

// class RogueGame {
//     constructor() {
//         this.gameEngine_ = new GameEngine();
//     }

//     start() {
//         this.gameEngine_.startNewGame();
//     }

//     getPlayerState() {
//         return this.gameEngine_.player_.getState();
//     }

//     getWeaponState() {
//         return this.gameEngine_.weapons;
//     }

//     getEnemyState() {
//         return this.gameEngine_.enems;
//     }

//     getMap() {
//         return this.gameEngine_.map;
//     }
// }

// const game = new RogueGame();
// game.start();
// console.log(game.getPlayerState());
// const weapons = game.getWeaponState();
// weapons.map(weapon => console.log(weapon.getState()));

// const enems = game.getEnemyState();
// enems.map(enemy => console.log(enemy.getState()));

// const map = game.getMap();
// map.notViewRooms[1].printRoom();


// src/index.js

import { GameEngine } from "./domain/services/GameEngine.js";
import { GameUI } from "./presentation/GameUI.js";

class RogueGame {
    constructor() {
        this.gameEngine_ = new GameEngine();
        this.ui_ = new GameUI();
        this.setupControls();
    }

    start() {
        this.gameEngine_.startNewGame();
        
        // Player va entitylarni xonaga joylashtirish
        this.placeEntities();
        
        // Ekranni yangilash
        this.render();
    }

    placeEntities() {
        const room = this.gameEngine_.map.notViewRooms[0];
        
        // Player'ni xona o'rtasiga qo'yish
        this.gameEngine_.player.x_ = Math.floor(room.width_ / 2);
        this.gameEngine_.player.y_ = Math.floor(room.height_ / 2);

        // Enemies'ni random joylashtirish
        this.gameEngine_.enems.forEach(enemy => {
            enemy.x = Math.floor(Math.random() * (room.width_ - 2)) + 1;
            enemy.y = Math.floor(Math.random() * (room.height_ - 2)) + 1;
        });

        // Weapons'larni random joylashtirish
        this.gameEngine_.weapons.forEach(weapon => {
            weapon.x = Math.floor(Math.random() * (room.width_ - 2)) + 1;
            weapon.y = Math.floor(Math.random() * (room.height_ - 2)) + 1;
        });
    }

    setupControls() {
        // Arrow keys bilan harakat
        this.ui_.screen.key(['up', 'k'], () => {
            this.movePlayer(0, -1);
        });

        this.ui_.screen.key(['down', 'j'], () => {
            this.movePlayer(0, 1);
        });

        this.ui_.screen.key(['left', 'h'], () => {
            this.movePlayer(-1, 0);
        });

        this.ui_.screen.key(['right', 'l'], () => {
            this.movePlayer(1, 0);
        });
    }

    movePlayer(dx, dy) {
        const player = this.gameEngine_.player;
        const room = this.gameEngine_.map.notViewRooms[0];
        
        const newX = player.x + dx;
        const newY = player.y + dy;

        // Devorga tegmasligini tekshirish
        if (newX > 0 && newX < room.width_ - 1 && 
            newY > 0 && newY < room.height_ - 1) {
            
            // Enemy bilan to'qnashuvni tekshirish
            const enemyAt = this.gameEngine_.enems.find(
                e => e.x === newX && e.y === newY
            );

            if (enemyAt) {
                this.handleCombat(enemyAt);
            } else {
                player.move(dx, dy);
                
                // Qurol yig'ishni tekshirish
                this.checkWeaponPickup(newX, newY);
            }

            // Enemies'ni harakatlantirish
            this.moveEnemies();
            
            this.render();
        }
    }

    handleCombat(enemy) {
        const playerDamage = this.gameEngine_.player.attack();
        const enemyAlive = enemy.takeDamage(playerDamage);

        this.ui_.showMessage(`You hit ${enemy.type} for ${playerDamage} damage!`);

        if (!enemyAlive) {
            this.ui_.showMessage(`${enemy.type} is dead!`);
            // Enemy'ni o'chirish
            const index = this.gameEngine_.enems.indexOf(enemy);
            this.gameEngine_.enems.splice(index, 1);
        } else {
            // Enemy qaytadan uradi
            const enemyDamage = enemy.attack();
            const playerAlive = this.gameEngine_.player.takeDamage(enemyDamage);
            this.ui_.showMessage(`${enemy.type} hits you for ${enemyDamage} damage!`);

            if (!playerAlive) {
                this.ui_.showMessage('You died! Game Over.');
                setTimeout(() => process.exit(0), 2000);
            }
        }
    }

    checkWeaponPickup(x, y) {
        const weapon = this.gameEngine_.weapons.find(
            w => w.x === x && w.y === y
        );

        if (weapon) {
            this.gameEngine_.player.equippedWeapon = weapon;
            this.ui_.showMessage(`You picked up a ${weapon.type}!`);
            
            // Weapon'ni o'chirish
            const index = this.gameEngine_.weapons.indexOf(weapon);
            this.gameEngine_.weapons.splice(index, 1);
        }
    }

    moveEnemies() {
        const player = this.gameEngine_.player;
        
        this.gameEngine_.enems.forEach(enemy => {
            enemy.move(player.x, player.y);
        });
    }

    render() {
        this.ui_.renderMap(
            this.gameEngine_.map,
            this.gameEngine_.player,
            this.gameEngine_.enems,
            this.gameEngine_.weapons
        );
        this.ui_.renderStats(this.gameEngine_.player);
    }
}

// O'yinni boshlash
const game = new RogueGame();
game.start();