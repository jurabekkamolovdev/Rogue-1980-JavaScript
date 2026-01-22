// // src/domain/services/GameEngine.js


// import { WEAPON_TYPES, Weapon } from "../entities/Weapon.js"
// import { ENEMY_TYPES, Enemy } from "../entities/Enemy.js"
// import { Map } from "../entities/Map.js"
// import { Player } from "../entities/Player.js"
// import { GameUI } from "../../presentation/GameUI.js"
// export class GameEngine {
//     constructor() {
//         this.player_ = null;
//         this.weapons_ = [];
//         this.enems_ = [];
//         this.map_ = null;
//         this.level_ = 1;
//         this.playRoom_ = null;

//         this.ui_ = new GameUI();
//     }

//     get player() { return this.player_; }
//     get weapons() { return this.weapons_; }
//     get enems() { return this.enems_; }
//     get map() { return this.map_; }
//     get playRoom() { return this.playRoom_; }
//     set playRoom(room) { this.playRoom_ = room; }

//     startNewGame() {
//         this.level_ = 5;

//         this.generatePlayer();
//         this.generateLevel();
//         this.placeEntities();
//         this.map.drawRooms();
//         this.ui_.renderMap(this.map_.grid);
//         this.ui_.renderStats(this.player_);
//         this.setupControls();
//     }

//     generateLevel() {
//         this.generateWeapons();
//         this.generateEnems();
//         this.generateMap();
//     }

//     generateWeapons() {
//         this.weapons_ = [];

//         const weaponCount = this.level_ + Math.floor(Math.random() * 3);

//         const weaponTypes = Object.values(WEAPON_TYPES);

//         for(let i = 0; i < weaponCount; i++) {
//             const randomType = weaponTypes[Math.floor(Math.random() * weaponTypes.length)];
//             const weapon = new Weapon(randomType);

//             this.weapons_.push(weapon);
//         }
//     }

//     generateEnems() {
//         this.enems_ = [];

//         const enemsCount = this.level_ + Math.floor(Math.random() * 2);

//         const enemsTypes = Object.values(ENEMY_TYPES);

//         for(let i = 0; i < enemsCount; i++) {
//             const randomType = enemsTypes[Math.floor(Math.random() * enemsTypes.length)];
//             const enemy = new Enemy(randomType);

//             this.enems_.push(enemy);
//         }
//     }

//     generateMap() {
//         this.map_ = new Map();
//     }
    
//     generatePlayer() {
//         this.player_ = new Player();
//     }

//     placeEntities() {
//         this.placePlayer();
//         this.placeWeapons();
//         this.placeEnems();
//     }

//     placePlayer() {
//         const rooms = this.map_.notViewRooms;
        
//         const randomIndex = Math.floor(Math.random() * rooms.length);
//         const randomRoom = rooms[randomIndex];
//         this.playRoom_ = randomRoom;
        
//         const availableCells = randomRoom.findAvailableCells();
//         const startPosition = availableCells[Math.floor(Math.random() * availableCells.length)];
        
//         this.player_.x = startPosition.x;
//         this.player_.y = startPosition.y;
        
//         randomRoom.appendEntitiesInRoom(this.player_);
//     }

//     placeWeapons() {
//         while(this.weapons_.length > 0) {
//             const rooms = this.map_.notViewRooms;
//             const randomRoomsIndex = Math.floor(Math.random() * rooms.length);
//             const randomRoom = rooms[randomRoomsIndex];

//             const weapon = this.weapons_.pop();

//             const availableCells = randomRoom.findAvailableCells();
//             const startPosition = availableCells[Math.floor(Math.random() * availableCells.length)];

//             weapon.x = startPosition.x;
//             weapon.y = startPosition.y;

//             randomRoom.appendEntitiesInRoom(weapon);
//         }
//     }

//     placeEnems() {
//         while(this.enems_.length > 0) {
//             const rooms = this.map_.notViewRooms;
//             const randomRoomsIndex = Math.floor(Math.random() * rooms.length);
//             const randomRoom = rooms[randomRoomsIndex];

//             const enemy = this.enems_.pop();

//             const availableCells = randomRoom.findAvailableCells();
//             const startPosition = availableCells[Math.floor(Math.random() * availableCells.length)];

//             enemy.x = startPosition.x;
//             enemy.y = startPosition.y;

//             randomRoom.appendEntitiesInRoom(enemy);
//         }
//     }

//     setupControls() {
//         this.ui_.screen.key(['up', 'W', 'w'], () => {
//             this.move(0, -1);
//         });

//         this.ui_.screen.key(['down', 'S', 's'], () => {
//             this.move(0, 1);
//         });

//         this.ui_.screen.key(['left', 'A', 'a'], () => {
//             this.move(-1, 0);
//         });

//         this.ui_.screen.key(['right', 'D', 'd'], () => {
//             this.move(1, 0);
//         });

//         this.ui_.screen.key(['G', 'g'] , () => {
//             this.getWeapon();
//         })

//         this.ui_.screen.key(['i', 'I'], () => {
//             this.openInventor();
//         })
//     }

//     openInventor() {
//         const player = this.player_;
//         const playerInventors = player.inventory;
//         for(let i = 0; i < playerInventors.length; i++) {
//             this.ui_.messages_.push(`${i + 1}) ${playerInventors[i].char}`);
//         }

//         this.moveEnemies();
//         this.map_.drawRooms();
//         this.ui_.renderMessage();
//         this.ui_.renderMap(this.map_.grid);
//         this.ui_.renderStats(player);
//     }

//     getWeapon() {
//         const player = this.player_;
//         const room = this.playRoom_;

//         const weapons = room.getWeapons();
//         weapons.forEach(weapon => {
//             const distanceX = Math.abs(player.x - weapon.x);
//             const distanceY = Math.abs(player.y - weapon.y);
//             if((distanceX === 1 && distanceY === 0) || (distanceY === 1 && distanceX === 0)) {
//                 // player.equippedWeapon = weapon;
//                 player.inventory.push(weapon);
//                 room.grid[weapon.y][weapon.x] = 0;
//                 this.ui_.messages_.push(`Weapon ${weapon.char} equipped!`);
//             }
//         });
        
//         this.moveEnemies();
//         this.map_.drawRooms();
//         this.ui_.renderMessage();
//         this.ui_.renderMap(this.map_.grid);
//         this.ui_.renderStats(player);
//     }

//     move(dx, dy) {
//         const player = this.player_;
//         const room = this.playRoom_;

//         const newX = player.x + dx;
//         const newY = player.y + dy;

//         const targetCell = room.grid[newY][newX];

//         if(targetCell === 0) {
//             player.move(dx, dy); 
//         } else {
//             if(targetCell instanceof Enemy) {
//                 const damage = player.attack();
//                 const isEnemyAlive = targetCell.takeDamage(damage);
//                 this.ui_.messages_.push(`You hit the ${targetCell.type} damage ${damage}`);
//                 if(!isEnemyAlive) {
//                     room.grid[newY][newX] = 0;
//                     this.ui_.messages_.push(`You defeated the ${targetCell.type}`);
//                 }
//             }
//         }
//         this.moveEnemies();
//         this.map_.drawRooms();
//         this.ui_.renderMessage();
//         this.ui_.renderMap(this.map_.grid);
//         this.ui_.renderStats(player);
//     }

//     moveEnemies() {
//         const room = this.playRoom_;
//         const player = this.player_;
//         const enems = room.getEnems();

//         if(enems.length > 0) {
//             for(let i = 0; i < enems.length; i++) {
//                 const enemy = enems[i];
//                 const movePosition = enemy.calculateMove(player.x, player.y);
                
//                 const enemyNewX = enemy.x + movePosition.dx;
//                 const enemyNewY = enemy.y + movePosition.dy;

//                 if(enemyNewY >= room.height || 
//                     enemyNewX >= room.width) {
//                     continue;
//                 }

//                 const distanceX = Math.abs(player.x - enemy.x);
//                 const distanceY = Math.abs(player.y - enemy.y);
                
//                 if((distanceX === 1 && distanceY === 0) || (distanceY === 1 && distanceX === 0)){
//                         const enemyDamage = enemy.attack();
//                         const isPlayerAlive = player.takeDamage(enemyDamage);
//                         this.ui_.messages_.push(`The ${enemy.type} hits you!`);
//                         // this.ui_.renderMessage(`The ${enemy.type} hits you!`);
//                         if(!isPlayerAlive) {
//                             this.ui_.renderMessage('Game Over! You died.');
//                         }
//                         continue;
//                     }
                
//                 const enemyTargetCell = room.grid[enemyNewY][enemyNewX];

//                 if(enemyTargetCell === 0) {
//                     enemy.move(movePosition.dx, movePosition.dy);
//                 }
//             }
//         }

//     }
// }

// src/domain/services/GameEngine.js

// import { WEAPON_TYPES, Weapon } from "../entities/Weapon.js"
// import { ENEMY_TYPES, Enemy } from "../entities/Enemy.js"
// import { Map } from "../entities/Map.js"
// import { Player } from "../entities/Player.js"
// import { GameUI } from "../../presentation/GameUI.js"

// export class GameEngine {
//     constructor() {
//         this.player_ = null;
//         this.weapons_ = [];
//         this.enems_ = [];
//         this.map_ = null;
//         this.level_ = 1;
//         this.playRoom_ = null;

//         this.ui_ = new GameUI();
//     }

