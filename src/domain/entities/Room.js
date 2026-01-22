// // src/domain/entities/Room.js
// import { Enemy } from "./Enemy.js"
// import { Weapon } from "./Weapon.js"
// import { Player } from "./Player.js"
// export class Room {
//     constructor(width, height) {
//         this.width_ = width;
//         this.height_ = height;
//         this.entities_ = []
//         this.mapX_ = 0;
//         this.mapY_ = 0;

//         this.grid_ = Array.from(
//             { length: height },
//             () => Array(width).fill(0)
//         );
//         this.setWalls();

//     }

//     get width() { return this.width_; }
//     get height() { return this.height_; }

//     get grid() { return this.grid_; }

//     get mapX() { return this.mapX_; }
//     set mapX(value) { this.mapX_ = value; }

//     get mapY() { return this.mapY_; }
//     set mapY(value) { this.mapY_ = value; }


//     /**
//      * 
//      * @param {any} entity 
//      */
//     appendEntitiesInRoom(entity) {
//         this.grid_[entity.y][entity.x] = entity;
//     }

//     refreshRoom() {
//         for(let i = 0; i < this.height_; i++) {
//             for(let j = 0; j < this.width_; j++) {
//                 if( (this.grid_[i][j] !== 0) && (this.grid_[i][j] !== 1) ) {
//                     const entity = this.grid_[i][j];
//                     if( (i !== entity.y) || (j !== entity.x) ) {
//                         this.grid_[i][j] = 0;
//                         this.grid[entity.y][entity.x] = entity;
//                     }
//                 }
//             }
//         }
//     }

//     /**
//      * 
//      * @returns {Array<{x: number, y: number}>}
//      */
//     findAvailableCells() {
//         const result = [];
//         for(let i = 0; i < this.height_; i++) {
//             for(let j = 0; j < this.width_; j++) {
//                 if(this.grid_[i][j] === 0) {
//                     result.push({x: j, y: i})
//                 }
//             }
//         }
//         return result;
//     }

//     setWalls() {
//         for(let i = 0; i < this.height_; i++) {
//             for(let j = 0; j < this.width_; j++) {
//                 if(i === 0 || j === 0 || i === this.height_ - 1 || j === this.width_ - 1) {
//                     this.grid_[i][j] = 1;
//                 } 
//             }
//         }
//     }

//     /**
//      * 
//      * @returns {Player}
//      */
//     getPlayer() {
//         return this.grid_.flat().find(p => p instanceof Player) || null;
//     }

//     /**
//      * 
//      * @returns {Array<Weapon>}
//      */
//     getWeapons() {
//         return this.grid_.flat().filter(we => we instanceof Weapon);
//     }

//     /**
//      * 
//      * @returns { Array<Enemy> }
//      */
//     getEnems() {
//         return this.grid_.flat().filter(en => en instanceof Enemy);
//     }
// }


// src/domain/entities/Room.js

// import { Enemy } from "./Enemy.js"
// import { Weapon } from "./Weapon.js"
// import { Player } from "./Player.js"

// export class Room {
//     constructor(width, height) {
//         this.width_ = width;
//         this.height_ = height;
//         this.entities_ = [];
//         this.mapX_ = 0;
//         this.mapY_ = 0;
//         this.regionX_ = 0;
//         this.regionY_ = 0;
//         this.isVisible_ = false; // Ko'rinish holati
//         this.gridIndex_ = -1;

//         this.grid_ = Array.from(
//             { length: height },
//             () => Array(width).fill(0)
//         );
//         this.setWalls();
//     }

//     get width() { return this.width_; }
//     get height() { return this.height_; }
//     get grid() { return this.grid_; }

//     get mapX() { return this.mapX_; }
//     set mapX(value) { this.mapX_ = value; }

//     get mapY() { return this.mapY_; }
//     set mapY(value) { this.mapY_ = value; }

//     get regionX() { return this.regionX_; }
//     set regionX(value) { this.regionX_ = value; }

//     get regionY() { return this.regionY_; }
//     set regionY(value) { this.regionY_ = value; }

