// src/domain/services/GameEngine.js

import { WEAPON_TYPES, Weapon } from "../entities/Weapon.js"
import { ENEMY_TYPES, Enemy } from "../entities/Enemy.js"
import { Map } from "../entities/Map.js"
import { Player } from "../entities/Player.js"
import { Portal } from "../entities/Portal.js"
import { GameUI } from "../../presentation/GameUI.js"
import { Corridor } from "../entities/Corridor.js"

export class GameEngine {
    constructor() {
        this.player_ = null;
        this.weapons_ = [];
        this.enems_ = [];
        this.portal_ = null;
        this.map_ = null;
        this.level_ = 1;
        this.playRoom_ = null;

        this.ui_ = new GameUI();
    }

    get player() { return this.player_; }
    get weapons() { return this.weapons_; }
    get enems() { return this.enems_; }
    get portal() { return this.portal_; }
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
        this.generatePortal();
        this.generateMap();
    }

    nextLevel() {
        this.level_++;
        
        // Playerning health va strengthini biroz tiklash
        const healAmount = Math.floor(this.player_.maxHealth / 3);
        this.player_.health = Math.min(
            this.player_.maxHealth,
            this.player_.health + healAmount
        );
        
        this.ui_.messages_.push(`=== LEVEL ${this.level_} ===`);
        this.ui_.messages_.push(`You feel stronger! (+${healAmount} HP)`);
        
        // Yangi level generatsiya qilish
        this.generateLevel();
        this.placeEntities();
        this.map.drawRooms();
        this.ui_.renderMessage();
        this.ui_.renderMap(this.map_.grid);
        this.ui_.renderStats(this.player_);
    }

    generateWeapons() {
        this.weapons_ = [];

        // Level ortishi bilan ko'proq qurol
        const baseCount = 2;
        const levelBonus = Math.floor(this.level_ / 2);
        const randomBonus = Math.floor(Math.random() * 2);
        const weaponCount = baseCount + levelBonus + randomBonus;

        const weaponTypes = Object.values(WEAPON_TYPES);

        for(let i = 0; i < weaponCount; i++) {
            const randomType = weaponTypes[Math.floor(Math.random() * weaponTypes.length)];
            const weapon = new Weapon(randomType);

            this.weapons_.push(weapon);
        }
    }

    generateEnems() {
        this.enems_ = [];

        // Level ortishi bilan ko'proq va kuchliroq dushmanlar
        const baseCount = 3;
        const levelBonus = Math.floor(this.level_ * 1.5);
        const randomBonus = Math.floor(Math.random() * 2);
        const enemsCount = baseCount + levelBonus + randomBonus;

        const enemsTypes = Object.values(ENEMY_TYPES);

        for(let i = 0; i < enemsCount; i++) {
            const randomType = enemsTypes[Math.floor(Math.random() * enemsTypes.length)];
            const enemy = new Enemy(randomType, this.level_); // Level parametrini qo'shamiz

            this.enems_.push(enemy);
        }
    }

    generatePortal() {
        this.portal_ = new Portal();
    }

    generateMap() {
        this.map_ = new Map();
    }
    
    generatePlayer() {
        this.player_ = new Player();
    }

    placeEntities() {
        this.placePlayer();
        this.placePortal();
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

    placePortal() {
        const rooms = this.map_.rooms.filter(r => this.playRoom_ !== r);
        const randomRoomIndex = Math.floor(Math.random() * rooms.length);
        const randomRoom = rooms[randomRoomIndex];

        const availableCells = randomRoom.findAvailableCells();
        const position = availableCells[Math.floor(Math.random() * availableCells.length)];

        this.portal_.x = position.x;
        this.portal_.y = position.y;

        randomRoom.appendEntitiesInRoom(this.portal_);
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
        
        if(playerInventors.length === 0) {
            this.ui_.messages_.push("Inventory is empty!");
        } else {
            for(let i = 0; i < playerInventors.length; i++) {
                const equipped = playerInventors[i] === player.equippedWeapon ? " (equipped)" : "";
                this.ui_.messages_.push(`${i + 1}) ${playerInventors[i].char}${equipped}`);
            }
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
        let foundWeapon = false;
        
        weapons.forEach(weapon => {
            const distanceX = Math.abs(player.x - weapon.x);
            const distanceY = Math.abs(player.y - weapon.y);
            if((distanceX === 1 && distanceY === 0) || (distanceY === 1 && distanceX === 0)) {
                player.inventory.push(weapon);
                
                // Agar player qurolsiz bo'lsa, avtomatik equip qilish
                if(!player.equippedWeapon) {
                    player.equippedWeapon = weapon;
                    this.ui_.messages_.push(`Weapon ${weapon.char} picked up and equipped!`);
                } else {
                    this.ui_.messages_.push(`Weapon ${weapon.char} added to inventory!`);
                }
                
                room.grid[weapon.y][weapon.x] = 0;
                foundWeapon = true;
            }
        });
        
        if(!foundWeapon) {
            this.ui_.messages_.push("No weapon nearby!");
        }
        
        this.moveEnemies();
        this.map_.drawRooms();
        this.ui_.renderMessage();
        this.ui_.renderMap(this.map_.grid);
        this.ui_.renderStats(player);
    }

    move(dx, dy) {
        const player = this.player_;
        const newX = player.x + dx;
        const newY = player.y + dy;

        if (player.inCorridor !== null) {
            this.handleCorridorMovement(newX, newY);
            return;
        }

        const room = this.playRoom_;
        
        if (newY < 0 || newY >= room.height || newX < 0 || newX >= room.width) {
            this.updateGameState();
            return;
        }
        
        const targetCell = room.grid[newY][newX];

        if (targetCell instanceof Corridor) {
            this.enterCorridor(targetCell);
            return;
        }

        if (targetCell instanceof Portal) {
            this.enterPortal();
            return;
        }

        if (targetCell === 0) {
            room.grid[player.y][player.x] = 0;
            player.move(dx, dy);
            room.grid[player.y][player.x] = player;
        } 
        else if (targetCell instanceof Enemy) {
            this.attackEnemy(targetCell, newX, newY);
        }

        this.updateGameState();
    }

    enterPortal() {
        this.ui_.messages_.push("You step through the portal...");
        this.ui_.messages_.push("The world shifts around you!");
        this.nextLevel();
    }

    enterCorridor(corridor) {
        const player = this.player_;
        const room = this.playRoom_;

        player.inCorridor = corridor;
        
        room.grid[player.y][player.x] = 0;

        const info = corridor.getEntryExitForRoom(room);
        
        if (!info) {
            console.error("Corridor entry not found for room!");
            return;
        }

        const firstPathPoint = corridor.path[0];
        
        if (info.entryIndex === 0) {
            player.x = firstPathPoint.mapX;
            player.y = firstPathPoint.mapY;
        } else {
            const lastPathPoint = corridor.path[corridor.path.length - 1];
            player.x = lastPathPoint.mapX;
            player.y = lastPathPoint.mapY;
        }
        
        this.map_.grid[player.y][player.x] = '@';

        this.ui_.messages_.push(`You enter the corridor`);
        this.updateGameState();
    }

    handleCorridorMovement(newX, newY) {
        const player = this.player_;
        const corridor = player.inCorridor;
        
        const currentIndex = corridor.getPathIndex(player.x, player.y);
        
        if (currentIndex === -1) {
            console.error("Player not found in corridor path!");
            return;
        }

        const nextIndex = this.calculateNextCorridorIndex(currentIndex, newX, newY, corridor);
        
        if (nextIndex === -1) {
            const canExit = this.tryExitCorridor(currentIndex);
            if (!canExit) {
                this.ui_.messages_.push(`Can't move that way`);
                this.updateGameState();
            }
            return;
        }

        this.map_.grid[player.y][player.x] = '#';
        
        const nextPoint = corridor.path[nextIndex];
        player.x = nextPoint.mapX;
        player.y = nextPoint.mapY;
        
        this.map_.grid[player.y][player.x] = '@';
        
        this.updateGameState();
    }

    calculateNextCorridorIndex(currentIndex, targetMapX, targetMapY, corridor) {
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
        
        return -1;
    }

    tryExitCorridor(currentIndex) {
        const player = this.player_;
        const corridor = player.inCorridor;
        
        if (currentIndex === 0) {
            this.exitCorridorToRoom(corridor.entry1);
            return true;
        } else if (currentIndex === corridor.path.length - 1) {
            this.exitCorridorToRoom(corridor.entry2);
            return true;
        }
        
        return false;
    }

    exitCorridorToRoom(entry) {
        const player = this.player_;
        
        this.map_.grid[player.y][player.x] = '#';
        
        this.playRoom_ = entry.room;
        player.x = entry.playerRoomX;
        player.y = entry.playerRoomY;
        player.inCorridor = null;
        
        this.playRoom_.isVisible = true;
        this.playRoom_.grid[player.y][player.x] = player;
        
        this.ui_.messages_.push(`You enter a new room`);
        this.updateGameState();
    }

    attackEnemy(enemy, newX, newY) {
        const player = this.player_;
        const room = this.playRoom_;
        
        const damage = player.attack();
        const isEnemyAlive = enemy.takeDamage(damage);
        
        this.ui_.messages_.push(`You hit the ${enemy.type} for ${damage} damage`);
        
        if (!isEnemyAlive) {
            room.grid[newY][newX] = 0;
            this.ui_.messages_.push(`You defeated the ${enemy.type}!`);
            
            // Level ga qarab ko'proq experience va gold berish
            const baseExp = enemy.experienceValue || 5;
            const expBonus = Math.floor(this.level_ * 2);
            const totalExp = baseExp + expBonus;
            
            const goldDrop = Math.floor(Math.random() * (10 * this.level_)) + (5 * this.level_);
            
            player.gainExperience(totalExp);
            player.gold += goldDrop;
            
            this.ui_.messages_.push(`+${totalExp} EXP, +${goldDrop} Gold`);
        }
        
        this.updateGameState();
    }

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
                    enemyNewX >= room.width || 
                    enemyNewY < 0 || 
                    enemyNewX < 0) {
                    continue;
                }

                const distanceX = Math.abs(player.x - enemy.x);
                const distanceY = Math.abs(player.y - enemy.y);
                
                if((distanceX === 1 && distanceY === 0) || (distanceY === 1 && distanceX === 0)){
                    const enemyDamage = enemy.attack();
                    const isPlayerAlive = player.takeDamage(enemyDamage);
                    this.ui_.messages_.push(`The ${enemy.type} hits you for ${enemyDamage} damage!`);
                    if(!isPlayerAlive) {
                        this.ui_.messages_.push('Game Over! You died.');
                        this.ui_.renderMessage();
                        setTimeout(() => process.exit(0), 2000);
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