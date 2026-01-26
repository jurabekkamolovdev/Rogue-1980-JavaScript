// src/domain/services/GameEngine.js


import { WEAPON_TYPES, Weapon } from "../entities/Weapon.js"
import { ENEMY_TYPES, Enemy } from "../entities/Enemy.js"
import { Map } from "../entities/Map.js"
import { Player } from "../entities/Player.js"
import { GameUI } from "../../presentation/GameUI.js"
import { Corridor } from "../entities/Corridor.js"
export class GameEngine {
    constructor() {
        this.player_ = null;
        this.weapons_ = [];
        this.enems_ = [];
        this.map_ = null;
        this.level_ = 1;
        this.playRoom_ = null;

        this.ui_ = new GameUI();
    }

    get player() { return this.player_; }
    get weapons() { return this.weapons_; }
    get enems() { return this.enems_; }
    get map() { return this.map_; }
    get playRoom() { return this.playRoom_; }
    set playRoom(room) { this.playRoom_ = room; }

    startNewGame() {
        this.level_ = 1;

        this.generatePlayer();
        this.generateLevel();
        this.placeEntities();
        this.map.drawRooms();
        this.ui_.renderMap(this.map_.grid);
        this.ui_.renderStats(this.player_);
        this.setupControls();
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
        const rooms = this.map_.rooms;
        
        const randomIndex = Math.floor(Math.random() * rooms.length);
        const randomRoom = rooms[randomIndex];
        this.playRoom_ = randomRoom;
        
        const availableCells = randomRoom.findAvailableCells();
        const startPosition = availableCells[Math.floor(Math.random() * availableCells.length)];
        
        this.player_.x = startPosition.x;
        this.player_.y = startPosition.y;
        
        randomRoom.appendEntitiesInRoom(this.player_);
        randomRoom.isVisible = true;
    }

    placeWeapons() {
        while(this.weapons_.length > 0) {
            const rooms = this.map_.rooms.filter(r => this.playRoom_ !== r);
            const randomRoomsIndex = Math.floor(Math.random() * rooms.length);
            const randomRoom = rooms[randomRoomsIndex];

            const weapon = this.weapons_.pop();

            const availableCells = randomRoom.findAvailableCells();
            const startPosition = availableCells[Math.floor(Math.random() * availableCells.length)];

            weapon.x = startPosition.x;
            weapon.y = startPosition.y;

            randomRoom.appendEntitiesInRoom(weapon);
        }
    }