//     get isVisible() { return this.isVisible_; }
//     set isVisible(value) { this.isVisible_ = value; }

//     get gridIndex() { return this.gridIndex_; }
//     set gridIndex(value) { this.gridIndex_ = value; }

//     appendEntitiesInRoom(entity) {
//         this.grid_[entity.y][entity.x] = entity;
//     }

//     refreshRoom() {
//         for(let i = 0; i < this.height_; i++) {
//             for(let j = 0; j < this.width_; j++) {
//                 if((this.grid_[i][j] !== 0) && 
//                    (this.grid_[i][j] !== 1) && 
//                    (this.grid_[i][j] !== '+')) {
//                     const entity = this.grid_[i][j];
//                     if((i !== entity.y) || (j !== entity.x)) {
//                         this.grid_[i][j] = 0;
//                         this.grid_[entity.y][entity.x] = entity;
//                     }
//                 }
//             }
//         }
//     }

//     findAvailableCells() {
//         const result = [];
//         for(let i = 0; i < this.height_; i++) {
//             for(let j = 0; j < this.width_; j++) {
//                 if(this.grid_[i][j] === 0) {
//                     result.push({x: j, y: i});
//                 }
//             }
//         }
//         return result;
//     }

//     setWalls() {
//         for(let i = 0; i < this.height_; i++) {
//             for(let j = 0; j < this.width_; j++) {
//                 if(i === 0 || j === 0 || i === this.height_ - 1 || j === this.width_ - 1) {
//                     this.grid_[i][j] = 1;
//                 } 
//             }
//         }
//     }

//     findCorridorEntry(fromRoom) {
//         // Corridor yaqinidagi bo'sh joyni topamiz
//         for(let i = 0; i < this.height_; i++) {
//             for(let j = 0; j < this.width_; j++) {
//                 if(this.grid_[i][j] === '+') {
//                     // Corridor atrofidagi bo'sh joylarni tekshiramiz
//                     const neighbors = [
//                         {x: j, y: i - 1},
//                         {x: j, y: i + 1},
//                         {x: j - 1, y: i},
//                         {x: j + 1, y: i}
//                     ];
                    
//                     for(const pos of neighbors) {
//                         if(pos.x >= 0 && pos.x < this.width_ && 
//                            pos.y >= 0 && pos.y < this.height_ &&
//                            this.grid_[pos.y][pos.x] === 0) {
//                             return pos;
//                         }
//                     }
//                 }
//             }
//         }
        
//         // Agar topilmasa, birinchi bo'sh joyni qaytaramiz
//         const available = this.findAvailableCells();
//         return available.length > 0 ? available[0] : {x: 1, y: 1};
//     }

//     getPlayer() {
//         return this.grid_.flat().find(p => p instanceof Player) || null;
//     }

//     getWeapons() {
//         return this.grid_.flat().filter(we => we instanceof Weapon);
//     }

//     getEnems() {
//         return this.grid_.flat().filter(en => en instanceof Enemy);
//     }
// }



// src/domain/entities/Room.js

// import { Enemy } from "./Enemy.js"
// import { Weapon } from "./Weapon.js"
// import { Player } from "./Player.js"

// export class Room {
//     constructor(width, height) {
//         this.width_ = width;
//         this.height_ = height;
//         this.entities_ = [];
//         this.mapX_ = 0;
//         this.mapY_ = 0;
//         this.regionX_ = 0;
//         this.regionY_ = 0;
//         this.isVisible_ = false; // Hozir ko'rinayotgan xona
//         this.hasBeenExplored_ = false; // Bir marta explore qilingan xona
//         this.gridIndex_ = -1;

//         this.grid_ = Array.from(
//             { length: height },
//             () => Array(width).fill(0)
//         );
//         this.setWalls();
//     }

//     get width() { return this.width_; }
//     get height() { return this.height_; }
//     get grid() { return this.grid_; }

//     get mapX() { return this.mapX_; }
//     set mapX(value) { this.mapX_ = value; }

//     get mapY() { return this.mapY_; }
//     set mapY(value) { this.mapY_ = value; }

