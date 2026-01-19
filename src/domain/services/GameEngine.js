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
        const rooms = this.map_.notViewRooms;
        
        const randomIndex = Math.floor(Math.random() * rooms.length);
        const randomRoom = rooms[randomIndex];
        this.playRoom_ = randomRoom;
        rooms.splice(randomIndex, 1);
        
        const availableCells = randomRoom.findAvailableCells();
        const startPosition = availableCells[Math.floor(Math.random() * availableCells.length)];
        
        this.player_.x = startPosition.x;
        this.player_.y = startPosition.y;
        
        randomRoom.appendEntitiesInRoom(this.player_);
        this.map_.viewRooms.push(randomRoom)
    }

    placeWeapons() {
        while(this.weapons_.length > 0) {
            const rooms = this.map_.notViewRooms;
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
            const rooms = this.map_.notViewRooms;
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
        this.ui_.screen.key(['up', 'w'], () => {
            this.player_.move(0, -1);
            this.map_.drawRooms();
            this.ui_.renderMap(this.map_.grid);
        });

        this.ui_.screen.key(['down', 's'], () => {
            this.player_.move(0, 1);
            this.map_.drawRooms();
            this.ui_.renderMap(this.map_.grid);
        });

        this.ui_.screen.key(['left', 'a'], () => {
            this.player_.move(-1, 0);
            this.map_.drawRooms();
            this.ui_.renderMap(this.map_.grid);
        });

        this.ui_.screen.key(['right', 'd'], () => {
            this.player_.move(1, 0);
            this.map_.drawRooms();
            this.ui_.renderMap(this.map_.grid);
        });
    }
}