    placeEnems() {
        while(this.enems_.length > 0) {
            const rooms = this.map_.rooms.filter(r => this.playRoom_ !== r);
            const randomRoomsIndex = Math.floor(Math.random() * rooms.length);
            const randomRoom = rooms[randomRoomsIndex];

            const enemy = this.enems_.pop();

            const availableCells = randomRoom.findAvailableCells();
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

        this.ui_.screen.key(['G', 'g'] , () => {
            this.getWeapon();
        })

        this.ui_.screen.key(['i', 'I'], () => {
            this.openInventor();
        })
    }

    openInventor() {
        const player = this.player_;
        const playerInventors = player.inventory;
        for(let i = 0; i < playerInventors.length; i++) {
            this.ui_.messages_.push(`${i + 1}) ${playerInventors[i].char}`);
        }

        this.moveEnemies();
        this.map_.drawRooms();
        this.ui_.renderMessage();
        this.ui_.renderMap(this.map_.grid);
        this.ui_.renderStats(player);
    }

    getWeapon() {
        const player = this.player_;
        const room = this.playRoom_;

        const weapons = room.getWeapons();
        weapons.forEach(weapon => {
            const distanceX = Math.abs(player.x - weapon.x);
            const distanceY = Math.abs(player.y - weapon.y);
            if((distanceX === 1 && distanceY === 0) || (distanceY === 1 && distanceX === 0)) {
                // player.equippedWeapon = weapon;
                player.inventory.push(weapon);
                room.grid[weapon.y][weapon.x] = 0;
                this.ui_.messages_.push(`Weapon ${weapon.char} equipped!`);
            }
        });
        
        this.moveEnemies();
        this.map_.drawRooms();
        this.ui_.renderMessage();
        this.ui_.renderMap(this.map_.grid);
        this.ui_.renderStats(player);
    }

    // move(dx, dy) {
    //     const player = this.player_;
    //     const room = this.playRoom_;

    //     const newX = player.x + dx;
    //     const newY = player.y + dy;
    //     let targetCell;
    //     if(player.inCorridor === null) {
    //         targetCell = room.grid[newY][newX];
    //     }

    //     if(targetCell instanceof Corridor) {
    //         player.inCorridor = targetCell;
    //         this.playRoom_.grid[player.y][player.x] = 0;
    //         if(player.inCorridor.leftRoom.room !== this.playRoom_) {
    //             player.x = player.inCorridor.corridor[player.inCorridor.left].mapX;
    //             player.y = player.inCorridor.corridor[player.inCorridor.left].mapY;
    //             if(newX === 0) {
    //                 this.map_.grid[player.inCorridor.corridor[player.inCorridor.left].mapY][player.inCorridor.corridor[player.inCorridor.left].mapX - 1] = '#'
    //             } else if(newY === 0) {
    //                 this.map_.grid[player.inCorridor.corridor[player.inCorridor.left].mapY - 1][player.inCorridor.corridor[player.inCorridor.left].mapX] = '#' 
    //             }
                
    //         } else {
    //             player.x = player.inCorridor.corridor[player.inCorridor.right].mapX;
    //             player.y = player.inCorridor.corridor[player.inCorridor.right].mapY;

    //             if(newX === room.width - 1) {
    //                 this.map_.grid[player.inCorridor.corridor[player.inCorridor.right].mapY][player.inCorridor.corridor[player.inCorridor.right].mapX + 1] = '#'
    //             } else if(newY === room.height - 1) {
    //                 this.map_.grid[player.inCorridor.corridor[player.inCorridor.right].mapY + 1][player.inCorridor.corridor[player.inCorridor.right].mapX] = '#' 
    //             }
    //         }

    //         this.map_.grid[player.y][player.x] = '@';
    //                 this.moveEnemies();
    //     this.map_.drawRooms();
    //     this.ui_.renderMessage();
    //     this.ui_.renderMap(this.map_.grid);
    //     this.ui_.renderStats(player);
    //     return;
    //     }

    //     if(targetCell === 0) {
    //         player.move(dx, dy); 
    //     } else if(targetCell instanceof Enemy) {
    //         const damage = player.attack();
    //         const isEnemyAlive = targetCell.takeDamage(damage);
    //         this.ui_.messages_.push(`You hit the ${targetCell.type} damage ${damage}`);
    //         if(!isEnemyAlive) {
    //             room.grid[newY][newX] = 0;
    //             this.ui_.messages_.push(`You defeated the ${targetCell.type}`);
    //         }
    //     } else if(player.inCorridor) {
    //         if(player.inCorridor.leftRoom.room !== this.playRoom_) {

    //             this.playRoom_ = player.inCorridor.leftRoom.room;

    //             player.x = player.inCorridor.leftRoom.mapX;
    //             player.y = player.inCorridor.leftRoom.mapY;
    //         } else {
    //             this.playRoom_ = player.inCorridor.rightRoom.room;
    //             player.x = player.inCorridor.rightRoom.mapX;
    //             player.y = player.inCorridor.rightRoom.mapY;
                
    //         }

    //         for(let i = 0; i < player.inCorridor.corridor.length; i++) {
    //             this.map.grid[player.inCorridor.corridor[i].mapY][player.inCorridor.corridor[i].mapX] = "*";
    //         }

    //         this.playRoom_.isVisible = true;
    //         this.playRoom_.grid[player.y][player.x] = player;
    //         player.inCorridor = null;
    //     }
    //     this.moveEnemies();
    //     this.map_.drawRooms();
    //     this.ui_.renderMessage();
    //     this.ui_.renderMap(this.map_.grid);
    //     this.ui_.renderStats(player);
    // }
// GameEngine.js - move() funksiyasining yangilangan versiyasi

    move(dx, dy) {
        const player = this.player_;
        const newX = player.x + dx;
        const newY = player.y + dy;

        // ===== CASE 1: Player corridorda =====
        if (player.inCorridor !== null) {
            this.handleCorridorMovement(newX, newY);
            return;
        }

        // ===== CASE 2: Player xonada =====
        const room = this.playRoom_;
        
        // Chegaralarni tekshirish
        if (newY < 0 || newY >= room.height || newX < 0 || newX >= room.width) {
            this.updateGameState();
            return;
        }
        
        const targetCell = room.grid[newY][newX];

        // 2a: Corridorga kirish
        if (targetCell instanceof Corridor) {
            this.enterCorridor(targetCell);
            return;
        }

        // 2b: Bo'sh joyga harakat
        if (targetCell === 0) {
            room.grid[player.y][player.x] = 0;
            player.move(dx, dy);
            room.grid[player.y][player.x] = player;
        } 
        // 2c: Dushman bilan jang
        else if (targetCell instanceof Enemy) {
            this.attackEnemy(targetCell, newX, newY);
        }

        this.updateGameState();
    }

    /**
     * Corridorga kirish jarayoni
     */
    enterCorridor(corridor) {
        const player = this.player_;
        const room = this.playRoom_;

        // Player corridorga kirdi
        player.inCorridor = corridor;
        
        // Xonadan playerni o'chirish
        room.grid[player.y][player.x] = 0;

        // Qaysi tarafdan kirganini aniqlash
        const info = corridor.getEntryExitForRoom(room);
        
        if (!info) {
            console.error("Corridor entry not found for room!");
            return;
        }

        // Path'ning birinchi nuqtasiga o'tkazish
        const firstPathPoint = corridor.path[0];
        
        // Entry qaysi tarafda ekanligini tekshirish
        if (info.entryIndex === 0) {
            // Entry1 tarafidan kirmoqda
            player.x = firstPathPoint.mapX;
            player.y = firstPathPoint.mapY;
        } else {
            // Entry2 tarafidan kirmoqda (path oxiridan)
            const lastPathPoint = corridor.path[corridor.path.length - 1];
            player.x = lastPathPoint.mapX;
            player.y = lastPathPoint.mapY;
        }
        
        // Player pozitsiyasini corridorda ko'rsatish
        this.map_.grid[player.y][player.x] = '@';

        this.ui_.messages_.push(`You enter the corridor`);
        this.updateGameState();
    }

    /**
     * Corridor ichida harakat
     */
    handleCorridorMovement(newX, newY) {
        const player = this.player_;
        const corridor = player.inCorridor;
        
        // Hozirgi pozitsiya
        const currentIndex = corridor.getPathIndex(player.x, player.y);
        
        if (currentIndex === -1) {
            console.error("Player not found in corridor path!");
            return;
        }

        // Keyingi pozitsiyani hisoblash
        const nextIndex = this.calculateNextCorridorIndex(currentIndex, newX, newY, corridor);
        
        if (nextIndex === -1) {
            // Xonaga qaytish yoki noto'g'ri harakat
            const canExit = this.tryExitCorridor(currentIndex);
            if (!canExit) {
                this.ui_.messages_.push(`Can't move that way`);
                this.updateGameState();
            }
            return;
        }

        // Eski joyni tiklash (# bilan)
        this.map_.grid[player.y][player.x] = '#';
        
        // Yangi joyga o'tish
        const nextPoint = corridor.path[nextIndex];
        player.x = nextPoint.mapX;
        player.y = nextPoint.mapY;
        
        this.map_.grid[player.y][player.x] = '@';
        
        this.updateGameState();
    }

    /**
     * Keyingi corridor indeksini hisoblash
     */
    calculateNextCorridorIndex(currentIndex, targetMapX, targetMapY, corridor) {
        // Oldinga va orqaga qarab tekshirish
        const nextIndex = currentIndex + 1;
        const prevIndex = currentIndex - 1;
        
        if (nextIndex < corridor.path.length) {
            const next = corridor.path[nextIndex];
            if (next.mapX === targetMapX && next.mapY === targetMapY) {
                return nextIndex;
            }
        }
        
        if (prevIndex >= 0) {
            const prev = corridor.path[prevIndex];
            if (prev.mapX === targetMapX && prev.mapY === targetMapY) {
                return prevIndex;
            }
        }
        
        return -1; // Noto'g'ri harakat
    }

    /**
     * Corridordan chiqishga harakat qilish
     */
    tryExitCorridor(currentIndex) {
        const player = this.player_;
        const corridor = player.inCorridor;
        
        // Path oxirida yoki boshidami?
        if (currentIndex === 0) {
            // Entry1 ga chiqish
            this.exitCorridorToRoom(corridor.entry1);
            return true;
        } else if (currentIndex === corridor.path.length - 1) {
            // Entry2 ga chiqish
            this.exitCorridorToRoom(corridor.entry2);
            return true;
        }
        
        return false;
    }

    /**
     * Corridordan xonaga chiqish
     */
    exitCorridorToRoom(entry) {
        const player = this.player_;
        
        // Eski corridorni tiklash
        this.map_.grid[player.y][player.x] = '#';
        
        // Yangi xonaga o'tish
        this.playRoom_ = entry.room;
        player.x = entry.roomX;
        player.y = entry.roomY;
        player.inCorridor = null;
        
        // Xonani ko'rinadigan qilish
        this.playRoom_.isVisible = true;
        this.playRoom_.grid[player.y][player.x] = player;
        
        this.ui_.messages_.push(`You enter a new room`);
        this.updateGameState();
    }

    /**
     * Dushmanga hujum
     */
    attackEnemy(enemy, newX, newY) {
        const player = this.player_;
        const room = this.playRoom_;
        
        const damage = player.attack();
        const isEnemyAlive = enemy.takeDamage(damage);
        
        this.ui_.messages_.push(`You hit the ${enemy.type} for ${damage} damage`);
        
        if (!isEnemyAlive) {
            room.grid[newY][newX] = 0;
            this.ui_.messages_.push(`You defeated the ${enemy.type}!`);
            player.gainExperience(enemy.experienceValue || 5);
        }
        
        this.updateGameState();
    }

    /**
     * O'yin holatini yangilash
     */
    updateGameState() {
        this.moveEnemies();
        this.map_.drawRooms();
        this.ui_.renderMessage();
        this.ui_.renderMap(this.map_.grid);
        this.ui_.renderStats(this.player_);
    }

    moveEnemies() {
        const room = this.playRoom_;
        const player = this.player_;
        const enems = room.getEnems();

        if(enems.length > 0) {
            for(let i = 0; i < enems.length; i++) {
                const enemy = enems[i];
                const movePosition = enemy.calculateMove(player.x, player.y);
                
                const enemyNewX = enemy.x + movePosition.dx;
                const enemyNewY = enemy.y + movePosition.dy;

                if(enemyNewY >= room.height || 
                    enemyNewX >= room.width) {
                    continue;
                }

                const distanceX = Math.abs(player.x - enemy.x);
                const distanceY = Math.abs(player.y - enemy.y);
                
                if((distanceX === 1 && distanceY === 0) || (distanceY === 1 && distanceX === 0)){
                        const enemyDamage = enemy.attack();
                        const isPlayerAlive = player.takeDamage(enemyDamage);
                        this.ui_.messages_.push(`The ${enemy.type} hits you!`);
                        // this.ui_.renderMessage(`The ${enemy.type} hits you!`);
                        if(!isPlayerAlive) {
                            this.ui_.renderMessage('Game Over! You died.');
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
}