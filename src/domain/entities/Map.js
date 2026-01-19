// src/domain/entities/Map.js


const ROOMS_IN_WIDTH = 3;
const ROOMS_IN_HEIGHT = 3;
const ROOMS_NUM = ROOMS_IN_HEIGHT * ROOMS_IN_WIDTH;
const REGION_WIDTH = 65;
const REGION_HEIGHT = 13;
const MIN_ROOM_WIDTH = 6;
const MAX_ROOM_WIDTH = REGION_WIDTH - 2;
const MIN_ROOM_HEIGHT = 5;
const MAX_ROOM_HEIGHT = REGION_HEIGHT - 2;
const MAP_WIDTH = ROOMS_IN_WIDTH * REGION_WIDTH;
const MAP_HEIGHT = ROOMS_IN_HEIGHT * REGION_HEIGHT;


import { Room } from "./Room.js"
import { Weapon } from "../entities/Weapon.js"
import { Enemy } from "../entities/Enemy.js"
import { Player } from "../entities/Player.js"  

export class Map {
    constructor() {
        // this.viewRooms_ = [];
        // this.notViewRooms_ = [];

        this.grid_ = Array.from(
            { length: MAP_HEIGHT },
            () => Array(MAP_WIDTH).fill(' ')
        );

        this.rooms_ = [];
        this.generateRooms();
        this.placeRooms();
        this.connectRooms();
    }

    printMap() {
        for(let i = 0; i < MAP_HEIGHT; i++) {
            let temp = ''
            for(let j = 0; j < MAP_WIDTH; j++) {
                temp += this.grid_[i][j];
            }
            console.log(temp); 
        }
        // console.log(this.grid_);
    }

    // /**
    //  * @returns { Array<Room> }
    //  */
    // get viewRooms() { return this.viewRooms_; }

    // /**
    //  * @returns { Array<Room> }
    //  */
    // get notViewRooms() { return this.notViewRooms_; }

    get rooms() { return this.rooms_; }
    get grid() { return this.grid_; }

    generateRooms() {
        for(let i = 0; i < ROOMS_NUM; i++) {
            const roomWidth = Math.floor(Math.random() * (MAX_ROOM_WIDTH - MIN_ROOM_WIDTH + 1) + MIN_ROOM_WIDTH);
            const roomHeight = Math.floor(Math.random() * (MAX_ROOM_HEIGHT - MIN_ROOM_HEIGHT + 1) + MIN_ROOM_HEIGHT);
            const room = new Room(roomWidth, roomHeight);
            this.rooms_.push(room);
        }
    }

    placeRooms() {
        let index = 0;

        for (let ry = 0; ry < ROOMS_IN_HEIGHT; ry++) {
            for (let rx = 0; rx < ROOMS_IN_WIDTH; rx++) {

                const room = this.rooms_[index++];

                const offsetX = rx * REGION_WIDTH;
                const offsetY = ry * REGION_HEIGHT;

                const x = offsetX + Math.floor(
                    (REGION_WIDTH - room.width) / 2
                );
                const y = offsetY + Math.floor(
                    (REGION_HEIGHT - room.height) / 2
                );

                room.mapX = x;
                room.mapY = y;
            }
        }
    }

    drawRoom(room) {
        for (let y = 0; y < room.height; y++) {
            for (let x = 0; x < room.width; x++) {
                const mapX = room.mapX + x;
                const mapY = room.mapY + y;
                if(room.grid[y][x] === 1) {
                    this.grid_[mapY][mapX] = "#";
                } else if(room.grid[y][x] instanceof Enemy) {
                    this.grid_[mapY][mapX] = "E";
                } else if(room.grid[y][x] instanceof Weapon) {
                    this.grid_[mapY][mapX] = "W";
                } else if(room.grid[y][x] instanceof Player) {
                    this.grid_[mapY][mapX] = "@";
                } else {
                    this.grid_[mapY][mapX] = ".";
                }
            }
        }
    }

    connectRooms() {
        for (let i = 1; i < this.rooms_.length; i++) {
            const prev = this.getCenter(this.rooms_[i - 1]);
            const curr = this.getCenter(this.rooms_[i]);

            this.hCorridor(prev.x, curr.x, prev.y);
            this.vCorridor(prev.y, curr.y, curr.x);
        }
    }

    getCenter(room) {
        return {
            x: room.mapX + Math.floor(room.width / 2),
            y: room.mapY + Math.floor(room.height / 2)
        };
    }

    hCorridor(x1, x2, y) {
        for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
            if (this.grid_[y][x] === ' ') {
                // this.grid_[y][x] = '+';
            }
        }
    }

    vCorridor(y1, y2, x) {
        for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
            if (this.grid_[y][x] === ' ') {
                // this.grid_[y][x] = '+';
            }
        }
    }

}