//     get player() { return this.player_; }
//     get weapons() { return this.weapons_; }
//     get enems() { return this.enems_; }
//     get map() { return this.map_; }
//     get playRoom() { return this.playRoom_; }
//     set playRoom(room) { 
//         if(this.playRoom_) {
//             this.playRoom_.isVisible = false;
//         }
//         this.playRoom_ = room;
//         room.isVisible = true;
//     }

//     startNewGame() {
//         this.level_ = 5;

//         this.generatePlayer();
//         this.generateLevel();
//         this.placeEntities();
//         this.map.createCorridors();
//         this.map.drawRooms();
//         this.ui_.renderMap(this.map_.grid);
//         this.ui_.renderStats(this.player_);
//         this.setupControls();
//     }

//     generateLevel() {
//         this.generateWeapons();
//         this.generateEnems();
//         this.generateMap();
//     }

//     generateWeapons() {
//         this.weapons_ = [];
//         const weaponCount = this.level_ + Math.floor(Math.random() * 3);
//         const weaponTypes = Object.values(WEAPON_TYPES);

//         for(let i = 0; i < weaponCount; i++) {
//             const randomType = weaponTypes[Math.floor(Math.random() * weaponTypes.length)];
//             const weapon = new Weapon(randomType);
//             this.weapons_.push(weapon);
//         }
//     }

//     generateEnems() {
//         this.enems_ = [];
//         const enemsCount = this.level_ + Math.floor(Math.random() * 2);
//         const enemsTypes = Object.values(ENEMY_TYPES);

//         for(let i = 0; i < enemsCount; i++) {
//             const randomType = enemsTypes[Math.floor(Math.random() * enemsTypes.length)];
//             const enemy = new Enemy(randomType);
//             this.enems_.push(enemy);
//         }
//     }

//     generateMap() {
//         this.map_ = new Map();
//     }
    
//     generatePlayer() {
//         this.player_ = new Player();
//     }

//     placeEntities() {
//         this.placePlayer();
//         this.placeWeapons();
//         this.placeEnems();
//     }

//     placePlayer() {
//         const rooms = this.map_.notViewRooms;
//         const randomIndex = Math.floor(Math.random() * rooms.length);
//         const randomRoom = rooms[randomIndex];
        
//         this.playRoom = randomRoom; // setter ishlatamiz
        
//         const availableCells = randomRoom.findAvailableCells();
//         const startPosition = availableCells[Math.floor(Math.random() * availableCells.length)];
        
//         this.player_.x = startPosition.x;
//         this.player_.y = startPosition.y;
        
//         randomRoom.appendEntitiesInRoom(this.player_);
//     }

//     placeWeapons() {
//         while(this.weapons_.length > 0) {
//             const rooms = this.map_.notViewRooms;
//             // Player xonasini filtrlaymiz
//             const availableRooms = rooms.filter(r => r !== this.playRoom_);
            
//             if(availableRooms.length === 0) break;
            
//             const randomRoomsIndex = Math.floor(Math.random() * availableRooms.length);
//             const randomRoom = availableRooms[randomRoomsIndex];

//             const weapon = this.weapons_.pop();

//             const availableCells = randomRoom.findAvailableCells();
//             if(availableCells.length === 0) continue;
            
//             const startPosition = availableCells[Math.floor(Math.random() * availableCells.length)];

//             weapon.x = startPosition.x;
//             weapon.y = startPosition.y;

//             randomRoom.appendEntitiesInRoom(weapon);
//         }
//     }

//     placeEnems() {
//         while(this.enems_.length > 0) {
//             const rooms = this.map_.notViewRooms;
//             // Player xonasini filtrlaymiz
//             const availableRooms = rooms.filter(r => r !== this.playRoom_);
            
//             if(availableRooms.length === 0) break;
            
//             const randomRoomsIndex = Math.floor(Math.random() * availableRooms.length);
//             const randomRoom = availableRooms[randomRoomsIndex];

//             const enemy = this.enems_.pop();

//             const availableCells = randomRoom.findAvailableCells();
//             if(availableCells.length === 0) continue;
            
//             const startPosition = availableCells[Math.floor(Math.random() * availableCells.length)];

//             enemy.x = startPosition.x;
//             enemy.y = startPosition.y;

//             randomRoom.appendEntitiesInRoom(enemy);
//         }
//     }

//     setupControls() {
//         this.ui_.screen.key(['up', 'W', 'w'], () => {
//             this.move(0, -1);
//         });

//         this.ui_.screen.key(['down', 'S', 's'], () => {
//             this.move(0, 1);
//         });

//         this.ui_.screen.key(['left', 'A', 'a'], () => {
//             this.move(-1, 0);
//         });

//         this.ui_.screen.key(['right', 'D', 'd'], () => {
//             this.move(1, 0);
//         });

//         this.ui_.screen.key(['G', 'g'], () => {
//             this.getWeapon();
//         });

//         this.ui_.screen.key(['i', 'I'], () => {
//             this.openInventor();
//         });
//     }

//     openInventor() {
//         const player = this.player_;
//         const playerInventors = player.inventory;
//         for(let i = 0; i < playerInventors.length; i++) {
//             this.ui_.messages_.push(`${i + 1}) ${playerInventors[i].char}`);
//         }

//         this.moveEnemies();
//         this.map_.drawRooms();
//         this.ui_.renderMessage();
//         this.ui_.renderMap(this.map_.grid);
//         this.ui_.renderStats(player);
//     }

//     getWeapon() {
//         const player = this.player_;
//         const room = this.playRoom_;

//         const weapons = room.getWeapons();
//         weapons.forEach(weapon => {
//             const distanceX = Math.abs(player.x - weapon.x);
//             const distanceY = Math.abs(player.y - weapon.y);
//             if((distanceX === 1 && distanceY === 0) || (distanceY === 1 && distanceX === 0)) {
//                 player.inventory.push(weapon);
//                 room.grid[weapon.y][weapon.x] = 0;
//                 this.ui_.messages_.push(`Weapon ${weapon.char} picked up!`);
//             }
//         });
        
//         this.moveEnemies();
//         this.map_.drawRooms();
//         this.ui_.renderMessage();
//         this.ui_.renderMap(this.map_.grid);
//         this.ui_.renderStats(player);
//     }

//     move(dx, dy) {
//         const player = this.player_;
//         const room = this.playRoom_;

//         const newX = player.x + dx;
//         const newY = player.y + dy;

//         // Xona chegarasidan chiqish
//         if(newX < 0 || newX >= room.width || newY < 0 || newY >= room.height) {
//             return;
//         }

//         const targetCell = room.grid[newY][newX];

//         // Koridor belgisi (+)
//         if(targetCell === '+') {
//             // Yangi xonaga o'tish
//             const newRoom = this.map_.getRoomAtCorridor(room, newX, newY);
//             if(newRoom) {
//                 // Player yangi xonaga o'tadi
//                 room.grid[player.y][player.x] = 0;
//                 this.playRoom = newRoom; // Setter ishlatamiz
                
//                 // Yangi xonada corridor yaqinidagi bo'sh joyni topamiz
//                 const entryPoint = newRoom.findCorridorEntry(room);
//                 if(entryPoint) {
//                     player.x = entryPoint.x;
//                     player.y = entryPoint.y;
//                     newRoom.appendEntitiesInRoom(player);
//                 }
//             }
//         }
//         else if(targetCell === 0) {
//             player.move(dx, dy); 
//         } 
//         else if(targetCell instanceof Enemy) {
//             const damage = player.attack();
//             const isEnemyAlive = targetCell.takeDamage(damage);
//             this.ui_.messages_.push(`You hit the ${targetCell.type} damage ${damage}`);
//             if(!isEnemyAlive) {
//                 room.grid[newY][newX] = 0;
//                 this.ui_.messages_.push(`You defeated the ${targetCell.type}`);
//             }
//         }
        
//         this.moveEnemies();
//         this.map_.drawRooms();
//         this.ui_.renderMessage();
//         this.ui_.renderMap(this.map_.grid);
//         this.ui_.renderStats(player);
//     }

//     moveEnemies() {
//         const room = this.playRoom_;
//         const player = this.player_;
//         const enems = room.getEnems();

//         if(enems.length > 0) {
//             for(let i = 0; i < enems.length; i++) {
//                 const enemy = enems[i];
//                 const movePosition = enemy.calculateMove(player.x, player.y);
                
//                 const enemyNewX = enemy.x + movePosition.dx;
//                 const enemyNewY = enemy.y + movePosition.dy;

//                 if(enemyNewY >= room.height || enemyNewX >= room.width ||
//                    enemyNewY < 0 || enemyNewX < 0) {
//                     continue;
//                 }

//                 const distanceX = Math.abs(player.x - enemy.x);
//                 const distanceY = Math.abs(player.y - enemy.y);
                
//                 if((distanceX === 1 && distanceY === 0) || (distanceY === 1 && distanceX === 0)) {
//                     const enemyDamage = enemy.attack();
//                     const isPlayerAlive = player.takeDamage(enemyDamage);
//                     this.ui_.messages_.push(`The ${enemy.type} hits you!`);
//                     if(!isPlayerAlive) {
//                         this.ui_.messages_.push('Game Over! You died.');
//                         this.ui_.renderMessage();
//                         return;
//                     }
//                     continue;
//                 }
                
//                 const enemyTargetCell = room.grid[enemyNewY][enemyNewX];

//                 if(enemyTargetCell === 0) {
//                     enemy.move(movePosition.dx, movePosition.dy);
//                 }
//             }
//         }
//     }
// }


