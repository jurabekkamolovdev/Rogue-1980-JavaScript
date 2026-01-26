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

        this.armor_ = 0;

        this.maxExperience_ = 10
        this.experience_ = 0;

        this.inventory_ = [];

        this.gold_ = 0;

        this.level_ = 1;
        this.inCorridor_ = null;
    }

    get x() { return this.x_; }
    set x(value) { this.x_ = value; }
    
    get y() { return this.y_; } 
    set y(value) { this.y_ = value; }

    get inCorridor() { return this.inCorridor_; }
    set inCorridor(value) { this.inCorridor_ = value; } 

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

    get armor() { return this.armor_; }

    get experience() { return this.experience_; }
    get maxExperience() { return this.maxExperience_; }

    get level() { return this.level_; }

    get inventory() { return this.inventory_; }

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
        const actualDamage = Math.max(1, amount - this.armor_);
        this.currentHealth_ -= actualDamage

        if(this.currentHealth_ < 0) {
            this.currentHealth_ = 0;
        }

        return this.currentHealth_ > 0;
    }

    /**
     * 
     * @param {number} amount 
     */
    gainExperience(amount) {
        this.experience_ += amount;
        
        if (this.experience_ >= this.level_ * 10) {
            this.levelUp();
        }
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

    levelUp() {
        this.level_++;
        this.maxHealth_ += 2;
        this.currentHealth_ = this.maxHealth_;
        this.maxStrength_++;
        this.currentStrength_ = this.maxStrength_;
    }

    /**
     * 
     * @returns {Object}
     */
    getState() {
        return {
            stats: {
                level: this.level_,

                maxHealth: this.maxHealth_,
                currentHealth: this.currentHealth_,

                maxStrength: this.maxStrength_,
                currentStrength: this.currentStrength_,

                gold: this.gold_,

                armor: this.armor_,

                experience: this.experience_,
                maxExperience: this.maxExperience_,

                weapon: this.equippedWeapon_ ? this.equippedWeapon_.char : null
            }
        }
    }
}