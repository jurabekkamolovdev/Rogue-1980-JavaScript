// src/domain/entities/Player.js

export class Player {
    
    /**
     * 
     * @param {number}
     * @param {number} 
     */
    constructor(x = 0, y = 0) {
        this.x_ = x;
        this.y_ = y;
        this.maxHealth_ = 12;
        this.currentHealth_ = 12;
        this.maxStrength_ = 17;
        this.currentStrength_ = 1;
        this.equippedWeapon_ = null;
        this.inventory_ = [];
        this.gold_ = 0;
    }

    get x() { return this.x_; }
    get y() { return this.y_; } 


    get health() { return this.currentHealth_; }
    set health(hp) {
        this.currentHealth_ = Math.max(0, Math.min(hp, this.maxHealth_));
    }

    get strength() { return this.currentStrength_; }
    set strength(str) {
        this.currentStrength_ = Math.max(0, Math.min(str, this.maxStrength_));
    }

    get maxStrength() { return this.maxStrength_; }

    get equippedWeapon() { return this.equippedWeapon_; }
    set equippedWeapon(eW) { this.equippedWeapon_ = eW; }

    get gold() { return this.gold_; }
    set gold(value) { this.gold_ = Math.max(0, value); }

    /**
     * 
     * @param {number} dx 
     * @param {number} dy 
     */
    move(dx, dy) {
        this.x_ += dx;
        this.y_ += dy;
    }

    /**
     * 
     * @param {number} amount 
     * @returns {boolean}
     */
    takeDamage(amount) {
        this.currentHealth_ -= amount
        if(this.currentHealth_ < 0) {
            this.currentHealth_ = 0;
        }

        return this.currentHealth_ > 0;
    }

    /**
     * @returns {number}
     */
    attack() {
        let damage = 0;

        if(this.equippedWeapon_) {
            damage = this.equippedWeapon_.calculateDamage()
        } else {
            damage = Math.floor(Math.random() * 2 + 1);
        }

        const strengthBonus = Math.floor(this.currentStrength_ / 2);
        damage += strengthBonus;

        return damage;
    }

    getState() {
        return {
            position: { x: this.x_, y: this.y_},
            stats: {
                maxHealth: this.maxHealth_,
                currentHealth: this.currentHealth_,

                maxStrength: this.maxStrength_,
                currentStrength: this.currentStrength_,

                gold: this.gold_,
            }
        }
    }
}