// src/domain/services/GameEngine.js

// import { WEAPON_TYPES, Weapon } from "../entities/Weapon.js"
// import { ENEMY_TYPES, Enemy } from "../entities/Enemy.js"
// import { Map } from "../entities/Map.js"
// import { Player } from "../entities/Player.js"
// import { GameUI } from "../../presentation/GameUI.js"

// export class GameEngine {
//     constructor() {
//         this.player_ = null;
//         this.weapons_ = [];
//         this.enems_ = [];
//         this.map_ = null;
//         this.level_ = 1;
//         this.playRoom_ = null;
//         this.isInCorridor_ = false; // Player corridor ichidami?
//         this.currentCorridor_ = null; // Hozirgi corridor

//         this.ui_ = new GameUI();
//     }

//     get player() { return this.player_; }
//     get weapons() { return this.weapons_; }
//     get enems() { return this.enems_; }
//     get map() { return this.map_; }
//     get playRoom() { return this.playRoom_; }
    
//     set playRoom(room) { 
//         if(this.playRoom_ && this.playRoom_ !== room) {
//             this.playRoom_.isVisible = false;
//         }
//         this.playRoom_ = room;
//         if(room) {
//             room.isVisible = true;
//             this.map_.markRoomAsExplored(room);
//         }
//     }

//     startNewGame() {
//         this.level_ = 5;

//         this.generatePlayer();
//         this.generateLevel();
//         this.placeEntities();
//         this.map.createCorridors();
//         this.map.drawRooms();
//         this.ui_.renderMap(this.map_.grid);
//         this.ui_.renderStats(this.player_);
//         this.setupControls();
//     }

//     generateLevel() {
//         this.generateWeapons();
//         this.generateEnems();
//         this.generateMap();
//     }

//     generateWeapons() {
//         this.weapons_ = [];
//         const weaponCount = this.level_ + Math.floor(Math.random() * 3);
//         const weaponTypes = Object.values(WEAPON_TYPES);

//         for(let i = 0; i < weaponCount; i++) {
//             const randomType = weaponTypes[Math.floor(Math.random() * weaponTypes.length)];
//             const weapon = new Weapon(randomType);
//             this.weapons_.push(weapon);
//         }
//     }

//     generateEnems() {
//         this.enems_ = [];
//         const enemsCount = this.level_ + Math.floor(Math.random() * 2);
//         const enemsTypes = Object.values(ENEMY_TYPES);

//         for(let i = 0; i < enemsCount; i++) {
//             const randomType = enemsTypes[Math.floor(Math.random() * enemsTypes.length)];
//             const enemy = new Enemy(randomType);
//             this.enems_.push(enemy);
//         }
//     }

//     generateMap() {
//         this.map_ = new Map();
//     }
    
//     generatePlayer() {
//         this.player_ = new Player();
//     }

//     placeEntities() {
//         this.placePlayer();
//         this.placeWeapons();
//         this.placeEnems();
//     }

//     placePlayer() {
//         const rooms = this.map_.notViewRooms;
//         const randomIndex = Math.floor(Math.random() * rooms.length);
//         const randomRoom = rooms[randomIndex];
        
//         this.playRoom = randomRoom;
        
//         const availableCells = randomRoom.findAvailableCells();
//         const startPosition = availableCells[Math.floor(Math.random() * availableCells.length)];
        
//         this.player_.x = startPosition.x;
//         this.player_.y = startPosition.y;
        
//         randomRoom.appendEntitiesInRoom(this.player_);
//     }

//     placeWeapons() {
//         while(this.weapons_.length > 0) {
//             const rooms = this.map_.notViewRooms;
//             const availableRooms = rooms.filter(r => r !== this.playRoom_);
            
//             if(availableRooms.length === 0) break;
            
//             const randomRoomsIndex = Math.floor(Math.random() * availableRooms.length);
//             const randomRoom = availableRooms[randomRoomsIndex];

//             const weapon = this.weapons_.pop();

//             const availableCells = randomRoom.findAvailableCells();
//             if(availableCells.length === 0) continue;
            
//             const startPosition = availableCells[Math.floor(Math.random() * availableCells.length)];

//             weapon.x = startPosition.x;
//             weapon.y = startPosition.y;

//             randomRoom.appendEntitiesInRoom(weapon);
//         }
//     }

//     placeEnems() {
//         while(this.enems_.length > 0) {
//             const rooms = this.map_.notViewRooms;
//             const availableRooms = rooms.filter(r => r !== this.playRoom_);
            
//             if(availableRooms.length === 0) break;
            
//             const randomRoomsIndex = Math.floor(Math.random() * availableRooms.length);
//             const randomRoom = availableRooms[randomRoomsIndex];

//             const enemy = this.enems_.pop();

//             const availableCells = randomRoom.findAvailableCells();
//             if(availableCells.length === 0) continue;
            
//             const startPosition = availableCells[Math.floor(Math.random() * availableCells.length)];

//             enemy.x = startPosition.x;
//             enemy.y = startPosition.y;

//             randomRoom.appendEntitiesInRoom(enemy);
//         }
//     }

//     setupControls() {
//         this.ui_.screen.key(['up', 'W', 'w'], () => {
//             this.move(0, -1);
//         });

//         this.ui_.screen.key(['down', 'S', 's'], () => {
//             this.move(0, 1);
//         });

//         this.ui_.screen.key(['left', 'A', 'a'], () => {
//             this.move(-1, 0);
//         });

//         this.ui_.screen.key(['right', 'D', 'd'], () => {
//             this.move(1, 0);
//         });

//         this.ui_.screen.key(['G', 'g'], () => {
//             this.getWeapon();
//         });

//         this.ui_.screen.key(['i', 'I'], () => {
//             this.openInventor();
//         });
//     }

//     openInventor() {
//         const player = this.player_;
//         const playerInventors = player.inventory;
//         for(let i = 0; i < playerInventors.length; i++) {
//             this.ui_.messages_.push(`${i + 1}) ${playerInventors[i].char}`);
//         }

//         this.moveEnemies();
//         this.map_.drawRooms();
//         this.ui_.renderMessage();
//         this.ui_.renderMap(this.map_.grid);
//         this.ui_.renderStats(player);
//     }

//     getWeapon() {
//         const player = this.player_;
//         const room = this.playRoom_;

//         const weapons = room.getWeapons();
//         weapons.forEach(weapon => {
//             const distanceX = Math.abs(player.x - weapon.x);
//             const distanceY = Math.abs(player.y - weapon.y);
//             if((distanceX === 1 && distanceY === 0) || (distanceY === 1 && distanceX === 0)) {
//                 player.inventory.push(weapon);
//                 room.grid[weapon.y][weapon.x] = 0;
//                 this.ui_.messages_.push(`Weapon ${weapon.char} picked up!`);
//             }
//         });
        
//         this.moveEnemies();
//         this.map_.drawRooms();
//         this.ui_.renderMessage();
//         this.ui_.renderMap(this.map_.grid);
//         this.ui_.renderStats(player);
//     }

//     move(dx, dy) {
//         const player = this.player_;
        
//         if(this.isInCorridor_) {
//             this.moveInCorridor(dx, dy);
//         } else {
//             this.moveInRoom(dx, dy);
//         }
//     }

//     moveInRoom(dx, dy) {
//         const player = this.player_;
//         const room = this.playRoom_;

//         const newX = player.x + dx;
//         const newY = player.y + dy;

//         // Xona chegarasidan chiqish
//         if(newX < 0 || newX >= room.width || newY < 0 || newY >= room.height) {
//             return;
//         }

//         const targetCell = room.grid[newY][newX];

//         // Koridor belgisi (+) - corridor ichiga kirish
//         if(targetCell === '+') {
//             const corridor = this.map_.corridors_.find(c => {
//                 const globalX = room.mapX + newX;
//                 const globalY = room.mapY + newY;
                
//                 return (c.room1 === room && c.x1 === globalX && c.y1 === globalY) ||
//                        (c.room2 === room && c.x2 === globalX && c.y2 === globalY);
//             });
            
//             if(corridor) {
//                 // Player xonadan corridor ichiga kiradi
//                 room.grid[player.y][player.x] = 0;
                
//                 this.isInCorridor_ = true;
//                 this.currentCorridor_ = corridor;
                
//                 // Player global koordinatalarga o'tamiz
//                 this.player_.globalX = room.mapX + newX;
//                 this.player_.globalY = room.mapY + newY;
                
//                 // Corridorni explored qilamiz
//                 this.map_.markCorridorAsExplored(corridor);
                
//                 this.ui_.messages_.push('Entered corridor');
//             }
//         }
//         else if(targetCell === 0) {
//             player.move(dx, dy); 
//         } 
//         else if(targetCell instanceof Enemy) {
//             const damage = player.attack();
//             const isEnemyAlive = targetCell.takeDamage(damage);
//             this.ui_.messages_.push(`You hit the ${targetCell.type} damage ${damage}`);
//             if(!isEnemyAlive) {
//                 room.grid[newY][newX] = 0;
//                 this.ui_.messages_.push(`You defeated the ${targetCell.type}`);
//             }
//         }
        
//         this.moveEnemies();
//         this.map_.drawRooms();
//         this.ui_.renderMessage();
//         this.ui_.renderMap(this.map_.grid);
//         this.ui_.renderStats(player);
//     }