//     get regionX() { return this.regionX_; }
//     set regionX(value) { this.regionX_ = value; }

//     get regionY() { return this.regionY_; }
//     set regionY(value) { this.regionY_ = value; }

//     get isVisible() { return this.isVisible_; }
//     set isVisible(value) { 
//         this.isVisible_ = value;
//         if(value) {
//             this.hasBeenExplored_ = true;
//         }
//     }

//     get hasBeenExplored() { return this.hasBeenExplored_; }

//     get gridIndex() { return this.gridIndex_; }
//     set gridIndex(value) { this.gridIndex_ = value; }

//     appendEntitiesInRoom(entity) {
//         this.grid_[entity.y][entity.x] = entity;
//     }

//     refreshRoom() {
//         for(let i = 0; i < this.height_; i++) {
//             for(let j = 0; j < this.width_; j++) {
//                 if((this.grid_[i][j] !== 0) && 
//                    (this.grid_[i][j] !== 1) && 
//                    (this.grid_[i][j] !== '+')) {
//                     const entity = this.grid_[i][j];
//                     if((i !== entity.y) || (j !== entity.x)) {
//                         this.grid_[i][j] = 0;
//                         this.grid_[entity.y][entity.x] = entity;
//                     }
//                 }
//             }
//         }
//     }

//     findAvailableCells() {
//         const result = [];
//         for(let i = 0; i < this.height_; i++) {
//             for(let j = 0; j < this.width_; j++) {
//                 if(this.grid_[i][j] === 0) {
//                     result.push({x: j, y: i});
//                 }
//             }
//         }
//         return result;
//     }

//     setWalls() {
//         for(let i = 0; i < this.height_; i++) {
//             for(let j = 0; j < this.width_; j++) {
//                 if(i === 0 || j === 0 || i === this.height_ - 1 || j === this.width_ - 1) {
//                     this.grid_[i][j] = 1;
//                 } 
//             }
//         }
//     }

//     findCorridorEntry(fromRoom) {
//         // Corridor yaqinidagi bo'sh joyni topamiz
//         for(let i = 0; i < this.height_; i++) {
//             for(let j = 0; j < this.width_; j++) {
//                 if(this.grid_[i][j] === '+') {
//                     // Corridor atrofidagi bo'sh joylarni tekshiramiz
//                     const neighbors = [
//                         {x: j, y: i - 1},
//                         {x: j, y: i + 1},
//                         {x: j - 1, y: i},
//                         {x: j + 1, y: i}
//                     ];
                    
//                     for(const pos of neighbors) {
//                         if(pos.x >= 0 && pos.x < this.width_ && 
//                            pos.y >= 0 && pos.y < this.height_ &&
//                            this.grid_[pos.y][pos.x] === 0) {
//                             return pos;
//                         }
//                     }
//                 }
//             }
//         }
        
//         // Agar topilmasa, birinchi bo'sh joyni qaytaramiz
//         const available = this.findAvailableCells();
//         return available.length > 0 ? available[0] : {x: 1, y: 1};
//     }

//     getPlayer() {
//         return this.grid_.flat().find(p => p instanceof Player) || null;
//     }

//     getWeapons() {
//         return this.grid_.flat().filter(we => we instanceof Weapon);
//     }

//     getEnems() {
//         return this.grid_.flat().filter(en => en instanceof Enemy);
//     }
// }


// src/domain/entities/Room.js

import { Enemy } from "./Enemy.js"
import { Weapon } from "./Weapon.js"
import { Player } from "./Player.js"

