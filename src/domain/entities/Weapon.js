// src/domain/entities/Weapon.js


export const WEAPON_TYPES = {
    MACE: 'mace',
    BOW: 'bow',
    ARROW: 'arrow',
    DART: 'dart',       
    TWOHANDED_SWORD: 'twohanded_sword',
    DAGGER: 'dagger',
    SPEAR: 'spear'
}

const WEAPON_STATS = {
    [WEAPON_TYPES.MACE]: { min: 2, max: 3, char: 'Mace'},
    [WEAPON_TYPES.BOW]: { min: 1, max: 1, char: 'Bow'},
    [WEAPON_TYPES.ARROW]: { min: 1, max: 3, char: 'Arrow'},
    [WEAPON_TYPES.DART]: { min: 1, max: 2, char: 'Dart'},
    [WEAPON_TYPES.TWOHANDED_SWORD]: { min: 3, max: 10, char: 'Tw Sword'},
    [WEAPON_TYPES.DAGGER]: { min: 1, max: 4, char: 'Dagger'},
    [WEAPON_TYPES.SPEAR]: { min: 2, max: 5, char: 'Spear'}
};


export class Weapon {

    /**
     * 
     * @param {string} type
     */
    constructor(type) {
        if(!WEAPON_STATS[type]) {
            throw new Error(`Unknown weapon type: ${type}`);
        }

        this.type_ = type;
        this.x_ = 0;
        this.y_ = 0;
        this.equipped_ = false;
    }

    get type() { return this.type_; }

    get x() { return this.x_; }
    set x(dx) { this.x_ = dx; }

    get y() { return this.y_; }
    set y(dy) { this.y_ = dy; }

    get equipped() { return this.equipped_; }
    set equipped(value) { this.equipped_ = value; }

    get char() {
        return WEAPON_STATS[this.type].char
    }

    /**
     * 
     * @returns {{min: number, max: number}}
     */
    getDamageStats() {
        return WEAPON_STATS[this.type_];
    }

    /**
     * 
     * @returns {number}
     */
    calculateDamage() {
        const stats = this.getDamageStats();
        const damage = Math.floor(
            Math.random() * (stats.max - stats.min + 1) + stats.min
        );

        return damage;
    }

    /**
     * 
     * @returns {Object}
     */
    getState() {
        return {
            type: this.type_,
            damage: this.calculateDamage()
        }
    }

}