//     moveInCorridor(dx, dy) {
//         const player = this.player_;
//         const corridor = this.currentCorridor_;
        
//         const newGlobalX = player.globalX + dx;
//         const newGlobalY = player.globalY + dy;
        
//         // Corridor yo'nalishini tekshirish
//         const isValidMove = corridor.direction === 'horizontal' 
//             ? (newGlobalY === corridor.y1 && newGlobalX >= corridor.x1 && newGlobalX <= corridor.x2)
//             : (newGlobalX === corridor.x1 && newGlobalY >= corridor.y1 && newGlobalY <= corridor.y2);
        
//         if(!isValidMove) {
//             return;
//         }
        
//         // Corridor oxiriga yetdikmi?
//         const reachedRoom1 = (newGlobalX === corridor.x1 && newGlobalY === corridor.y1);
//         const reachedRoom2 = (newGlobalX === corridor.x2 && newGlobalY === corridor.y2);
        
//         if(reachedRoom1 || reachedRoom2) {
//             const targetRoom = reachedRoom1 ? corridor.room1 : corridor.room2;
            
//             // Xonaga kirish
//             this.isInCorridor_ = false;
//             this.currentCorridor_ = null;
//             this.playRoom = targetRoom;
            
//             // Xonadagi entry pointni topish
//             const entryPoint = targetRoom.findCorridorEntry(null);
//             player.x = entryPoint.x;
//             player.y = entryPoint.y;
//             targetRoom.appendEntitiesInRoom(player);
            
//             this.ui_.messages_.push('Entered room');
//         } else {
//             // Corridor ichida harakatlanish
//             player.globalX = newGlobalX;
//             player.globalY = newGlobalY;
            
//             // Corridorni explored qilamiz
//             this.map_.markCorridorAsExplored(corridor);
//         }
        
//         this.map_.drawRooms();
//         this.ui_.renderMessage();
//         this.ui_.renderMap(this.map_.grid);
//         this.ui_.renderStats(player);
//     }

//     moveEnemies() {
//         const room = this.playRoom_;
//         const player = this.player_;
        
//         // Corridor ichida dushman yo'q
//         if(this.isInCorridor_) return;
        
//         const enems = room.getEnems();

//         if(enems.length > 0) {
//             for(let i = 0; i < enems.length; i++) {
//                 const enemy = enems[i];
//                 const movePosition = enemy.calculateMove(player.x, player.y);
                
//                 const enemyNewX = enemy.x + movePosition.dx;
//                 const enemyNewY = enemy.y + movePosition.dy;

//                 if(enemyNewY >= room.height || enemyNewX >= room.width ||
//                    enemyNewY < 0 || enemyNewX < 0) {
//                     continue;
//                 }

//                 const distanceX = Math.abs(player.x - enemy.x);
//                 const distanceY = Math.abs(player.y - enemy.y);
                
//                 if((distanceX === 1 && distanceY === 0) || (distanceY === 1 && distanceX === 0)) {
//                     const enemyDamage = enemy.attack();
//                     const isPlayerAlive = player.takeDamage(enemyDamage);
//                     this.ui_.messages_.push(`The ${enemy.type} hits you!`);
//                     if(!isPlayerAlive) {
//                         this.ui_.messages_.push('Game Over! You died.');
//                         this.ui_.renderMessage();
//                         return;
//                     }
//                     continue;
//                 }
                
//                 const enemyTargetCell = room.grid[enemyNewY][enemyNewX];

//                 if(enemyTargetCell === 0) {
//                     enemy.move(movePosition.dx, movePosition.dy);
//                 }
//             }
//         }
//     }
// }


// src/domain/services/GameEngine.js

// import { WEAPON_TYPES, Weapon } from "../entities/Weapon.js"
// import { ENEMY_TYPES, Enemy } from "../entities/Enemy.js"
// import { Map } from "../entities/Map.js"
// import { Player } from "../entities/Player.js"
// import { GameUI } from "../../presentation/GameUI.js"

// export class GameEngine {
//     constructor() {
//         this.player_ = null;
//         this.weapons_ = [];
//         this.enems_ = [];
//         this.map_ = null;
//         this.level_ = 1;
//         this.playRoom_ = null;
//         this.isInCorridor_ = false;
//         this.currentCorridor_ = null;

//         this.ui_ = new GameUI();
//     }

//     get player() { return this.player_; }
//     get weapons() { return this.weapons_; }
//     get enems() { return this.enems_; }
//     get map() { return this.map_; }
//     get playRoom() { return this.playRoom_; }
    
//     set playRoom(room) { 
//         if(this.playRoom_ && this.playRoom_ !== room) {
//             this.playRoom_.isVisible = false;
//         }
//         this.playRoom_ = room;
//         if(room) {
//             room.isVisible = true;
//             this.map_.markRoomAsExplored(room);
//         }
//     }

//     startNewGame() {
//         this.level_ = 5;

//         this.generatePlayer();
//         this.generateLevel();
//         this.placeEntities();
//         this.map.createCorridors();
//         this.map.drawRooms();
//         this.ui_.renderMap(this.map_.grid);
//         this.ui_.renderStats(this.player_);
//         this.setupControls();
//     }

//     generateLevel() {
//         this.generateWeapons();
//         this.generateEnems();
//         this.generateMap();
//     }

//     generateWeapons() {
//         this.weapons_ = [];
//         const weaponCount = this.level_ + Math.floor(Math.random() * 3);
//         const weaponTypes = Object.values(WEAPON_TYPES);

//         for(let i = 0; i < weaponCount; i++) {
//             const randomType = weaponTypes[Math.floor(Math.random() * weaponTypes.length)];
//             const weapon = new Weapon(randomType);
//             this.weapons_.push(weapon);
//         }
//     }

//     generateEnems() {
//         this.enems_ = [];
//         const enemsCount = this.level_ + Math.floor(Math.random() * 2);
//         const enemsTypes = Object.values(ENEMY_TYPES);

//         for(let i = 0; i < enemsCount; i++) {
//             const randomType = enemsTypes[Math.floor(Math.random() * enemsTypes.length)];
//             const enemy = new Enemy(randomType);
//             this.enems_.push(enemy);
//         }
//     }

//     generateMap() {
//         this.map_ = new Map();
//     }
    
//     generatePlayer() {
//         this.player_ = new Player();
//     }

//     placeEntities() {
//         this.placePlayer();
//         this.placeWeapons();
//         this.placeEnems();
//     }

//     placePlayer() {
//         const rooms = this.map_.notViewRooms;
//         const randomIndex = Math.floor(Math.random() * rooms.length);
//         const randomRoom = rooms[randomIndex];
        
//         this.playRoom = randomRoom;
        
//         const availableCells = randomRoom.findAvailableCells();
//         const startPosition = availableCells[Math.floor(Math.random() * availableCells.length)];
        
//         this.player_.x = startPosition.x;
//         this.player_.y = startPosition.y;
        
//         randomRoom.appendEntitiesInRoom(this.player_);
//     }

//     placeWeapons() {
//         while(this.weapons_.length > 0) {
//             const rooms = this.map_.notViewRooms;
//             const availableRooms = rooms.filter(r => r !== this.playRoom_);
            
//             if(availableRooms.length === 0) break;
            
//             const randomRoomsIndex = Math.floor(Math.random() * availableRooms.length);
//             const randomRoom = availableRooms[randomRoomsIndex];

//             const weapon = this.weapons_.pop();

//             const availableCells = randomRoom.findAvailableCells();
//             if(availableCells.length === 0) continue;
            
//             const startPosition = availableCells[Math.floor(Math.random() * availableCells.length)];

//             weapon.x = startPosition.x;
//             weapon.y = startPosition.y;

//             randomRoom.appendEntitiesInRoom(weapon);
//         }
//     }

//     placeEnems() {
//         while(this.enems_.length > 0) {
//             const rooms = this.map_.notViewRooms;
//             const availableRooms = rooms.filter(r => r !== this.playRoom_);
            
//             if(availableRooms.length === 0) break;
            
//             const randomRoomsIndex = Math.floor(Math.random() * availableRooms.length);
//             const randomRoom = availableRooms[randomRoomsIndex];

//             const enemy = this.enems_.pop();

//             const availableCells = randomRoom.findAvailableCells();
//             if(availableCells.length === 0) continue;
            
//             const startPosition = availableCells[Math.floor(Math.random() * availableCells.length)];

//             enemy.x = startPosition.x;
//             enemy.y = startPosition.y;

//             randomRoom.appendEntitiesInRoom(enemy);
//         }
//     }

//     setupControls() {
//         this.ui_.screen.key(['up', 'W', 'w'], () => {
//             this.move(0, -1);
//         });

//         this.ui_.screen.key(['down', 'S', 's'], () => {
//             this.move(0, 1);
//         });

//         this.ui_.screen.key(['left', 'A', 'a'], () => {
//             this.move(-1, 0);
//         });

//         this.ui_.screen.key(['right', 'D', 'd'], () => {
//             this.move(1, 0);
//         });

//         this.ui_.screen.key(['G', 'g'], () => {
//             this.getWeapon();
//         });

//         this.ui_.screen.key(['i', 'I'], () => {
//             this.openInventor();
//         });
//     }

//     openInventor() {
//         const player = this.player_;
//         const playerInventors = player.inventory;
//         for(let i = 0; i < playerInventors.length; i++) {
//             this.ui_.messages_.push(`${i + 1}) ${playerInventors[i].char}`);
//         }

