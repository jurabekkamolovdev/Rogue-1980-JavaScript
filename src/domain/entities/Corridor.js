// src/domain/entities/Corridor.js


export class Corridor {
    constructor() {
        this.leftRoom_ = {
            room: null,
            mapY: 0,
            mapX: 0,
        };

        this.rightRoom_ = {
            room: null,
            mapY: 0,
            mapX: 0,
        };

        this.corridor_ = [];
    }

    get corridor() { return this.corridor_; }

    get leftRoom() { return this.leftRoom_; }
    get rightRoom() { return this.rightRoom_; }

    set leftRoom(value) { this.leftRoom_ = value; }
    set rightRoom(value) { this.rightRoom_ = value; }
}