// src/domain/entities/Map.js


const ROOMS_IN_WIDTH = 3;
const ROOMS_IN_HEIGHT = 3;
const ROOMS_NUM = ROOMS_IN_HEIGHT * ROOMS_IN_WIDTH;
const REGION_WIDTH = 69;
const REGION_HEIGHT = 14;
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
import { Corridor } from "./Corridor.js"; 



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
    get corridors() { return this.corridors_; }

    generateCorridor() {
        const rooms = this.rooms_;
        
        const horizontalPairs = [
            [0, 1], [1, 2], 
            [3, 4], [4, 5], 
            [6, 7], [7, 8]  
        ];

        for (const [leftIdx, rightIdx] of horizontalPairs) {
            this.createHorizontalCorridor(rooms[leftIdx], rooms[rightIdx]);
        }

        const verticalPairs = [
            [0, 3], [3, 6],  
            [2, 5], [5, 8]   
        ];

        for (const [topIdx, bottomIdx] of verticalPairs) {
            this.createVerticalCorridor(rooms[topIdx], rooms[bottomIdx]);
        }
    }

    createHorizontalCorridor(leftRoom, rightRoom) {
        const corridor = new Corridor();

        const leftY = Math.floor(Math.random() * (leftRoom.height - 2)) + 1;
        const rightY = Math.floor(Math.random() * (rightRoom.height - 2)) + 1;

        corridor.entry1 = {
            room: leftRoom,
            roomX: leftRoom.width - 1,
            roomY: leftY,
            playerRoomX: leftRoom.width - 2,
            playerRoomY: leftY,
            mapX: leftRoom.mapX + leftRoom.width - 1,
            mapY: leftRoom.mapY + leftY
        };

        corridor.entry2 = {
            room: rightRoom,
            roomX: 0,
            roomY: rightY,
            playerRoomX: 1,
            playerRoomY: rightY,
            mapX: rightRoom.mapX,
            mapY: rightRoom.mapY + rightY
        };

        const leftMapX = corridor.entry1.mapX;
        const leftMapY = corridor.entry1.mapY;
        const rightMapX = corridor.entry2.mapX;
        const rightMapY = corridor.entry2.mapY;

        const midX = Math.floor((leftMapX + rightMapX) / 2);

        for (let x = leftMapX + 1; x <= midX; x++) {
            corridor.addPathPoint(x, leftMapY);
        }

        if (leftMapY < rightMapY) {
            for (let y = leftMapY + 1; y <= rightMapY; y++) {
                corridor.addPathPoint(midX, y);
            }
        } else if (leftMapY > rightMapY) {
            for (let y = leftMapY - 1; y >= rightMapY; y--) {
                corridor.addPathPoint(midX, y);
            }
        }

        for (let x = midX + 1; x < rightMapX; x++) {
            corridor.addPathPoint(x, rightMapY);
        }


        leftRoom.grid[leftY][leftRoom.width - 1] = corridor;
        rightRoom.grid[rightY][0] = corridor;
        
        this.corridors_.push(corridor);
    }


    createVerticalCorridor(topRoom, bottomRoom) {
        const corridor = new Corridor();

        const topX = Math.floor(Math.random() * (topRoom.width - 2)) + 1;
        const bottomX = Math.floor(Math.random() * (bottomRoom.width - 2)) + 1;

        corridor.entry1 = {
            room: topRoom,
            roomX: topX,
            roomY: topRoom.height - 1,
            playerRoomX: topX,
            playerRoomY: topRoom.height - 2,
            mapX: topRoom.mapX + topX,
            mapY: topRoom.mapY + topRoom.height - 1
        };

        corridor.entry2 = {
            room: bottomRoom,
            roomX: bottomX,
            roomY: 0,
            playerRoomX: bottomX,
            playerRoomY: 1,
            mapX: bottomRoom.mapX + bottomX,
            mapY: bottomRoom.mapY
        };

        const topMapX = corridor.entry1.mapX;
        const topMapY = corridor.entry1.mapY;
        const bottomMapX = corridor.entry2.mapX;
        const bottomMapY = corridor.entry2.mapY;

        const midY = Math.floor((topMapY + bottomMapY) / 2);

        for (let y = topMapY + 1; y <= midY; y++) {
            corridor.addPathPoint(topMapX, y);
        }

        if (topMapX < bottomMapX) {
            for (let x = topMapX + 1; x <= bottomMapX; x++) {
                corridor.addPathPoint(x, midY);
            }
        } else if (topMapX > bottomMapX) {
            for (let x = topMapX - 1; x >= bottomMapX; x--) {
                corridor.addPathPoint(x, midY);
            }
        }

        for (let y = midY + 1; y < bottomMapY; y++) {
            corridor.addPathPoint(bottomMapX, y);
        }

        topRoom.grid[topRoom.height - 1][topX] = corridor;
        bottomRoom.grid[0][bottomX] = corridor;
        
        this.corridors_.push(corridor);
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
        // const rooms = this.rooms_;
        // console.log(rooms1);
        const rooms = this.rooms_.filter(room => room.isVisible === true);
        for(let i = 0; i < rooms.length; i++) {
            const room = rooms[i];
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
                    } else if(room.grid[ry][rx] instanceof Corridor) {
                        this.grid_[mapY][mapX] = '+';
                    } else {
                        this.grid_[mapY][mapX] = ' ';
                    }
                }
            }
        }

        // this.drawCorridor();
    }

    drawCorridor() {
        const corridors = this.corridors_;
        for(let i = 0; i < corridors.length; i++) {
            const corridor = corridors[i].path;
            for(let j = 0; j < corridor.length; j++) {
                this.grid_[corridor[j].mapY][corridor[j].mapX] = '#';
            }
        }
    }

}