//         this.moveEnemies();
//         this.updateDisplay();
//     }

//     getWeapon() {
//         if(this.isInCorridor_) return; // Corridor ichida weapon yo'q
        
//         const player = this.player_;
//         const room = this.playRoom_;

//         const weapons = room.getWeapons();
//         weapons.forEach(weapon => {
//             const distanceX = Math.abs(player.x - weapon.x);
//             const distanceY = Math.abs(player.y - weapon.y);
//             if((distanceX === 1 && distanceY === 0) || (distanceY === 1 && distanceX === 0)) {
//                 player.inventory.push(weapon);
//                 room.grid[weapon.y][weapon.x] = 0;
//                 this.ui_.messages_.push(`Weapon ${weapon.char} picked up!`);
//             }
//         });
        
//         this.moveEnemies();
//         this.updateDisplay();
//     }

//     move(dx, dy) {
//         if(this.isInCorridor_) {
//             this.moveInCorridor(dx, dy);
//         } else {
//             this.moveInRoom(dx, dy);
//         }
//     }

//     moveInRoom(dx, dy) {
//         const player = this.player_;
//         const room = this.playRoom_;

//         const newX = player.x + dx;
//         const newY = player.y + dy;

//         if(newX < 0 || newX >= room.width || newY < 0 || newY >= room.height) {
//             return;
//         }

//         const targetCell = room.grid[newY][newX];

//         if(targetCell === '+') {
//             // Corridor topish
//             const corridor = this.map_.corridors_.find(c => {
//                 const globalX = room.mapX + newX;
//                 const globalY = room.mapY + newY;
                
//                 return (c.room1 === room && c.x1 === globalX && c.y1 === globalY) ||
//                        (c.room2 === room && c.x2 === globalX && c.y2 === globalY);
//             });
            
//             if(corridor) {
//                 // Xonadan chiqish
//                 room.grid[player.y][player.x] = 0;
                
//                 this.isInCorridor_ = true;
//                 this.currentCorridor_ = corridor;
                
//                 // Global koordinataga o'tish
//                 const globalX = room.mapX + newX;
//                 const globalY = room.mapY + newY;
                
//                 this.player_.globalX = globalX;
//                 this.player_.globalY = globalY;
                
//                 // Hozirgi tile'ni explored qilish
//                 this.map_.markTileAsExplored(globalX, globalY);
                
//                 this.ui_.messages_.push('Corridor');
                
//                 this.updateDisplay();
//             }
//         }
//         else if(targetCell === 0) {
//             player.move(dx, dy); 
//             this.moveEnemies();
//             this.updateDisplay();
//         } 
//         else if(targetCell instanceof Enemy) {
//             const damage = player.attack();
//             const isEnemyAlive = targetCell.takeDamage(damage);
//             this.ui_.messages_.push(`You hit ${targetCell.type} dmg ${damage}`);
//             if(!isEnemyAlive) {
//                 room.grid[newY][newX] = 0;
//                 this.ui_.messages_.push(`Defeated ${targetCell.type}`);
//             }
//             this.moveEnemies();
//             this.updateDisplay();
//         }
//     }

//     moveInCorridor(dx, dy) {
//         const player = this.player_;
//         const corridor = this.currentCorridor_;
        
//         const newGlobalX = player.globalX + dx;
//         const newGlobalY = player.globalY + dy;
        
//         // Corridor yo'nalishini aniqlash
//         let isInCorridorBounds = false;
        
//         if(corridor.direction === 'horizontal') {
//             // Faqat gorizontal yo'nalishda harakat
//             if(dy !== 0) return; // vertikal harakatga ruxsat yo'q
            
//             isInCorridorBounds = (newGlobalY === corridor.y1 && 
//                                   newGlobalX >= corridor.x1 && 
//                                   newGlobalX <= corridor.x2);
//         } else {
//             // Faqat vertikal yo'nalishda harakat
//             if(dx !== 0) return; // gorizontal harakatga ruxsat yo'q
            
//             isInCorridorBounds = (newGlobalX === corridor.x1 && 
//                                   newGlobalY >= corridor.y1 && 
//                                   newGlobalY <= corridor.y2);
//         }
        
//         if(!isInCorridorBounds) {
//             return;
//         }
        
//         // Corridor oxiriga yetdikmi?
//         const atRoom1Entry = (newGlobalX === corridor.x1 && newGlobalY === corridor.y1);
//         const atRoom2Entry = (newGlobalX === corridor.x2 && newGlobalY === corridor.y2);
        
//         if(atRoom1Entry || atRoom2Entry) {
//             // Xonaga kirish
//             const targetRoom = atRoom1Entry ? corridor.room1 : corridor.room2;
            
//             this.isInCorridor_ = false;
//             this.currentCorridor_ = null;
//             this.playRoom = targetRoom;
            
//             // Xonadagi entry pointni topish
//             const entryPoint = targetRoom.findCorridorEntry(null);
//             player.x = entryPoint.x;
//             player.y = entryPoint.y;
//             targetRoom.appendEntitiesInRoom(player);
            
//             this.ui_.messages_.push('Room');
//         } else {
//             // Corridor ichida davom etish
//             player.globalX = newGlobalX;
//             player.globalY = newGlobalY;
            
//             // Har qadam - 1 ta tile explored
//             this.map_.markTileAsExplored(newGlobalX, newGlobalY);
//         }
        
//         this.updateDisplay();
//     }

//     moveEnemies() {
//         if(this.isInCorridor_) return;
        
//         const room = this.playRoom_;
//         const player = this.player_;
//         const enems = room.getEnems();

//         if(enems.length > 0) {
//             for(let i = 0; i < enems.length; i++) {
//                 const enemy = enems[i];
//                 const movePosition = enemy.calculateMove(player.x, player.y);
                
//                 const enemyNewX = enemy.x + movePosition.dx;
//                 const enemyNewY = enemy.y + movePosition.dy;

//                 if(enemyNewY >= room.height || enemyNewX >= room.width ||
//                    enemyNewY < 0 || enemyNewX < 0) {
//                     continue;
//                 }

//                 const distanceX = Math.abs(player.x - enemy.x);
//                 const distanceY = Math.abs(player.y - enemy.y);
                
//                 if((distanceX === 1 && distanceY === 0) || (distanceY === 1 && distanceX === 0)) {
//                     const enemyDamage = enemy.attack();
//                     const isPlayerAlive = player.takeDamage(enemyDamage);
//                     this.ui_.messages_.push(`${enemy.type} hits you!`);
//                     if(!isPlayerAlive) {
//                         this.ui_.messages_.push('Game Over!');
//                         this.updateDisplay();
//                         return;
//                     }
//                     continue;
//                 }
                
//                 const enemyTargetCell = room.grid[enemyNewY][enemyNewX];

//                 if(enemyTargetCell === 0) {
//                     enemy.move(movePosition.dx, movePosition.dy);
//                 }
//             }
//         }
//     }

//     updateDisplay() {
//         this.map_.drawRooms();
        
//         // Agar corridor ichida bo'lsa, player belgisini qo'shamiz
//         if(this.isInCorridor_) {
//             this.map_.drawPlayerInCorridor(this.player_.globalX, this.player_.globalY);
//         }
        
//         this.ui_.renderMessage();
//         this.ui_.renderMap(this.map_.grid);
//         this.ui_.renderStats(this.player_);
//     }
// }



// src/domain/services/GameEngine.js

// import { WEAPON_TYPES, Weapon } from "../entities/Weapon.js"
// import { ENEMY_TYPES, Enemy } from "../entities/Enemy.js"
// import { Map } from "../entities/Map.js"
// import { Player } from "../entities/Player.js"
// import { GameUI } from "../../presentation/GameUI.js"

// export class GameEngine {
//     constructor() {
//         this.player_ = null;
//         this.weapons_ = [];
//         this.enems_ = [];
//         this.map_ = null;
//         this.level_ = 1;
//         this.playRoom_ = null;
//         this.isInCorridor_ = false;
//         this.currentCorridor_ = null;

//         this.ui_ = new GameUI();
//     }

//     get player() { return this.player_; }
//     get weapons() { return this.weapons_; }
//     get enems() { return this.enems_; }
//     get map() { return this.map_; }
//     get playRoom() { return this.playRoom_; }
    
//     set playRoom(room) { 
//         if(this.playRoom_ && this.playRoom_ !== room) {
//             this.playRoom_.isVisible = false;
//         }
//         this.playRoom_ = room;
//         if(room) {
//             room.isVisible = true;
//             this.map_.markRoomAsExplored(room);
//         }
//     }

//     startNewGame() {
//         this.level_ = 1;

//         this.generatePlayer();
//         this.generateLevel();
//         this.placeEntities();
//         this.map.createCorridors();
//         this.map.createPortal(); // Portal yaratish
//         this.map.drawRooms();
//         this.ui_.renderMap(this.map_.grid);
//         this.ui_.renderStats(this.player_);
//         this.setupControls();
//     }

//     nextLevel() {
//         this.level_++;
        
//         // Eski ma'lumotlarni tozalash
//         this.isInCorridor_ = false;
//         this.currentCorridor_ = null;
        
//         this.generateLevel();
//         this.placeEntities();
//         this.map.createCorridors();
//         this.map.createPortal();
//         this.map.drawRooms();
        
//         this.ui_.messages_.push(`Level ${this.level_}!`);
//         this.updateDisplay();
//     }

//     generateLevel() {
//         this.generateWeapons();
//         this.generateEnems();
//         this.generateMap();
//     }

