// src/domain/entities/Corridor.js

/**
 * Corridor - ikki xonani bog'lovchi yo'lak
 * 
 * Asosiy g'oya:
 * - Har bir corridor ikki xonani bog'laydi (entry1 va entry2)
 * - corridor massivi yo'lak nuqtalarini ketma-ket saqlaydi
 * - Player corridor ichida harakat qilishi mumkin
 */
export class Corridor {
    constructor() {
        // Birinchi kirish joyi (xona 1)
        this.entry1_ = {
            room: null,        // Room ob'ekti
            roomX: 0,          // Room ichidagi X koordinata
            roomY: 0,          // Room ichidagi Y koordinata
            playerRoomX: 0,
            playerRoomY: 0,
            mapX: 0,           // Umumiy map'dagi X koordinata
            mapY: 0            // Umumiy map'dagi Y koordinata
        };

        // Ikkinchi kirish joyi (xona 2)
        this.entry2_ = {
            room: null,
            roomX: 0,
            roomY: 0,
            playerRoomX: 0,
            playerRoomY: 0,
            mapX: 0,
            mapY: 0
        };

        // Yo'lak nuqtalari (entry1 dan entry2 ga qarab ketma-ket)
        this.path_ = [];
    }

    // Getters
    get entry1() { return this.entry1_; }
    get entry2() { return this.entry2_; }
    get path() { return this.path_; }

    // Setters
    set entry1(value) { this.entry1_ = value; }
    set entry2(value) { this.entry2_ = value; }

    /**
     * Berilgan xona uchun kirish va chiqish nuqtalarini aniqlaydi
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
     * Berilgan pozitsiya yo'lakda ekanligini tekshiradi
     * @param {number} mapX 
     * @param {number} mapY 
     * @returns {number} - path massividagi indeks yoki -1
     */
    getPathIndex(mapX, mapY) {
        return this.path_.findIndex(p => p.mapX === mapX && p.mapY === mapY);
    }

    /**
     * Yo'lakka nuqta qo'shadi
     * @param {number} mapX 
     * @param {number} mapY 
     */
    addPathPoint(mapX, mapY) {
        this.path_.push({ mapX, mapY });
    }

    /**
     * Path'dagi keyingi/oldingi nuqtani topish
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