export class Room {
    constructor(width, height) {
        this.width_ = width;
        this.height_ = height;
        this.entities_ = [];
        this.mapX_ = 0;
        this.mapY_ = 0;
        this.regionX_ = 0;
        this.regionY_ = 0;
        this.isVisible_ = false; // Hozir ko'rinayotgan xona
        this.hasBeenExplored_ = false; // Bir marta explore qilingan xona
        this.gridIndex_ = -1;

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

    get regionX() { return this.regionX_; }
    set regionX(value) { this.regionX_ = value; }

    get regionY() { return this.regionY_; }
    set regionY(value) { this.regionY_ = value; }

    get isVisible() { return this.isVisible_; }
    set isVisible(value) { 
        this.isVisible_ = value;
        if(value) {
            this.hasBeenExplored_ = true;
        }
    }

    get hasBeenExplored() { return this.hasBeenExplored_; }
    set hasBeenExplored(value) { this.hasBeenExplored_ = value; } // SETTER QO'SHDIK

    get gridIndex() { return this.gridIndex_; }
    set gridIndex(value) { this.gridIndex_ = value; }

    appendEntitiesInRoom(entity) {
        if(entity && entity.y >= 0 && entity.y < this.height_ && 
           entity.x >= 0 && entity.x < this.width_) {
            this.grid_[entity.y][entity.x] = entity;
        }
    }

    refreshRoom() {
        for(let i = 0; i < this.height_; i++) {
            for(let j = 0; j < this.width_; j++) {
                const cell = this.grid_[i][j];
                
                // Entity bo'lsa va joyidan ko'chgan bo'lsa
                if(cell && cell !== 0 && cell !== 1 && cell !== '+' && cell !== 'P') {
                    if(typeof cell === 'object' && (cell.x !== undefined || cell.y !== undefined)) {
                        if(i !== cell.y || j !== cell.x) {
                            this.grid_[i][j] = 0;
                            
                            // Yangi pozitsiyaga qo'yish
                            if(cell.y >= 0 && cell.y < this.height_ && 
                               cell.x >= 0 && cell.x < this.width_) {
                                this.grid_[cell.y][cell.x] = cell;
                            }
                        }
                    }
                }
            }
        }
    }

    findAvailableCells() {
        const result = [];
        for(let i = 0; i < this.height_; i++) {
            for(let j = 0; j < this.width_; j++) {
                if(this.grid_[i][j] === 0) {
                    result.push({x: j, y: i});
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

    findCorridorEntry(fromRoom) {
        // Corridor belgisini topamiz
        for(let i = 0; i < this.height_; i++) {
            for(let j = 0; j < this.width_; j++) {
                if(this.grid_[i][j] === '+') {
                    // Corridor yonidagi bo'sh joyni topamiz
                    const neighbors = [
                        {x: j, y: i - 1},     // tepada
                        {x: j, y: i + 1},     // pastda
                        {x: j - 1, y: i},     // chapda
                        {x: j + 1, y: i}      // o'ngda
                    ];
                    
                    for(const pos of neighbors) {
                        if(pos.x >= 0 && pos.x < this.width_ && 
                           pos.y >= 0 && pos.y < this.height_ &&
                           this.grid_[pos.y][pos.x] === 0) {
                            return pos;
                        }
                    }
                }
            }
        }
        
        // Agar topilmasa, birinchi bo'sh joyni qaytaramiz
        const available = this.findAvailableCells();
        if(available.length > 0) {
            return available[0];
        }
        
        // Hech narsa topilmasa, markazni qaytaramiz
        return {
            x: Math.floor(this.width_ / 2), 
            y: Math.floor(this.height_ / 2)
        };
    }

    getPlayer() {
        for(let i = 0; i < this.height_; i++) {
            for(let j = 0; j < this.width_; j++) {
                if(this.grid_[i][j] instanceof Player) {
                    return this.grid_[i][j];
                }
            }
        }
        return null;
    }

    getWeapons() {
        const weapons = [];
        for(let i = 0; i < this.height_; i++) {
            for(let j = 0; j < this.width_; j++) {
                if(this.grid_[i][j] instanceof Weapon) {
                    weapons.push(this.grid_[i][j]);
                }
            }
        }
        return weapons;
    }

    getEnems() {
        const enemies = [];
        for(let i = 0; i < this.height_; i++) {
            for(let j = 0; j < this.width_; j++) {
                if(this.grid_[i][j] instanceof Enemy) {
                    enemies.push(this.grid_[i][j]);
                }
            }
        }
        return enemies;
    }
}