//     generateWeapons() {
//         this.weapons_ = [];
//         const weaponCount = this.level_ + Math.floor(Math.random() * 3);
//         const weaponTypes = Object.values(WEAPON_TYPES);

//         for(let i = 0; i < weaponCount; i++) {
//             const randomType = weaponTypes[Math.floor(Math.random() * weaponTypes.length)];
//             const weapon = new Weapon(randomType);
//             this.weapons_.push(weapon);
//         }
//     }

//     generateEnems() {
//         this.enems_ = [];
//         const enemsCount = this.level_ + Math.floor(Math.random() * 2);
//         const enemsTypes = Object.values(ENEMY_TYPES);

//         for(let i = 0; i < enemsCount; i++) {
//             const randomType = enemsTypes[Math.floor(Math.random() * enemsTypes.length)];
//             const enemy = new Enemy(randomType);
//             this.enems_.push(enemy);
//         }
//     }

//     generateMap() {
//         this.map_ = new Map();
//     }
    
//     generatePlayer() {
//         this.player_ = new Player();
//     }

//     placeEntities() {
//         this.placePlayer();
//         this.placeWeapons();
//         this.placeEnems();
//     }

//     placePlayer() {
//         const rooms = this.map_.notViewRooms;
//         const randomIndex = Math.floor(Math.random() * rooms.length);
//         const randomRoom = rooms[randomIndex];
        
//         this.playRoom = randomRoom;
        
//         const availableCells = randomRoom.findAvailableCells();
//         const startPosition = availableCells[Math.floor(Math.random() * availableCells.length)];
        
//         this.player_.x = startPosition.x;
//         this.player_.y = startPosition.y;
        
//         randomRoom.appendEntitiesInRoom(this.player_);
//     }

//     placeWeapons() {
//         while(this.weapons_.length > 0) {
//             const rooms = this.map_.notViewRooms;
//             const availableRooms = rooms.filter(r => r !== this.playRoom_);
            
//             if(availableRooms.length === 0) break;
            
//             const randomRoomsIndex = Math.floor(Math.random() * availableRooms.length);
//             const randomRoom = availableRooms[randomRoomsIndex];

//             const weapon = this.weapons_.pop();

//             const availableCells = randomRoom.findAvailableCells();
//             if(availableCells.length === 0) continue;
            
//             const startPosition = availableCells[Math.floor(Math.random() * availableCells.length)];

//             weapon.x = startPosition.x;
//             weapon.y = startPosition.y;

//             randomRoom.appendEntitiesInRoom(weapon);
//         }
//     }

//     placeEnems() {
//         while(this.enems_.length > 0) {
//             const rooms = this.map_.notViewRooms;
//             const availableRooms = rooms.filter(r => r !== this.playRoom_);
            
//             if(availableRooms.length === 0) break;
            
//             const randomRoomsIndex = Math.floor(Math.random() * availableRooms.length);
//             const randomRoom = availableRooms[randomRoomsIndex];

//             const enemy = this.enems_.pop();

//             const availableCells = randomRoom.findAvailableCells();
//             if(availableCells.length === 0) continue;
            
//             const startPosition = availableCells[Math.floor(Math.random() * availableCells.length)];

//             enemy.x = startPosition.x;
//             enemy.y = startPosition.y;

//             randomRoom.appendEntitiesInRoom(enemy);
//         }
//     }

//     setupControls() {
//         this.ui_.screen.key(['up', 'W', 'w'], () => {
//             this.move(0, -1);
//         });

//         this.ui_.screen.key(['down', 'S', 's'], () => {
//             this.move(0, 1);
//         });

//         this.ui_.screen.key(['left', 'A', 'a'], () => {
//             this.move(-1, 0);
//         });

//         this.ui_.screen.key(['right', 'D', 'd'], () => {
//             this.move(1, 0);
//         });

//         this.ui_.screen.key(['G', 'g'], () => {
//             this.getWeapon();
//         });

//         this.ui_.screen.key(['i', 'I'], () => {
//             this.openInventor();
//         });
//     }

//     openInventor() {
//         const player = this.player_;
//         const playerInventors = player.inventory;
//         for(let i = 0; i < playerInventors.length; i++) {
//             this.ui_.messages_.push(`${i + 1}) ${playerInventors[i].char}`);
//         }

//         this.moveEnemies();
//         this.updateDisplay();
//     }

//     getWeapon() {
//         if(this.isInCorridor_) return;
        
//         const player = this.player_;
//         const room = this.playRoom_;

//         const weapons = room.getWeapons();
//         weapons.forEach(weapon => {
//             const distanceX = Math.abs(player.x - weapon.x);
//             const distanceY = Math.abs(player.y - weapon.y);
//             if((distanceX === 1 && distanceY === 0) || (distanceY === 1 && distanceX === 0)) {
//                 player.inventory.push(weapon);
//                 room.grid[weapon.y][weapon.x] = 0;
//                 this.ui_.messages_.push(`Weapon ${weapon.char} picked up!`);
//             }
//         });
        
//         this.moveEnemies();
//         this.updateDisplay();
//     }

//     checkPortal() {
//         if(this.isInCorridor_) return;
        
//         const player = this.player_;
//         const room = this.playRoom_;
        
//         // Portalni tekshirish
//         const portals = this.map_.portals;
//         for(const portal of portals) {
//             if(portal.room === room) {
//                 const distanceX = Math.abs(player.x - portal.x);
//                 const distanceY = Math.abs(player.y - portal.y);
                
//                 if((distanceX === 1 && distanceY === 0) || (distanceY === 1 && distanceX === 0)) {
//                     this.ui_.messages_.push('Portal found! Press ENTER to next level');
                    
//                     this.ui_.screen.key(['enter'], () => {
//                         this.nextLevel();
//                     });
//                 }
//             }
//         }
//     }

//     move(dx, dy) {
//         if(this.isInCorridor_) {
//             this.moveInCorridor(dx, dy);
//         } else {
//             this.moveInRoom(dx, dy);
//         }
//     }

//     moveInRoom(dx, dy) {
//         const player = this.player_;
//         const room = this.playRoom_;

//         const newX = player.x + dx;
//         const newY = player.y + dy;

//         if(newX < 0 || newX >= room.width || newY < 0 || newY >= room.height) {
//             return;
//         }

//         const targetCell = room.grid[newY][newX];

//         if(targetCell === '+') {
//             // Corridorga kirish
//             const globalX = room.mapX + newX;
//             const globalY = room.mapY + newY;
            
//             const corridor = this.map_.corridors_.find(c => {
//                 return (c.room1 === room && c.x1 === globalX && c.y1 === globalY) ||
//                        (c.room2 === room && c.x2 === globalX && c.y2 === globalY);
//             });
            
//             if(corridor) {
//                 // Xonadan o'chirish
//                 room.grid[player.y][player.x] = 0;
                
//                 this.isInCorridor_ = true;
//                 this.currentCorridor_ = corridor;
                
//                 // Corridor ichiga kirish
//                 if(corridor.direction === 'horizontal') {
//                     // Gorizontal corridor - chapdan/o'ngdan kirish
//                     if(corridor.room1 === room) {
//                         player.globalX = corridor.x1 + 1;
//                         player.globalY = corridor.y1;
//                     } else {
//                         player.globalX = corridor.x2 - 1;
//                         player.globalY = corridor.y1;
//                     }
//                 } else {
//                     // Vertikal corridor - tepadan/pastdan kirish
//                     if(corridor.room1 === room) {
//                         player.globalX = corridor.x1;
//                         player.globalY = corridor.y1 + 1;
//                     } else {
//                         player.globalX = corridor.x1;
//                         player.globalY = corridor.y2 - 1;
//                     }
//                 }
                
//                 this.map_.markTileAsExplored(player.globalX, player.globalY);
//                 this.ui_.messages_.push('Entered corridor');
//                 this.updateDisplay();
//             }
//         }
//         else if(targetCell === 0) {
//             player.move(dx, dy);
//             this.checkPortal(); // Portal yonidami?
//             this.moveEnemies();
//             this.updateDisplay();
//         } 
//         else if(targetCell instanceof Enemy) {
//             const damage = player.attack();
//             const isEnemyAlive = targetCell.takeDamage(damage);
//             this.ui_.messages_.push(`You hit ${targetCell.type} dmg ${damage}`);
//             if(!isEnemyAlive) {
//                 room.grid[newY][newX] = 0;
//                 this.ui_.messages_.push(`Defeated ${targetCell.type}`);
//                 player.gainExperience(5);
//             }
//             this.moveEnemies();
//             this.updateDisplay();
//         }
//     }

//     moveInCorridor(dx, dy) {
//         const player = this.player_;
//         const corridor = this.currentCorridor_;
        
//         const newGlobalX = player.globalX + dx;
//         const newGlobalY = player.globalY + dy;
        
//         // Corridor yo'nalishiga qarab tekshirish
//         let canMove = false;
//         let reachedRoom = null;
        
//         if(corridor.direction === 'horizontal') {
//             // Faqat chapga/o'ngga
//             if(dy !== 0) return;
            
//             // Chegaralarni tekshirish
//             if(newGlobalX === corridor.x1 && newGlobalY === corridor.y1) {
//                 reachedRoom = corridor.room1;
//             } else if(newGlobalX === corridor.x2 && newGlobalY === corridor.y1) {
//                 reachedRoom = corridor.room2;
//             } else if(newGlobalX > corridor.x1 && newGlobalX < corridor.x2 && newGlobalY === corridor.y1) {
//                 canMove = true;
//             }
//         } else {
//             // Faqat tepaga/pastga
//             if(dx !== 0) return;
            
