// src/domain/entities/Enemy.js

export const ENEMY_TYPES = {
    Zombie: 'zombie',
    Vampire: 'vampire',
    Ghost: 'ghost',
    Ogre: 'ogre',
    Snake: 'snake'
}

const ENEMY_STATS = {
    [ENEMY_TYPES.Zombie]: {
        char: '{green-fg}{bold}Z{/bold}{/green-fg}',
        hpMin: 2,
        hpMax: 16,
        dmgMin: 1,
        dmgMax: 2
    },

    [ENEMY_TYPES.Vampire]: {
        char: '{red-fg}{bold}V{/bold}{/red-fg}',
        hpMin: 1,
        hpMax: 8,
        dmgMin: 1,
        dmgMax: 3
    },

    [ENEMY_TYPES.Ghost]: {
        char: '{white-fg}{bold}G{/bold}{/white-fg}',
        hpMin: 1,
        hpMax: 8,
        dmgMin: 1,
        dmgMax: 2
    },

    [ENEMY_TYPES.Ogre]: {
        char: '{yellow-fg}{bold}O{/bold}{/yellow-fg}',
        hpMin: 2,
        hpMax: 16,
        dmgMin: 1,
        dmgMax: 6
    },

    [ENEMY_TYPES.Snake]: {
        char: '{cyan-fg}{bold}S{/bold}{/cyan-fg}',
        hpMin: 1,
        hpMax: 8,
        dmgMin: 1,
        dmgMax: 6
    }
};

export class Enemy {
    constructor(type, level = 1) {
        if (!ENEMY_STATS[type]) {
            throw new Error(`Unknown enemy type: ${type}`);
        }

        this.type_ = type;
        this.level_ = level;
        this.x_ = 0;
        this.y_ = 0;
        this.health_ = 0;
        this.damage_ = 0;
        this.experienceValue_ = 5;
        this.generateEnemy();
    }

    get type() { return this.type_; }

    get x() { return this.x_; }
    set x(val) { this.x_ = val; }

    get y() { return this.y_; }
    set y(val) { this.y_ = val; }

    get health() { return this.health_; }
    get damage() { return this.damage_; }
    get experienceValue() { return this.experienceValue_; }

    get char() { 
        return ENEMY_STATS[this.type_].char;
    }

    generateEnemy() {
        const stats = ENEMY_STATS[this.type_];
        if (!stats) return;

        // Level ga qarab kuchliroq dushmanlar
        const levelMultiplier = 1 + (this.level_ - 1) * 0.3;
        
        const baseHp = Math.floor(Math.random() * (stats.hpMax - stats.hpMin + 1)) + stats.hpMin;
        const baseDmg = Math.floor(Math.random() * (stats.dmgMax - stats.dmgMin + 1)) + stats.dmgMin;
        
        this.health_ = Math.floor(baseHp * levelMultiplier);
        this.damage_ = Math.floor(baseDmg * levelMultiplier);
        
        // Experience ham level ga qarab ko'payadi
        this.experienceValue_ = Math.floor(5 * levelMultiplier);
    }

    calculateMove(playerX, playerY) {
        const dx = playerX - this.x_;
        const dy = playerY - this.y_;

        if (Math.abs(dx) > Math.abs(dy)) {
            return { dx: Math.sign(dx), dy: 0 };
        }
        else if (Math.abs(dy) !== 0) {
            return { dx: 0, dy: Math.sign(dy) };
        }
        
        return { dx: 0, dy: 0 };
    }

    move(dx, dy) {
        this.x_ += dx;
        this.y_ += dy;
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
            health: this.health_,
            level: this.level_
        };
    }
}