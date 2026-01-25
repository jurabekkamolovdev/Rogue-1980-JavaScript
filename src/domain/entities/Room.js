// src/domain/entities/Room.js
import { Enemy } from "./Enemy.js"
import { Weapon } from "./Weapon.js"
import { Player } from "./Player.js"
import { Corridor } from "./Corridor.js";
export class Room {
    constructor(width, height) {
        this.width_ = width;
        this.height_ = height;
        this.entities_ = [];
        this.isVisible_ = false;
        this.mapX_ = 0;
        this.mapY_ = 0;

        this.grid_ = Array.from(
            { length: height },
            () => Array(width).fill(0)
        );
        this.setWalls();

    }

    get width() { return this.width_; }
    get height() { return this.height_; }

    get grid() { return this.grid_; }

    get mapX() { return this.mapX_; }
    set mapX(value) { this.mapX_ = value; }

    get mapY() { return this.mapY_; }
    set mapY(value) { this.mapY_ = value; }

    get isVisible() { return this.isVisible_; }
    set isVisible(value) { this.isVisible_ = value; }

    /**
     * 
     * @param {any} entity 
     */
    appendEntitiesInRoom(entity) {
        this.grid_[entity.y][entity.x] = entity;
    }

    refreshRoom() {
        for(let i = 0; i < this.height_; i++) {
            for(let j = 0; j < this.width_; j++) {
                if( (this.grid_[i][j] !== 0) && (this.grid_[i][j] !== 1) && (!(this.grid_[i][j] instanceof Corridor))) {
                    const entity = this.grid_[i][j];
                    if( (i !== entity.y) || (j !== entity.x) ) {
                        this.grid_[i][j] = 0;
                        this.grid[entity.y][entity.x] = entity;
                    }
                }
            }
        }
    }

    /**
     * 
     * @returns {Array<{x: number, y: number}>}
     */
    findAvailableCells() {
        const result = [];
        for(let i = 0; i < this.height_; i++) {
            for(let j = 0; j < this.width_; j++) {
                if(this.grid_[i][j] === 0) {
                    result.push({x: j, y: i})
                }
            }
        }
        return result;
    }

    setWalls() {
        for(let i = 0; i < this.height_; i++) {
            for(let j = 0; j < this.width_; j++) {
                if(i === 0 || j === 0 || i === this.height_ - 1 || j === this.width_ - 1) {
                    this.grid_[i][j] = 1;
                } 
            }
        }
    }

    /**
     * 
     * @returns {Player}
     */
    getPlayer() {
        return this.grid_.flat().find(p => p instanceof Player) || null;
    }

    /**
     * 
     * @returns {Array<Weapon>}
     */
    getWeapons() {
        return this.grid_.flat().filter(we => we instanceof Weapon);
    }

    /**
     * 
     * @returns { Array<Enemy> }
     */
    getEnems() {
        return this.grid_.flat().filter(en => en instanceof Enemy);
    }
}
