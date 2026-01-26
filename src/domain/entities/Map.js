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

    // generateCorridor() {
    //     const rooms = this.rooms_;
        
    //     const horizontalPairs = [
    //         [0, 1],
    //         [1, 2],
    //         [3, 4],
    //         [4, 5],
    //         [6, 7],
    //         [7, 8] 
    //     ];

    //     for(const [leftIndex, rightIndex] of horizontalPairs) {
    //         const newCorridor = new Corridor();
    //         const leftRoom = rooms[leftIndex];
    //         const rightRoom = rooms[rightIndex];



    //         const leftRoomRandomY = Math.floor(Math.random() * (leftRoom.height - 2)) + 1;
    //         const rightRoomRandomY = Math.floor(Math.random() * (rightRoom.height - 2)) + 1;

    //         const leftRoomX = leftRoom.width - 1;
    //         const rightRoomX = 0;

    //         newCorridor.leftRoom = {
    //             room: leftRoom,
    //             mapY: leftRoomRandomY,
    //             mapX: leftRoomX - 1,
    //         }

    //         newCorridor.rightRoom = {
    //             room: rightRoom,
    //             mapY: rightRoomRandomY,
    //             mapX: rightRoomX + 1,
    //         }
            
    //         const leftRoomMapY = leftRoomRandomY + leftRoom.mapY;
    //         const rightRoomMapY = rightRoomRandomY + rightRoom.mapY;

    //         const leftRoomMapX = leftRoomX + leftRoom.mapX + 1;
    //         const rightRoomMapX = rightRoomX + rightRoom.mapX - 1;

    //         const halfWay = Math.floor((leftRoomMapX + rightRoomMapX) / 2);
            
    //         // Horizontal line from left room
    //         for(let x = leftRoomMapX; x < halfWay; x++) {
    //             newCorridor.corridor.push(
    //                 {
    //                     mapY: leftRoomMapY,
    //                     mapX: x
    //                 }
    //             )

    //             // this.grid_[leftRoomMapY][x] = '#';

    //         }

    //         // Horizontal line from right room


    //         // Vertical connector
    //         if(leftRoomMapY <= rightRoomMapY) {
    //             for(let y = leftRoomMapY; y <= rightRoomMapY; y++) {
    //                 // this.grid_[y][halfWay] = '#';
    //                 newCorridor.corridor.push(
    //                     {
    //                         mapY: y,
    //                         mapX: halfWay
    //                     }
    //                 )
    //             }
    //         } else {
    //             for(let y = rightRoomMapY; y <= leftRoomMapY; y++) {
    //                 // this.grid_[y][halfWay] = '#';
    //                 newCorridor.corridor.push(
    //                     {
    //                         mapY: y,
    //                         mapX: halfWay
    //                     }
    //                 )
    //             }
    //         }
    //         let tempArray = [] 
    //         for(let x = rightRoomMapX; x > halfWay; x--) {
    //             tempArray.push(
    //                 {
    //                     mapY: rightRoomMapY,
    //                     mapX: x
    //                 }
    //             )
    //             // this.grid_[rightRoomMapY][x] = '#';
    //         }
    //         for(let i = tempArray.length; i >= 0; i--) {
    //             newCorridor.corridor.push(tempArray[i]);
    //         }


    //         this.corridors_.push(newCorridor);

    //         newCorridor.left = newCorridor.corridor.length - 1;
    //         leftRoom.grid[leftRoomRandomY][leftRoomX] = newCorridor;
    //         rightRoom.grid[rightRoomRandomY][rightRoomX] = newCorridor;
    //     }

        

    //     const verticalPairs = [
    //         [0, 3],
    //         [3, 6],
    //         [2, 5],
    //         [5, 8] 
    //     ];

    //     for(const [topIndex, bottomIndex] of verticalPairs) {
    //         const newCorridor = new Corridor();
    //         const topRoom = rooms[topIndex];
    //         const bottomRoom = rooms[bottomIndex];

    //         const topRoomRandomX = Math.floor(Math.random() * (topRoom.width - 2)) + 1;
    //         const bottomRoomRandomX = Math.floor(Math.random() * (bottomRoom.width - 2)) + 1;

    //         const topRoomY = topRoom.height - 1;
    //         const bottomRoomY = 0;

    //         newCorridor.leftRoom = {
    //             room: topRoom,
    //             mapY: topRoomY - 1,
    //             mapX: topRoomRandomX,
    //         }

    //         newCorridor.rightRoom = {
    //             room: bottomRoom,
    //             mapY: bottomRoomY + 1,
    //             mapX: bottomRoomRandomX,
    //         }
            
    //         const topRoomMapX = topRoomRandomX + topRoom.mapX;
    //         const bottomRoomMapX = bottomRoomRandomX + bottomRoom.mapX;

    //         const topRoomMapY = topRoomY + topRoom.mapY + 1;
    //         const bottomRoomMapY = bottomRoomY + bottomRoom.mapY - 1;

    //         const halfWay = Math.floor((topRoomMapY + bottomRoomMapY) / 2);
            
    //         // Vertical line from top room down
    //         for(let y = topRoomMapY; y < halfWay; y++) {
    //             newCorridor.corridor.push(
    //                 {
    //                     mapY: y,
    //                     mapX: topRoomMapX
    //                 }
    //             )
    //             // this.grid_[y][topRoomMapX] = '#';
    //         }

    //         // Horizontal connector
    //         if(topRoomMapX <= bottomRoomMapX) {
    //             for(let x = topRoomMapX; x <= bottomRoomMapX; x++) {
    //                 newCorridor.corridor.push(
    //                     {
    //                         mapY: halfWay,
    //                         mapX: x
    //                     }
    //                 )
    //                 // this.grid_[halfWay][x] = '#';
    //             }
    //         } else {
    //             for(let x = bottomRoomMapX; x <= topRoomMapX; x++) {
    //                 newCorridor.corridor.push(
    //                     {
    //                         mapY: halfWay,
    //                         mapX: x
    //                     }
    //                 )
    //                 // this.grid_[halfWay][x] = '#';
    //             }
    //         }

    //         // Vertical line from bottom room up
    //         let tempArray2 = []
    //         for(let y = bottomRoomMapY; y > halfWay; y--) {
    //             tempArray2.push(
    //                 {
    //                     mapY: y,
    //                     mapX: bottomRoomMapX
    //                 }
    //             )
    //             // this.grid_[y][bottomRoomMapX] = '#';
    //         }


    //         for(let i = tempArray2.length; i >= 0; i--) {
    //             newCorridor.corridor.push(tempArray2[i]);
    //         }
            

    //         this.corridors_.push(newCorridor);
    //         newCorridor.left = newCorridor.corridor.length - 1;
    //         topRoom.grid[topRoomY][topRoomRandomX] = newCorridor;
    //         bottomRoom.grid[bottomRoomY][bottomRoomRandomX] = newCorridor;
            
    //     }
    // }

    // Map.js - generateCorridor() funksiyasining yangilangan versiyasi