//             if(newGlobalX === corridor.x1 && newGlobalY === corridor.y1) {
//                 reachedRoom = corridor.room1;
//             } else if(newGlobalX === corridor.x1 && newGlobalY === corridor.y2) {
//                 reachedRoom = corridor.room2;
//             } else if(newGlobalY > corridor.y1 && newGlobalY < corridor.y2 && newGlobalX === corridor.x1) {
//                 canMove = true;
//             }
//         }
        
//         if(reachedRoom) {
//             // Xonaga kirish
//             this.isInCorridor_ = false;
//             this.currentCorridor_ = null;
//             this.playRoom = reachedRoom;
            
//             const entryPoint = reachedRoom.findCorridorEntry(null);
//             player.x = entryPoint.x;
//             player.y = entryPoint.y;
//             reachedRoom.appendEntitiesInRoom(player);
            
//             this.ui_.messages_.push('Entered room');
//             this.updateDisplay();
//         } else if(canMove) {
//             // Corridor ichida harakat
//             player.globalX = newGlobalX;
//             player.globalY = newGlobalY;
//             this.map_.markTileAsExplored(newGlobalX, newGlobalY);
//             this.updateDisplay();
//         }
//     }

//     moveEnemies() {
//         if(this.isInCorridor_) return;
        
//         const room = this.playRoom_;
//         const player = this.player_;
//         const enems = room.getEnems();

//         if(enems.length > 0) {
//             for(let i = 0; i < enems.length; i++) {
//                 const enemy = enems[i];
//                 const movePosition = enemy.calculateMove(player.x, player.y);
                
//                 const enemyNewX = enemy.x + movePosition.dx;
//                 const enemyNewY = enemy.y + movePosition.dy;

//                 if(enemyNewY >= room.height || enemyNewX >= room.width ||
//                    enemyNewY < 0 || enemyNewX < 0) {
//                     continue;
//                 }

//                 const distanceX = Math.abs(player.x - enemy.x);
//                 const distanceY = Math.abs(player.y - enemy.y);
                
//                 if((distanceX === 1 && distanceY === 0) || (distanceY === 1 && distanceX === 0)) {
//                     const enemyDamage = enemy.attack();
//                     const isPlayerAlive = player.takeDamage(enemyDamage);
//                     this.ui_.messages_.push(`${enemy.type} hits you! -${enemyDamage}HP`);
//                     if(!isPlayerAlive) {
//                         this.ui_.messages_.push('Game Over!');
//                         this.updateDisplay();
//                         setTimeout(() => process.exit(0), 3000);
//                         return;
//                     }
//                     continue;
//                 }
                
//                 const enemyTargetCell = room.grid[enemyNewY][enemyNewX];

//                 if(enemyTargetCell === 0) {
//                     enemy.move(movePosition.dx, movePosition.dy);
//                 }
//             }
//         }
//     }

//     updateDisplay() {
//         this.map_.drawRooms();
        
//         if(this.isInCorridor_) {
//             this.map_.drawPlayerInCorridor(this.player_.globalX, this.player_.globalY);
//         }
        
//         this.ui_.renderMessage();
//         this.ui_.renderMap(this.map_.grid);
//         this.ui_.renderStats(this.player_);
//     }
// }


// src/domain/services/GameEngine.js

import { WEAPON_TYPES, Weapon } from "../entities/Weapon.js"
import { ENEMY_TYPES, Enemy } from "../entities/Enemy.js"
import { Map } from "../entities/Map.js"
import { Player } from "../entities/Player.js"
import { GameUI } from "../../presentation/GameUI.js"

export class GameEngine {
    constructor() {
        this.player_ = null;
        this.weapons_ = [];
        this.enems_ = [];
        this.map_ = null;
        this.level_ = 1;
        this.playRoom_ = null;
        this.isInCorridor_ = false;
        this.currentCorridor_ = null;

        this.ui_ = new GameUI();
    }

    get player() { return this.player_; }
    get weapons() { return this.weapons_; }
    get enems() { return this.enems_; }
    get map() { return this.map_; }
    get playRoom() { return this.playRoom_; }
    
    set playRoom(room) { 
        if(this.playRoom_ && this.playRoom_ !== room) {
            this.playRoom_.isVisible = false;
        }
        this.playRoom_ = room;
        if(room) {
            room.isVisible = true;
            this.map_.markRoomAsExplored(room);
        }
    }

    startNewGame() {
        this.level_ = 1;

        this.generatePlayer();
        this.generateLevel();
        this.placeEntities();
        this.map.createCorridors();
        this.map.createPortal(); // Portal yaratish
        this.map.drawRooms();
        this.ui_.renderMap(this.map_.grid);
        this.ui_.renderStats(this.player_);
        this.setupControls();
    }

    nextLevel() {
        this.level_++;
        
        // Eski ma'lumotlarni tozalash
        this.isInCorridor_ = false;
        this.currentCorridor_ = null;
        
        this.generateLevel();
        this.placeEntities();
        this.map.createCorridors();
        this.map.createPortal();
        this.map.drawRooms();
        
        this.ui_.messages_.push(`Level ${this.level_}!`);
        this.updateDisplay();
    }

    generateLevel() {
        this.generateWeapons();
        this.generateEnems();
        this.generateMap();
    }

    generateWeapons() {
        this.weapons_ = [];
        const weaponCount = this.level_ + Math.floor(Math.random() * 3);
        const weaponTypes = Object.values(WEAPON_TYPES);

        for(let i = 0; i < weaponCount; i++) {
            const randomType = weaponTypes[Math.floor(Math.random() * weaponTypes.length)];
            const weapon = new Weapon(randomType);
            this.weapons_.push(weapon);
        }
    }

    generateEnems() {
        this.enems_ = [];
        const enemsCount = this.level_ + Math.floor(Math.random() * 2);
        const enemsTypes = Object.values(ENEMY_TYPES);

        for(let i = 0; i < enemsCount; i++) {
            const randomType = enemsTypes[Math.floor(Math.random() * enemsTypes.length)];
            const enemy = new Enemy(randomType);
            this.enems_.push(enemy);
        }
    }

    generateMap() {
        this.map_ = new Map();
    }
    
    generatePlayer() {
        this.player_ = new Player();
    }

    placeEntities() {
        this.placePlayer();
        this.placeWeapons();
        this.placeEnems();
    }

    placePlayer() {
        const rooms = this.map_.notViewRooms;
        const randomIndex = Math.floor(Math.random() * rooms.length);
        const randomRoom = rooms[randomIndex];
        
        this.playRoom = randomRoom;
        
        const availableCells = randomRoom.findAvailableCells();
        const startPosition = availableCells[Math.floor(Math.random() * availableCells.length)];
        
        this.player_.x = startPosition.x;
        this.player_.y = startPosition.y;
        
        randomRoom.appendEntitiesInRoom(this.player_);
    }

    placeWeapons() {
        while(this.weapons_.length > 0) {
            const rooms = this.map_.notViewRooms;
            const availableRooms = rooms.filter(r => r !== this.playRoom_);
            
            if(availableRooms.length === 0) break;
            
            const randomRoomsIndex = Math.floor(Math.random() * availableRooms.length);
            const randomRoom = availableRooms[randomRoomsIndex];

            const weapon = this.weapons_.pop();

            const availableCells = randomRoom.findAvailableCells();
            if(availableCells.length === 0) continue;
            
            const startPosition = availableCells[Math.floor(Math.random() * availableCells.length)];

            weapon.x = startPosition.x;
            weapon.y = startPosition.y;

            randomRoom.appendEntitiesInRoom(weapon);
        }
    }

    placeEnems() {
        while(this.enems_.length > 0) {
            const rooms = this.map_.notViewRooms;
            const availableRooms = rooms.filter(r => r !== this.playRoom_);
            
            if(availableRooms.length === 0) break;
            
            const randomRoomsIndex = Math.floor(Math.random() * availableRooms.length);
            const randomRoom = availableRooms[randomRoomsIndex];

            const enemy = this.enems_.pop();

            const availableCells = randomRoom.findAvailableCells();
            if(availableCells.length === 0) continue;
            
            const startPosition = availableCells[Math.floor(Math.random() * availableCells.length)];

            enemy.x = startPosition.x;
            enemy.y = startPosition.y;

            randomRoom.appendEntitiesInRoom(enemy);
        }
    }

    setupControls() {
        this.ui_.screen.key(['up', 'W', 'w'], () => {
            this.move(0, -1);
        });

        this.ui_.screen.key(['down', 'S', 's'], () => {
            this.move(0, 1);
        });

        this.ui_.screen.key(['left', 'A', 'a'], () => {
            this.move(-1, 0);
        });

        this.ui_.screen.key(['right', 'D', 'd'], () => {
            this.move(1, 0);
        });

        this.ui_.screen.key(['G', 'g'], () => {
            this.getWeapon();
        });

        this.ui_.screen.key(['i', 'I'], () => {
            this.openInventor();
        });
    }

    openInventor() {
        const player = this.player_;
        const playerInventors = player.inventory;
        for(let i = 0; i < playerInventors.length; i++) {
            this.ui_.messages_.push(`${i + 1}) ${playerInventors[i].char}`);
        }

        this.moveEnemies();
        this.updateDisplay();
    }

