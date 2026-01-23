// src/domain/entities/Map.js


const ROOMS_IN_WIDTH = 3;
const ROOMS_IN_HEIGHT = 3;
const ROOMS_NUM = ROOMS_IN_HEIGHT * ROOMS_IN_WIDTH;
const REGION_WIDTH = 69;
const REGION_HEIGHT = 15;
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
        this.rooms_ = [];
        this.corridors_ = [];
        this.grid_ = Array.from(
            { length: MAP_HEIGHT },
            () => Array(MAP_WIDTH).fill(' ')
        );

        this.generateRooms();
        this.placeRooms();
        this.generateCorridor();
    }

    /**
     * @returns { Room }
     */
    get rooms() { return this.rooms_; }

    get grid() { return this.grid_; }

    generateCorridor() {
        const rooms = this.rooms_;
        let temp = 0;
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 2; j++) {
                const indexRoom = i + j + temp;
                const firstRoom = rooms[indexRoom];
                const secondRoom = rooms[indexRoom + 1];

                const firstRoomRandomY = Math.floor(Math.random() * (firstRoom.height - 2)) + 1;
                const secondRoomRandomY = Math.floor(Math.random() * (secondRoom.height - 2)) + 1;

                const firstRoomX = firstRoom.width;
                const secondRoomX = 0;
                
                const firstRoomMapY = firstRoomRandomY + firstRoom.mapY;
                const secondRoomMapY = secondRoomRandomY + secondRoom.mapY;

                const firstRoomMapX = firstRoomX + firstRoom.mapX;
                const secondRoomMapX = secondRoomX + secondRoom.mapX;

                const firstHalfWay = Math.floor((firstRoomMapX + secondRoomMapX) / 2);
                for(let f = firstRoomMapX; f < firstHalfWay; f++) {
                    this.grid_[firstRoomMapY][f] = '#';
                }

                for(let f = secondRoomMapX; f > firstHalfWay; f--) {
                    this.grid_[secondRoomMapY][f] = '#';
                }


                if(firstRoomMapY <= secondRoomMapY) {
                    for(let f = firstRoomMapY; f <= secondRoomMapY; f++) {
                        this.grid_[f][firstHalfWay] = '#';
                    }
                } else {
                    for(let f = secondRoomMapY; f <= firstRoomMapY; f++) {
                        this.grid_[f][firstHalfWay] = '#';
                    }
                }


                


            }
            temp += 2;
        }

    }

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

    drawRooms() {
        const rooms = this.rooms_;
        // console.log(rooms1);
        // const rooms = this.rooms_.filter(room => room.isVisible === true);
        for(let i = 0; i < rooms.length; i++) {
            const room = rooms[i];
            room.refreshRoom();
            
            for(let ry = 0; ry < room.height; ry++) {
                for(let rx = 0; rx < room.width; rx++) {
                    const mapY = room.mapY + ry;
                    const mapX = room.mapX + rx;
                    
                    if(room.grid[ry][rx] === 1) {
                        this.grid_[mapY][mapX] = `${i + 1}`;
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


