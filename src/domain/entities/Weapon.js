const WEAPON_TYPES = {
    MACE: 'mace',
    BOW: 'bow',
    ARROW: 'arrow',
    DART: 'dart',       
    TWOHANDED_SWORD: 'twohanded_sword',
    DAGGER: 'dagger',
    SPEAR: 'spear'
}

const WEAPON_DAMAGE = {
    [WEAPON_TYPES.MACE]: { min: 2, max: 3},
    [WEAPON_TYPES.BOW]: { min: 1, max: 1},
    [WEAPON_TYPES.ARROW]: { min: 1, max: 3},
    [WEAPON_TYPES.DART]: { min: 1, max: 2},
    [WEAPON_TYPES.TWOHANDED_SWORD]: { min: 3, max: 10},
    [WEAPON_TYPES.DAGGER]: { min: 1, max: 4},
    [WEAPON_TYPES.SPEAR]: { min: 2, max: 5}
};


class Weapon {

    /**
     * 
     * @param {string}
     */
    constructor(type) {
        this.type_ = type;
        this.equipped_ = false;
    }

    get type() { return this.type_; }
    get equipped() { return this.equipped_; }
    set eequipped(value) { this.equipped_ = value; }

    /**
     * 
     * @returns {{min: number, max: number}}
     */
    getDamageStats() {
        return WEAPON_DAMAGE[this.type_];
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

}