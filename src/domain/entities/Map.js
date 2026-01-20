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
        this.viewRooms_ = [];
        this.notViewRooms_ = [];

        this.grid_ = Array.from(
            { length: MAP_HEIGHT },
            () => Array(MAP_WIDTH).fill(' ')
        );

        this.generateRooms();
        this.placeRooms();
    }


    /**
     * @returns { Array<Room> }
     */
    get viewRooms() { return this.viewRooms_; }

    /**
     * @returns { Array<Room> }
     */
    get notViewRooms() { return this.notViewRooms_; }

    get grid() { return this.grid_; }

    generateRooms() {
        for(let i = 0; i < ROOMS_NUM; i++) {
            const roomWidth = Math.floor(Math.random() * (MAX_ROOM_WIDTH - MIN_ROOM_WIDTH + 1) + MIN_ROOM_WIDTH);
            const roomHeight = Math.floor(Math.random() * (MAX_ROOM_HEIGHT - MIN_ROOM_HEIGHT + 1) + MIN_ROOM_HEIGHT);
            const room = new Room(roomWidth, roomHeight);
            this.notViewRooms_.push(room);
        }
    }

    placeRooms() {
        let index = 0;

        for (let ry = 0; ry < ROOMS_IN_HEIGHT; ry++) {
            for (let rx = 0; rx < ROOMS_IN_WIDTH; rx++) {

                const room = this.notViewRooms[index++];

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

    drawRooms() {
        for(let i = 0; i < this.notViewRooms.length; i++) {
            const room = this.notViewRooms[i];
            room.refreshRoom();
            
            for(let ry = 0; ry < room.height; ry++) {
                for(let rx = 0; rx < room.width; rx++) {
                    const mapY = room.mapY + ry;
                    const mapX = room.mapX + rx;
                    
                    if(room.grid[ry][rx] === 1) {
                        this.grid_[mapY][mapX] = '#';
                    } else if(room.grid[ry][rx] instanceof Enemy) {
                        this.grid_[mapY][mapX] = room.grid[ry][rx].char;
                    } else if(room.grid[ry][rx] instanceof Weapon) {
                        this.grid_[mapY][mapX] = ')';
                    } else if(room.grid[ry][rx] instanceof Player) {
                        this.grid_[mapY][mapX] = '@';
                    } else {
                        this.grid_[mapY][mapX] = ' ';
                    }
                }
            }
        }
    }

}