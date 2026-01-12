// src/domain/entities/Enemy.js


export const ENEMY_TYPES = {
    Zombie: 'zombie',
    Vampire: 'vampire ',
    Ghost: 'ghost',
    Ogre: 'ogre',
    Snake: 'snake'
}

const ENEMY_STATS = {
    [ENEMY_TYPES.Zombie]: {
        hpMin: 2, 
        hpMax: 16,
        dmgMin: 1,
        dmgMax: 2
    },
    [ENEMY_TYPES.Vampire]: {
        hpMin: 1,
        hpMax: 8,
        dmgMin: 1,
        dmgMax: 3
    },
    [ENEMY_TYPES.Ghost]: {
        hpMin: 1,
        hpMax: 8,
        dmgMin: 1,
        dmgMax: 2
    },
    [ENEMY_TYPES.Ogre]: {
        hpMin: 2,
        hpMax: 16,
        dmgMin: 1,
        dmgMax: 6
    },
    [ENEMY_TYPES.Snake]: {
        hpMin: 1,
        hpMax: 8,
        dmgMin: 1,
        dmgMax: 6
    }
}

export class Enemy {
    constructor(type) {
        if (!ENEMY_STATS[type]) {
            throw new Error(`Unknown enemy type: ${type}`);
        }

        this.type_ = type
        this.x_ = 0
        this.y_ = 0
        this.health_ = 0
        this.damage_ = 0
        this.generateEnemy()
    }

    get type() { return this.type_ }
    get x() { return this.x_ }
    set x(val) { this.x_ = val }

    get y() { return this.y_ }
    set y(val) { this.y_ = val }

    get health() { return this.health_ }
    get damage() { return this.damage_ }

    generateEnemy() {
        const stats = ENEMY_STATS[this.type_]
        if (!stats) return

        this.health_ = Math.floor(Math.random() * (stats.hpMax - stats.hpMin + 1)) + stats.hpMin
        this.damage_ = Math.floor(Math.random() * (stats.dmgMax - stats.dmgMin + 1)) + stats.dmgMin
    }

    move(playerX, playerY) {
        const dx = playerX - this.x_;
        const dy = playerY - this.y_;

        if (Math.abs(dx) > Math.abs(dy)) {
            this.x_ += Math.sign(dx);
        }

        else if (Math.abs(dy) !== 0) {
            this.y_ += Math.sign(dy);
        }
    }

    takeDamage(amount) {
        this.health_ -= amount;
        if(this.health_ < 0) {
            this.health_ = 0;
        }

        return this.health_ > 0;
    }

    attack() {
        return this.damage_;
    }

    getState() {
        return {
            type: this.type_,
            damage: this.damage_,
            health: this.health_
        }
    }
}
