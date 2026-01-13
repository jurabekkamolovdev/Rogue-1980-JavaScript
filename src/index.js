// // src/index.js

// import { GameEngine } from "./domain/services/GameEngine.js";
// import { GameUI } from "./presentation/GameUI.js";

// class RogueGame {
//     constructor() {
//         this.gameEngine_ = new GameEngine();
//         this.ui_ = new GameUI();
//         this.setupControls();
//     }

//     start() {
//         this.gameEngine_.startNewGame();
        
//         // Player va entitylarni xonaga joylashtirish
//         this.placeEntities();
        
//         // Boshlang'ich xabar
//         this.ui_.showMessage('O\'yin boshlandi! Yurish uchun arrow keys yoki hjkl tugmalaridan foydalaning.');
        
//         // Ekranni yangilash
//         this.render();
//     }

//     placeEntities() {
//         const room = this.gameEngine_.map.notViewRooms[0];
        
//         // Player'ni xona o'rtasiga qo'yish
//         this.gameEngine_.player.x = Math.floor(room.width_ / 2);
//         this.gameEngine_.player.y = Math.floor(room.height_ / 2);

//         // Enemies'ni random joylashtirish (player bilan bir joyga tushmasligi uchun)
//         this.gameEngine_.enems.forEach(enemy => {
//             let x, y;
//             do {
//                 x = Math.floor(Math.random() * (room.width_ - 2)) + 1;
//                 y = Math.floor(Math.random() * (room.height_ - 2)) + 1;
//             } while (x === this.gameEngine_.player.x_ && y === this.gameEngine_.player.y_);
            
//             enemy.x = x;
//             enemy.y = y;
//         });

//         // Weapons'larni random joylashtirish
//         this.gameEngine_.weapons.forEach(weapon => {
//             let x, y;
//             do {
//                 x = Math.floor(Math.random() * (room.width_ - 2)) + 1;
//                 y = Math.floor(Math.random() * (room.height_ - 2)) + 1;
//             } while (x === this.gameEngine_.player.x_ && y === this.gameEngine_.player.y_);
            
//             weapon.x = x;
//             weapon.y = y;
//         });
//     }

//     setupControls() {
//         // Arrow keys va vim keys bilan harakat
//         this.ui_.screen.key(['up', 'w'], () => {
//             this.movePlayer(0, -1);
//         });

//         this.ui_.screen.key(['down', 's'], () => {
//             this.movePlayer(0, 1);
//         });

//         this.ui_.screen.key(['left', 'a'], () => {
//             this.movePlayer(-1, 0);
//         });

//         this.ui_.screen.key(['right', 'd'], () => {
//             this.movePlayer(1, 0);
//         });
//     }

//     movePlayer(dx, dy) {
//         const player = this.gameEngine_.player;
//         const room = this.gameEngine_.map.notViewRooms[0];
        
//         const newX = player.x + dx;
//         const newY = player.y + dy;

//         // Devorga tegmasligini tekshirish
//         if (newX > 0 && newX < room.width_ - 1 && 
//             newY > 0 && newY < room.height_ - 1) {
            
//             // Enemy bilan to'qnashuvni tekshirish
//             const enemyAt = this.gameEngine_.enems.find(
//                 e => e.x === newX && e.y === newY
//             );
//             console.log(enemyAt.x);
//             if (enemyAt) {
//                 this.handleCombat(enemyAt);
//             } else {
//                 player.move(dx, dy);
                
//                 // Qurol yig'ishni tekshirish
//                 this.checkWeaponPickup(newX, newY);
//             }

//             // Enemies'ni harakatlantirish
//             this.moveEnemies();
            
//             // Ekranni yangilash
//             this.render();
            
//             // Barcha enemylar yo'q qilinganmi tekshirish
//             if (this.gameEngine_.enems.length === 0) {
//                 this.ui_.showMessage('Barcha dushmanlar mag\'lub etildi! Siz g\'olib bo\'ldingiz!');
//                 setTimeout(() => process.exit(0), 3000);
//             }
//         }
//     }

//     handleCombat(enemy) {
//         const playerDamage = this.gameEngine_.player.attack();
//         const enemyAlive = enemy.takeDamage(playerDamage);

//         this.ui_.showMessage(`Siz ${enemy.type}ga ${playerDamage} zarar yetkazdingiz!`);

//         if (!enemyAlive) {
//             this.ui_.showMessage(`${enemy.type} o'ldirildi!`);
            
//             // Oltin qo'shish
//             const goldGain = Math.floor(Math.random() * 10) + 5;
//             this.gameEngine_.player.gold += goldGain;
//             this.ui_.showMessage(`Siz ${goldGain} oltin topdingiz!`);
            
//             // Enemy'ni o'chirish
//             const index = this.gameEngine_.enems.indexOf(enemy);
//             this.gameEngine_.enems.splice(index, 1);
//         } else {
//             // Enemy qaytadan uradi
//             const enemyDamage = enemy.attack();
//             const playerAlive = this.gameEngine_.player.takeDamage(enemyDamage);
//             this.ui_.showMessage(`${enemy.type} sizga ${enemyDamage} zarar yetkazdi!`);

//             if (!playerAlive) {
//                 this.ui_.showMessage('Siz o\'ldingiz! O\'yin tugadi.');
//                 setTimeout(() => process.exit(0), 2000);
//             }
//         }
//     }

//     checkWeaponPickup(x, y) {
//         const weapon = this.gameEngine_.weapons.find(
//             w => w.x === x && w.y === y
//         );

//         if (weapon) {
//             this.gameEngine_.player.equippedWeapon = weapon;
//             this.ui_.showMessage(`Siz ${weapon.type} qurolini oldingiz!`);
            
//             // Weapon'ni o'chirish
//             const index = this.gameEngine_.weapons.indexOf(weapon);
//             this.gameEngine_.weapons.splice(index, 1);
//         }
//     }

//     moveEnemies() {
//         const player = this.gameEngine_.player;
//         const room = this.gameEngine_.map.notViewRooms[0];
        
//         this.gameEngine_.enems.forEach(enemy => {
//             const oldX = enemy.x;
//             const oldY = enemy.y;
            
//             // Enemy harakatlanishidan oldingi pozitsiyasi
//             enemy.move(player.x, player.y);
            
//             // Devor yoki boshqa enemy bilan to'qnashuvni tekshirish
//             if (enemy.x <= 0 || enemy.x >= room.width_ - 1 || 
//                 enemy.y <= 0 || enemy.y >= room.height_ - 1) {
//                 // Agar devorga tushsa, eski pozitsiyasiga qaytarish
//                 enemy.x = oldX;
//                 enemy.y = oldY;
//             }
            
//             // Agar enemy player'ga yetib kelsa
//             if ((enemy.x === player.x && enemy.y === player.y)) {
//                 const enemyDamage = enemy.attack();
//                 const playerAlive = this.gameEngine_.player.takeDamage(enemyDamage);
//                 this.ui_.showMessage(`${enemy.type} sizga hujum qildi! ${enemyDamage} zarar!`);

//                 if (!playerAlive) {
//                     this.ui_.showMessage('Siz o\'ldingiz! O\'yin tugadi.');
//                     setTimeout(() => process.exit(0), 2000);
//                 }
//             }
//         });
//     }

//     render() {
//         this.ui_.renderMap(
//             this.gameEngine_.map,
//             this.gameEngine_.player,
//             this.gameEngine_.enems,
//             this.gameEngine_.weapons
//         );
//         this.ui_.renderStats(this.gameEngine_.player);
//     }
// }

// // O'yinni boshlash
// const game = new RogueGame();
// game.start();