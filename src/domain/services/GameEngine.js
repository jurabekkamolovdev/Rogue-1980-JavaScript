// src/domain/services/GameEngine.js



import { WEAPON_TYPES, Weapon } from "../entities/Weapon.js"
import { Player } from "../entities/Player.js"  

export class GameEngine {
    constructor() {
        this.player_ = null;
        this.weapons_ = [];
        this.level_ = 1;
    }

    get player() { return this.player_; }
    get weapons() { return this.weapons_; }

    startNewGame() {
        this.level_ = 1;
        this.weapons_ = [];

        this.generatePlayer();
        this.generateLevel();
    }

    generateLevel() {
        console.log(`Daraga ${this.level_} generatsiya qilinmoqda...`);

        this.generateWeapons();
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

    generatePlayer() {
        this.player_ = new Player();
    }
}