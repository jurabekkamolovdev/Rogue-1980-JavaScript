// src/domain/entities/Corridor.js


export class Corridor {
    constructor() {
        
        this.entry1_ = {
            room: null,       
            roomX: 0,          
            roomY: 0,          
            playerRoomX: 0,
            playerRoomY: 0,
            mapX: 0,           
            mapY: 0            
        };

        this.entry2_ = {
            room: null,
            roomX: 0,
            roomY: 0,
            playerRoomX: 0,
            playerRoomY: 0,
            mapX: 0,
            mapY: 0
        };

        
        this.path_ = [];
    }

    get entry1() { return this.entry1_; }
    get entry2() { return this.entry2_; }
    get path() { return this.path_; }

    set entry1(value) { this.entry1_ = value; }
    set entry2(value) { this.entry2_ = value; }

    /**
     * @param {Room} currentRoom - Hozirgi xona
     * @returns {{entry: Object, exit: Object, entryIndex: number, exitIndex: number}}
     */
    getEntryExitForRoom(currentRoom) {
        if (this.entry1_.room === currentRoom) {
            return {
                entry: this.entry1_,
                exit: this.entry2_,
                entryIndex: 0,
                exitIndex: this.path_.length - 1
            };
        } else if (this.entry2_.room === currentRoom) {
            return {
                entry: this.entry2_,
                exit: this.entry1_,
                entryIndex: this.path_.length - 1,
                exitIndex: 0
            };
        }
        return null;
    }

    /**
     * @param {number} mapX 
     * @param {number} mapY 
     * @returns {number} - path massividagi indeks yoki -1
     */
    getPathIndex(mapX, mapY) {
        return this.path_.findIndex(p => p.mapX === mapX && p.mapY === mapY);
    }

    /**
     * @param {number} mapX 
     * @param {number} mapY 
     */
    addPathPoint(mapX, mapY) {
        this.path_.push({ mapX, mapY });
    }

    /**
     * @param {number} mapX 
     * @param {number} mapY 
     * @returns {{next: Object|null, prev: Object|null, index: number}}
     */
    getAdjacentPoints(mapX, mapY) {
        const index = this.getPathIndex(mapX, mapY);
        if (index === -1) return null;

        return {
            next: index < this.path_.length - 1 ? this.path_[index + 1] : null,
            prev: index > 0 ? this.path_[index - 1] : null,
            index: index
        };
    }
}