// src/domain/entities/Map.js


const ROOMS_IN_WIDTH = 3;
const ROOMS_IN_HEIGHT = 3;
const ROOMS_NUM = ROOMS_IN_HEIGHT * ROOMS_IN_WIDTH;
const REGION_WIDTH = 27;
const REGION_HEIGHT = 10;
const MIN_ROOM_WIDTH = 6;
const MAX_ROOM_WIDTH = REGION_WIDTH - 2;
const MIN_ROOM_HEIGHT = 5;
const MAX_ROOM_HEIGHT = REGION_HEIGHT - 2;

import { Room } from "./Room.js"

export class Map {
    constructor() {
        this.viewRooms_ = [];
        this.notViewRooms_ = [];

        this.generateRooms();
    }

    get viewRooms() { return this.viewRooms_; }

    /**
     * @returns { Array<Room> }
     */
    get notViewRooms() { return this.notViewRooms_; }

    generateRooms() {
        for(let i = 0; i < ROOMS_NUM; i++) {
            const roomWidth = Math.floor(Math.random() * (MAX_ROOM_WIDTH - MIN_ROOM_WIDTH + 1) + MIN_ROOM_WIDTH);
            const roomHeight = Math.floor(Math.random() * (MAX_ROOM_HEIGHT - MIN_ROOM_HEIGHT + 1) + MIN_ROOM_HEIGHT);
            const room = new Room(roomWidth, roomHeight);
            this.notViewRooms_.push(room);
        }
    }
}