// Map.js - generateCorridor() funksiyasining yangilangan versiyasi

    generateCorridor() {
        const rooms = this.rooms_;
        
        // ===== GORIZONTAL CORRIDORLAR =====
        const horizontalPairs = [
            [0, 1], [1, 2],  // 1-qator
            [3, 4], [4, 5],  // 2-qator
            [6, 7], [7, 8]   // 3-qator
        ];

        for (const [leftIdx, rightIdx] of horizontalPairs) {
            this.createHorizontalCorridor(rooms[leftIdx], rooms[rightIdx]);
        }

        // ===== VERTIKAL CORRIDORLAR =====
        const verticalPairs = [
            [0, 3], [3, 6],  // 1-ustun
            [2, 5], [5, 8]   // 3-ustun
        ];

        for (const [topIdx, bottomIdx] of verticalPairs) {
            this.createVerticalCorridor(rooms[topIdx], rooms[bottomIdx]);
        }
    }

    /**
     * Gorizontal corridor yaratish (chap-o'ng)
     */
    createHorizontalCorridor(leftRoom, rightRoom) {
        const corridor = new Corridor();

        // Tasodifiy Y pozitsiyalarini tanlash
        const leftY = Math.floor(Math.random() * (leftRoom.height - 2)) + 1;
        const rightY = Math.floor(Math.random() * (rightRoom.height - 2)) + 1;

        // Entry 1: Chap xonaning o'ng devori
        corridor.entry1 = {
            room: leftRoom,
            roomX: leftRoom.width - 1,
            roomY: leftY,
            playerRoomX: leftRoom.width - 2,
            playerRoomY: leftY,
            mapX: leftRoom.mapX + leftRoom.width - 1,
            mapY: leftRoom.mapY + leftY
        };

        // Entry 2: O'ng xonaning chap devori
        corridor.entry2 = {
            room: rightRoom,
            roomX: 0,
            roomY: rightY,
            playerRoomX: 1,
            playerRoomY: rightY,
            mapX: rightRoom.mapX,
            mapY: rightRoom.mapY + rightY
        };

        // Map koordinatalari
        const leftMapX = corridor.entry1.mapX;
        const leftMapY = corridor.entry1.mapY;
        const rightMapX = corridor.entry2.mapX;
        const rightMapY = corridor.entry2.mapY;

        // Yo'lni qurish: chap -> o'rtada -> o'ng
        const midX = Math.floor((leftMapX + rightMapX) / 2);

        // 1. Chapdan o'rtaga (gorizontal)
        for (let x = leftMapX + 1; x <= midX; x++) {
            corridor.addPathPoint(x, leftMapY);
        }

        // 2. O'rtadan pastga/tepaga (vertikal)
        if (leftMapY < rightMapY) {
            for (let y = leftMapY + 1; y <= rightMapY; y++) {
                corridor.addPathPoint(midX, y);
            }
        } else if (leftMapY > rightMapY) {
            for (let y = leftMapY - 1; y >= rightMapY; y--) {
                corridor.addPathPoint(midX, y);
            }
        }

        // 3. O'rtadan o'ngga (gorizontal)
        for (let x = midX + 1; x < rightMapX; x++) {
            corridor.addPathPoint(x, rightMapY);
        }


        // Corridorni xonalarga qo'shish
        leftRoom.grid[leftY][leftRoom.width - 1] = corridor;
        rightRoom.grid[rightY][0] = corridor;
        
        this.corridors_.push(corridor);
    }

    /**
     * Vertikal corridor yaratish (yuqori-pastki)
     */
    createVerticalCorridor(topRoom, bottomRoom) {
        const corridor = new Corridor();

        // Tasodifiy X pozitsiyalarini tanlash
        const topX = Math.floor(Math.random() * (topRoom.width - 2)) + 1;
        const bottomX = Math.floor(Math.random() * (bottomRoom.width - 2)) + 1;

        // Entry 1: Yuqori xonaning pastki devori
        corridor.entry1 = {
            room: topRoom,
            roomX: topX,
            roomY: topRoom.height - 1,
            playerRoomX: topX,
            playerRoomY: topRoom.height - 2,
            mapX: topRoom.mapX + topX,
            mapY: topRoom.mapY + topRoom.height - 1
        };

        // Entry 2: Pastki xonaning yuqori devori
        corridor.entry2 = {
            room: bottomRoom,
            roomX: bottomX,
            roomY: 0,
            playerRoomX: bottomX,
            playerRoomY: 1,
            mapX: bottomRoom.mapX + bottomX,
            mapY: bottomRoom.mapY
        };

        // Map koordinatalari
        const topMapX = corridor.entry1.mapX;
        const topMapY = corridor.entry1.mapY;
        const bottomMapX = corridor.entry2.mapX;
        const bottomMapY = corridor.entry2.mapY;

        // Yo'lni qurish: yuqori -> o'rtada -> pastki
        const midY = Math.floor((topMapY + bottomMapY) / 2);

        // 1. Yuqoridan o'rtaga
        for (let y = topMapY + 1; y <= midY; y++) {
            corridor.addPathPoint(topMapX, y);
        }

        // 2. O'rtada gorizontal
        if (topMapX < bottomMapX) {
            for (let x = topMapX + 1; x <= bottomMapX; x++) {
                corridor.addPathPoint(x, midY);
            }
        } else if (topMapX > bottomMapX) {
            for (let x = topMapX - 1; x >= bottomMapX; x--) {
                corridor.addPathPoint(x, midY);
            }
        }

        // 3. O'rtadan pastga
        for (let y = midY + 1; y < bottomMapY; y++) {
            corridor.addPathPoint(bottomMapX, y);
        }

        // Corridorni xonalarga qo'shish
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


