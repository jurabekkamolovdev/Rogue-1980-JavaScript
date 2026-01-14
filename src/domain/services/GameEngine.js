// src/domain/services/GameEngine.js


import { WEAPON_TYPES, Weapon } from "../entities/Weapon.js"
import { ENEMY_TYPES, Enemy } from "../entities/Enemy.js"
import { Map } from "../entities/Map.js"
import { Player } from "../entities/Player.js"  

export class GameEngine {
    constructor() {
        this.player_ = null;
        this.weapons_ = [];
        this.enems_ = [];
        this.map_ = null;
        this.level_ = 1;
    }

    get player() { return this.player_; }
    get weapons() { return this.weapons_; }
    get enems() { return this.enems_; }
    get map() { return this.map_; }

    startNewGame() {
        this.level_ = 1;
        this.weapons_ = [];

        this.generatePlayer();
        this.generateLevel();
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
    }

    placePlayer() {
        const notViewRooms = this.map_.notViewRooms;
        const viewRooms = this.map_.viewRooms;
        
        const randomIndex = Math.floor(Math.random() * notViewRooms.length);
        const randomRoom = notViewRooms[randomIndex];
        
        notViewRooms.splice(randomIndex, 1);
        viewRooms.push(randomRoom);

        const availableCells = randomRoom.findAvailableCells();
        const startPosition = availableCells[Math.floor(Math.random() * availableCells.length)];

        this.player_.x = startPosition.x;
        this.player_.y = startPosition.y;

        randomRoom.setEntitiesInGrid(this.player_, startPosition);
    }
}