    getWeapon() {
        if(this.isInCorridor_) return;
        
        const player = this.player_;
        const room = this.playRoom_;

        const weapons = room.getWeapons();
        weapons.forEach(weapon => {
            const distanceX = Math.abs(player.x - weapon.x);
            const distanceY = Math.abs(player.y - weapon.y);
            if((distanceX === 1 && distanceY === 0) || (distanceY === 1 && distanceX === 0)) {
                player.inventory.push(weapon);
                room.grid[weapon.y][weapon.x] = 0;
                this.ui_.messages_.push(`Weapon ${weapon.char} picked up!`);
            }
        });
        
        this.moveEnemies();
        this.updateDisplay();
    }

    checkPortal() {
        if(this.isInCorridor_) return;
        
        const player = this.player_;
        const room = this.playRoom_;
        
        // Portalni tekshirish
        const portals = this.map_.portals;
        for(const portal of portals) {
            if(portal.room === room) {
                const distanceX = Math.abs(player.x - portal.x);
                const distanceY = Math.abs(player.y - portal.y);
                
                if((distanceX === 1 && distanceY === 0) || (distanceY === 1 && distanceX === 0)) {
                    this.ui_.messages_.push('Portal found! Press ENTER to next level');
                    
                    this.ui_.screen.key(['enter'], () => {
                        this.nextLevel();
                    });
                }
            }
        }
    }

    move(dx, dy) {
        if(this.isInCorridor_) {
            this.moveInCorridor(dx, dy);
        } else {
            this.moveInRoom(dx, dy);
        }
    }

    moveInRoom(dx, dy) {
        const player = this.player_;
        const room = this.playRoom_;

        const newX = player.x + dx;
        const newY = player.y + dy;

        if(newX < 0 || newX >= room.width || newY < 0 || newY >= room.height) {
            return;
        }

        const targetCell = room.grid[newY][newX];

        if(targetCell === '+') {
            // Corridorga kirish
            const globalX = room.mapX + newX;
            const globalY = room.mapY + newY;
            
            const corridor = this.map_.corridors_.find(c => {
                return (c.room1 === room && c.x1 === globalX && c.y1 === globalY) ||
                       (c.room2 === room && c.x2 === globalX && c.y2 === globalY);
            });
            
            if(corridor) {
                // Corridor ishlatilganmi tekshirish
                if(corridor.used) {
                    this.ui_.messages_.push('This corridor is blocked!');
                    this.updateDisplay();
                    return;
                }
                
                // Corridorni ishlatilgan deb belgilash
                corridor.used = true;
                
                // Xonadan o'chirish
                room.grid[player.y][player.x] = 0;
                
                this.isInCorridor_ = true;
                this.currentCorridor_ = corridor;
                
                // Corridor ichiga kirish
                if(corridor.direction === 'horizontal') {
                    // Gorizontal corridor - chapdan/o'ngdan kirish
                    if(corridor.room1 === room) {
                        player.globalX = corridor.x1 + 1;
                        player.globalY = corridor.y1;
                    } else {
                        player.globalX = corridor.x2 - 1;
                        player.globalY = corridor.y1;
                    }
                } else {
                    // Vertikal corridor - tepadan/pastdan kirish
                    if(corridor.room1 === room) {
                        player.globalX = corridor.x1;
                        player.globalY = corridor.y1 + 1;
                    } else {
                        player.globalX = corridor.x1;
                        player.globalY = corridor.y2 - 1;
                    }
                }
                
                this.map_.markTileAsExplored(player.globalX, player.globalY);
                this.ui_.messages_.push('Entered corridor');
                this.updateDisplay();
            }
        }
        else if(targetCell === 0) {
            player.move(dx, dy);
            this.checkPortal(); // Portal yonidami?
            this.moveEnemies();
            this.updateDisplay();
        } 
        else if(targetCell instanceof Enemy) {
            const damage = player.attack();
            const isEnemyAlive = targetCell.takeDamage(damage);
            this.ui_.messages_.push(`You hit ${targetCell.type} dmg ${damage}`);
            if(!isEnemyAlive) {
                room.grid[newY][newX] = 0;
                this.ui_.messages_.push(`Defeated ${targetCell.type}`);
                player.gainExperience(5);
            }
            this.moveEnemies();
            this.updateDisplay();
        }
    }

    moveInCorridor(dx, dy) {
        const player = this.player_;
        const corridor = this.currentCorridor_;
        
        const newGlobalX = player.globalX + dx;
        const newGlobalY = player.globalY + dy;
        
        // Corridor yo'nalishiga qarab tekshirish
        let canMove = false;
        let reachedRoom = null;
        
        if(corridor.direction === 'horizontal') {
            // Faqat chapga/o'ngga
            if(dy !== 0) return;
            
            // Chegaralarni tekshirish
            if(newGlobalX === corridor.x1 && newGlobalY === corridor.y1) {
                reachedRoom = corridor.room1;
            } else if(newGlobalX === corridor.x2 && newGlobalY === corridor.y1) {
                reachedRoom = corridor.room2;
            } else if(newGlobalX > corridor.x1 && newGlobalX < corridor.x2 && newGlobalY === corridor.y1) {
                canMove = true;
            }
        } else {
            // Faqat tepaga/pastga
            if(dx !== 0) return;
            
            if(newGlobalX === corridor.x1 && newGlobalY === corridor.y1) {
                reachedRoom = corridor.room1;
            } else if(newGlobalX === corridor.x1 && newGlobalY === corridor.y2) {
                reachedRoom = corridor.room2;
            } else if(newGlobalY > corridor.y1 && newGlobalY < corridor.y2 && newGlobalX === corridor.x1) {
                canMove = true;
            }
        }
        
        if(reachedRoom) {
            // Xonaga kirish - corridor entry pointiga
            this.isInCorridor_ = false;
            this.currentCorridor_ = null;
            this.playRoom = reachedRoom;
            
            // Corridor entry pointini topish
            let entryPoint;
            if(reachedRoom === corridor.room1) {
                entryPoint = corridor.room1EntryLocal;
            } else {
                entryPoint = corridor.room2EntryLocal;
            }
            
            // Corridor yonidagi bo'sh joyni topish
            const neighbors = [
                {x: entryPoint.x, y: entryPoint.y - 1},     // tepada
                {x: entryPoint.x, y: entryPoint.y + 1},     // pastda
                {x: entryPoint.x - 1, y: entryPoint.y},     // chapda
                {x: entryPoint.x + 1, y: entryPoint.y}      // o'ngda
            ];
            
            let spawnPoint = null;
            for(const pos of neighbors) {
                if(pos.x >= 0 && pos.x < reachedRoom.width && 
                   pos.y >= 0 && pos.y < reachedRoom.height &&
                   reachedRoom.grid[pos.y][pos.x] === 0) {
                    spawnPoint = pos;
                    break;
                }
            }
            
            // Agar bo'sh joy topilmasa, birinchi bo'sh joyni olamiz
            if(!spawnPoint) {
                const available = reachedRoom.findAvailableCells();
                spawnPoint = available.length > 0 ? available[0] : {x: 1, y: 1};
            }
            
            player.x = spawnPoint.x;
            player.y = spawnPoint.y;
            reachedRoom.appendEntitiesInRoom(player);
            
            this.ui_.messages_.push('Entered room');
            this.updateDisplay();
        } else if(canMove) {
            // Corridor ichida harakat
            player.globalX = newGlobalX;
            player.globalY = newGlobalY;
            this.map_.markTileAsExplored(newGlobalX, newGlobalY);
            this.updateDisplay();
        }
    }

    moveEnemies() {
        if(this.isInCorridor_) return;
        
        const room = this.playRoom_;
        const player = this.player_;
        const enems = room.getEnems();

        if(enems.length > 0) {
            for(let i = 0; i < enems.length; i++) {
                const enemy = enems[i];
                const movePosition = enemy.calculateMove(player.x, player.y);
                
                const enemyNewX = enemy.x + movePosition.dx;
                const enemyNewY = enemy.y + movePosition.dy;

                if(enemyNewY >= room.height || enemyNewX >= room.width ||
                   enemyNewY < 0 || enemyNewX < 0) {
                    continue;
                }

                const distanceX = Math.abs(player.x - enemy.x);
                const distanceY = Math.abs(player.y - enemy.y);
                
                if((distanceX === 1 && distanceY === 0) || (distanceY === 1 && distanceX === 0)) {
                    const enemyDamage = enemy.attack();
                    const isPlayerAlive = player.takeDamage(enemyDamage);
                    this.ui_.messages_.push(`${enemy.type} hits you! -${enemyDamage}HP`);
                    if(!isPlayerAlive) {
                        this.ui_.messages_.push('Game Over!');
                        this.updateDisplay();
                        setTimeout(() => process.exit(0), 3000);
                        return;
                    }
                    continue;
                }
                
                const enemyTargetCell = room.grid[enemyNewY][enemyNewX];

                if(enemyTargetCell === 0) {
                    enemy.move(movePosition.dx, movePosition.dy);
                }
            }
        }
    }

    updateDisplay() {
        this.map_.drawRooms();
        
        if(this.isInCorridor_) {
            this.map_.drawPlayerInCorridor(this.player_.globalX, this.player_.globalY);
        }
        
        this.ui_.renderMessage();
        this.ui_.renderMap(this.map_.grid);
        this.ui_.renderStats(this.player_);
    }
}