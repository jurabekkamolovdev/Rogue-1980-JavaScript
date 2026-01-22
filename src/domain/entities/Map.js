// // src/domain/entities/Map.js


// const ROOMS_IN_WIDTH = 3;
// const ROOMS_IN_HEIGHT = 3;
// const ROOMS_NUM = ROOMS_IN_HEIGHT * ROOMS_IN_WIDTH;
// const REGION_WIDTH = 65;
// const REGION_HEIGHT = 13;
// const MIN_ROOM_WIDTH = 6;
// const MAX_ROOM_WIDTH = REGION_WIDTH - 2;
// const MIN_ROOM_HEIGHT = 5;
// const MAX_ROOM_HEIGHT = REGION_HEIGHT - 2;
// const MAP_WIDTH = ROOMS_IN_WIDTH * REGION_WIDTH;
// const MAP_HEIGHT = ROOMS_IN_HEIGHT * REGION_HEIGHT;


// import { Room } from "./Room.js"
// import { Weapon } from "../entities/Weapon.js"
// import { Enemy } from "../entities/Enemy.js"
// import { Player } from "../entities/Player.js"  

// export class Map {
//     constructor() {
//         this.viewRooms_ = [];
//         this.notViewRooms_ = [];

//         this.grid_ = Array.from(
//             { length: MAP_HEIGHT },
//             () => Array(MAP_WIDTH).fill(' ')
//         );

//         this.generateRooms();
//         this.placeRooms();
//     }


//     /**
//      * @returns { Array<Room> }
//      */
//     get viewRooms() { return this.viewRooms_; }

//     /**
//      * @returns { Array<Room> }
//      */
//     get notViewRooms() { return this.notViewRooms_; }

//     get grid() { return this.grid_; }

//     generateRooms() {
//         for(let i = 0; i < ROOMS_NUM; i++) {
//             const roomWidth = Math.floor(Math.random() * (MAX_ROOM_WIDTH - MIN_ROOM_WIDTH + 1) + MIN_ROOM_WIDTH);
//             const roomHeight = Math.floor(Math.random() * (MAX_ROOM_HEIGHT - MIN_ROOM_HEIGHT + 1) + MIN_ROOM_HEIGHT);
//             const room = new Room(roomWidth, roomHeight);
//             this.notViewRooms_.push(room);
//         }
//     }

//     placeRooms() {
//         let index = 0;

//         for (let ry = 0; ry < ROOMS_IN_HEIGHT; ry++) {
//             for (let rx = 0; rx < ROOMS_IN_WIDTH; rx++) {

//                 const room = this.notViewRooms[index++];

//                 const offsetX = rx * REGION_WIDTH;
//                 const offsetY = ry * REGION_HEIGHT;

//                 const x = offsetX + Math.floor(
//                     (REGION_WIDTH - room.width) / 2
//                 );
//                 const y = offsetY + Math.floor(
//                     (REGION_HEIGHT - room.height) / 2
//                 );

//                 room.mapX = x;
//                 room.mapY = y;
//             }
//         }
//     }

//     drawRooms() {
//         for(let i = 0; i < this.notViewRooms.length; i++) {
//             const room = this.notViewRooms[i];
//             room.refreshRoom();
            
//             for(let ry = 0; ry < room.height; ry++) {
//                 for(let rx = 0; rx < room.width; rx++) {
//                     const mapY = room.mapY + ry;
//                     const mapX = room.mapX + rx;
                    
//                     if(room.grid[ry][rx] === 1) {
//                         this.grid_[mapY][mapX] = '#';
//                     } else if(room.grid[ry][rx] instanceof Enemy) {
//                         this.grid_[mapY][mapX] = room.grid[ry][rx].char;
//                     } else if(room.grid[ry][rx] instanceof Weapon) {
//                         this.grid_[mapY][mapX] = ')';
//                     } else if(room.grid[ry][rx] instanceof Player) {
//                         this.grid_[mapY][mapX] = '@';
//                     } else {
//                         this.grid_[mapY][mapX] = ' ';
//                     }
//                 }
//             }
//         }
//     }

// }


// src/domain/entities/Map.js

// const ROOMS_IN_WIDTH = 3;
// const ROOMS_IN_HEIGHT = 3;
// const ROOMS_NUM = ROOMS_IN_HEIGHT * ROOMS_IN_WIDTH;
// const REGION_WIDTH = 65;
// const REGION_HEIGHT = 13;
// const MIN_ROOM_WIDTH = 6;
// const MAX_ROOM_WIDTH = REGION_WIDTH - 2;
// const MIN_ROOM_HEIGHT = 5;
// const MAX_ROOM_HEIGHT = REGION_HEIGHT - 2;
// const MAP_WIDTH = ROOMS_IN_WIDTH * REGION_WIDTH;
// const MAP_HEIGHT = ROOMS_IN_HEIGHT * REGION_HEIGHT;

// import { Room } from "./Room.js"
// import { Weapon } from "../entities/Weapon.js"
// import { Enemy } from "../entities/Enemy.js"
// import { Player } from "../entities/Player.js"  

// export class Map {
//     constructor() {
//         this.viewRooms_ = [];
//         this.notViewRooms_ = [];
//         this.corridors_ = [];

//         this.grid_ = Array.from(
//             { length: MAP_HEIGHT },
//             () => Array(MAP_WIDTH).fill(' ')
//         );

//         this.generateRooms();
//         this.placeRooms();
//     }

//     get viewRooms() { return this.viewRooms_; }
//     get notViewRooms() { return this.notViewRooms_; }
//     get grid() { return this.grid_; }

//     generateRooms() {
//         for(let i = 0; i < ROOMS_NUM; i++) {
//             const roomWidth = Math.floor(Math.random() * (MAX_ROOM_WIDTH - MIN_ROOM_WIDTH + 1) + MIN_ROOM_WIDTH);
//             const roomHeight = Math.floor(Math.random() * (MAX_ROOM_HEIGHT - MIN_ROOM_HEIGHT + 1) + MIN_ROOM_HEIGHT);
//             const room = new Room(roomWidth, roomHeight);
//             room.gridIndex = i;
//             this.notViewRooms_.push(room);
//         }
//     }

//     placeRooms() {
//         let index = 0;

//         for (let ry = 0; ry < ROOMS_IN_HEIGHT; ry++) {
//             for (let rx = 0; rx < ROOMS_IN_WIDTH; rx++) {
//                 const room = this.notViewRooms[index++];

//                 const offsetX = rx * REGION_WIDTH;
//                 const offsetY = ry * REGION_HEIGHT;

//                 const x = offsetX + Math.floor((REGION_WIDTH - room.width) / 2);
//                 const y = offsetY + Math.floor((REGION_HEIGHT - room.height) / 2);

//                 room.mapX = x;
//                 room.mapY = y;
//                 room.regionX = rx;
//                 room.regionY = ry;
//             }
//         }
//     }

//     createCorridors() {
//         // Gorizontal koridorlar (chapdan o'ngga)
//         for(let ry = 0; ry < ROOMS_IN_HEIGHT; ry++) {
//             for(let rx = 0; rx < ROOMS_IN_WIDTH - 1; rx++) {
//                 const roomIndex1 = ry * ROOMS_IN_WIDTH + rx;
//                 const roomIndex2 = ry * ROOMS_IN_WIDTH + (rx + 1);
                
//                 const room1 = this.notViewRooms[roomIndex1];
//                 const room2 = this.notViewRooms[roomIndex2];
                
//                 this.createHorizontalCorridor(room1, room2);
//             }
//         }

//         // Vertikal koridorlar (tepadan pastga)
//         for(let ry = 0; ry < ROOMS_IN_HEIGHT - 1; ry++) {
//             for(let rx = 0; rx < ROOMS_IN_WIDTH; rx++) {
//                 const roomIndex1 = ry * ROOMS_IN_WIDTH + rx;
//                 const roomIndex2 = (ry + 1) * ROOMS_IN_WIDTH + rx;
                
//                 const room1 = this.notViewRooms[roomIndex1];
//                 const room2 = this.notViewRooms[roomIndex2];
                
//                 this.createVerticalCorridor(room1, room2);
//             }
//         }
//     }

//     createHorizontalCorridor(room1, room2) {
//         // O'ng tomondagi xona devorining o'rtasida
//         const y = Math.floor(room1.height / 2);
//         const x1 = room1.width - 1;
        
//         // Chap tomondagi xona devorining o'rtasida
//         const x2 = 0;
        
//         // Corridor belgilari
//         room1.grid[y][x1] = '+';
//         room2.grid[y][x2] = '+';
        
//         // Koridorni saqlaymiz
//         this.corridors_.push({
//             room1,
//             room2,
//             x1: room1.mapX + x1,
//             y1: room1.mapY + y,
//             x2: room2.mapX + x2,
//             y2: room2.mapY + y,
//             direction: 'horizontal'
//         });
//     }

//     createVerticalCorridor(room1, room2) {
//         // Pastki devorning o'rtasida
//         const x = Math.floor(room1.width / 2);
//         const y1 = room1.height - 1;
        
//         // Yuqori devorning o'rtasida
//         const y2 = 0;
        
//         // Corridor belgilari
//         room1.grid[y1][x] = '+';
//         room2.grid[y2][x] = '+';
        
//         // Koridorni saqlaymiz
//         this.corridors_.push({
//             room1,
//             room2,
//             x1: room1.mapX + x,
//             y1: room1.mapY + y1,
//             x2: room2.mapX + x,
//             y2: room2.mapY + y2,
//             direction: 'vertical'
//         });
//     }

//     getRoomAtCorridor(currentRoom, localX, localY) {
//         // Joriy xonadagi corridor belgisi
//         if(currentRoom.grid[localY][localX] !== '+') return null;
        
//         // Koridorni topamiz
//         const corridor = this.corridors_.find(c => {
//             const globalX = currentRoom.mapX + localX;
//             const globalY = currentRoom.mapY + localY;
            
//             return (c.room1 === currentRoom && c.x1 === globalX && c.y1 === globalY) ||
//                    (c.room2 === currentRoom && c.x2 === globalX && c.y2 === globalY);
//         });
        
//         if(!corridor) return null;
        
//         // Boshqa xonani qaytaramiz
//         return corridor.room1 === currentRoom ? corridor.room2 : corridor.room1;
//     }

//     drawRooms() {
//         // Avval hamma joyni bo'sh qilamiz
//         for(let i = 0; i < MAP_HEIGHT; i++) {
//             for(let j = 0; j < MAP_WIDTH; j++) {
//                 this.grid_[i][j] = ' ';
//             }
//         }

//         // Faqat visible xonalarni chizamiz
//         for(let i = 0; i < this.notViewRooms.length; i++) {
//             const room = this.notViewRooms[i];
            
//             if(!room.isVisible) continue; // Ko'rinmaydigan xonalarni o'tkazib yuboramiz
            
//             room.refreshRoom();
            
//             for(let ry = 0; ry < room.height; ry++) {
//                 for(let rx = 0; rx < room.width; rx++) {
//                     const mapY = room.mapY + ry;
//                     const mapX = room.mapX + rx;
                    
//                     if(room.grid[ry][rx] === 1) {
//                         this.grid_[mapY][mapX] = '#';
//                     } else if(room.grid[ry][rx] === '+') {
//                         this.grid_[mapY][mapX] = '+';
//                     } else if(room.grid[ry][rx] instanceof Enemy) {
//                         this.grid_[mapY][mapX] = room.grid[ry][rx].char;
//                     } else if(room.grid[ry][rx] instanceof Weapon) {
//                         this.grid_[mapY][mapX] = ')';
//                     } else if(room.grid[ry][rx] instanceof Player) {
//                         this.grid_[mapY][mapX] = '@';
//                     } else {
//                         this.grid_[mapY][mapX] = ' ';
//                     }
//                 }
//             }
//         }

//         // Koridorlarni chizamiz (visible xonalar orasida)
//         this.corridors_.forEach(corridor => {
//             if(!corridor.room1.isVisible && !corridor.room2.isVisible) return;
            
//             if(corridor.direction === 'horizontal') {
//                 const y = corridor.y1;
//                 for(let x = corridor.x1 + 1; x < corridor.x2; x++) {
//                     this.grid_[y][x] = '#';
//                 }
//             } else {
//                 const x = corridor.x1;
//                 for(let y = corridor.y1 + 1; y < corridor.y2; y++) {
//                     this.grid_[y][x] = '#';
//                 }
//             }
//         });
//     }
// }



// src/domain/entities/Map.js

// const ROOMS_IN_WIDTH = 3;
// const ROOMS_IN_HEIGHT = 3;
// const ROOMS_NUM = ROOMS_IN_HEIGHT * ROOMS_IN_WIDTH;
// const REGION_WIDTH = 65;
// const REGION_HEIGHT = 13;
// const MIN_ROOM_WIDTH = 6;
// const MAX_ROOM_WIDTH = REGION_WIDTH - 2;
// const MIN_ROOM_HEIGHT = 5;
// const MAX_ROOM_HEIGHT = REGION_HEIGHT - 2;
// const MAP_WIDTH = ROOMS_IN_WIDTH * REGION_WIDTH;
// const MAP_HEIGHT = ROOMS_IN_HEIGHT * REGION_HEIGHT;

// import { Room } from "./Room.js"
// import { Weapon } from "../entities/Weapon.js"
// import { Enemy } from "../entities/Enemy.js"
// import { Player } from "../entities/Player.js"  

// export class Map {
//     constructor() {
//         this.viewRooms_ = [];
//         this.notViewRooms_ = [];
//         this.corridors_ = [];
//         this.exploredTiles_ = new Set(); // Fog of War uchun

//         this.grid_ = Array.from(
//             { length: MAP_HEIGHT },
//             () => Array(MAP_WIDTH).fill(' ')
//         );

//         this.generateRooms();
//         this.placeRooms();
//     }

//     get viewRooms() { return this.viewRooms_; }
//     get notViewRooms() { return this.notViewRooms_; }
//     get grid() { return this.grid_; }

//     generateRooms() {
//         for(let i = 0; i < ROOMS_NUM; i++) {
//             const roomWidth = Math.floor(Math.random() * (MAX_ROOM_WIDTH - MIN_ROOM_WIDTH + 1) + MIN_ROOM_WIDTH);
//             const roomHeight = Math.floor(Math.random() * (MAX_ROOM_HEIGHT - MIN_ROOM_HEIGHT + 1) + MIN_ROOM_HEIGHT);
//             const room = new Room(roomWidth, roomHeight);
//             room.gridIndex = i;
//             this.notViewRooms_.push(room);
//         }
//     }

//     placeRooms() {
//         let index = 0;

//         for (let ry = 0; ry < ROOMS_IN_HEIGHT; ry++) {
//             for (let rx = 0; rx < ROOMS_IN_WIDTH; rx++) {
//                 const room = this.notViewRooms[index++];

//                 const offsetX = rx * REGION_WIDTH;
//                 const offsetY = ry * REGION_HEIGHT;

//                 const x = offsetX + Math.floor((REGION_WIDTH - room.width) / 2);
//                 const y = offsetY + Math.floor((REGION_HEIGHT - room.height) / 2);

//                 room.mapX = x;
//                 room.mapY = y;
//                 room.regionX = rx;
//                 room.regionY = ry;
//             }
//         }
//     }

//     createCorridors() {
//         // Gorizontal koridorlar (chapdan o'ngga)
//         for(let ry = 0; ry < ROOMS_IN_HEIGHT; ry++) {
//             for(let rx = 0; rx < ROOMS_IN_WIDTH - 1; rx++) {
//                 const roomIndex1 = ry * ROOMS_IN_WIDTH + rx;
//                 const roomIndex2 = ry * ROOMS_IN_WIDTH + (rx + 1);
                
//                 const room1 = this.notViewRooms[roomIndex1];
//                 const room2 = this.notViewRooms[roomIndex2];
                
//                 this.createHorizontalCorridor(room1, room2);
//             }
//         }

//         // Vertikal koridorlar (tepadan pastga)
//         for(let ry = 0; ry < ROOMS_IN_HEIGHT - 1; ry++) {
//             for(let rx = 0; rx < ROOMS_IN_WIDTH; rx++) {
//                 const roomIndex1 = ry * ROOMS_IN_WIDTH + rx;
//                 const roomIndex2 = (ry + 1) * ROOMS_IN_WIDTH + rx;
                
//                 const room1 = this.notViewRooms[roomIndex1];
//                 const room2 = this.notViewRooms[roomIndex2];
                
//                 this.createVerticalCorridor(room1, room2);
//             }
//         }
//     }

//     createHorizontalCorridor(room1, room2) {
//         const y = Math.floor(room1.height / 2);
//         const x1 = room1.width - 1;
//         const x2 = 0;
        
//         room1.grid[y][x1] = '+';
//         room2.grid[y][x2] = '+';
        
//         const corridor = {
//             room1,
//             room2,
//             x1: room1.mapX + x1,
//             y1: room1.mapY + y,
//             x2: room2.mapX + x2,
//             y2: room2.mapY + y,
//             direction: 'horizontal'
//         };
        
//         this.corridors_.push(corridor);
//     }

//     createVerticalCorridor(room1, room2) {
//         const x = Math.floor(room1.width / 2);
//         const y1 = room1.height - 1;
//         const y2 = 0;
        
//         room1.grid[y1][x] = '+';
//         room2.grid[y2][x] = '+';
        
//         const corridor = {
//             room1,
//             room2,
//             x1: room1.mapX + x,
//             y1: room1.mapY + y1,
//             x2: room2.mapX + x,
//             y2: room2.mapY + y2,
//             direction: 'vertical'
//         };
        
//         this.corridors_.push(corridor);
//     }

//     getCorridorAtPosition(globalX, globalY) {
//         return this.corridors_.find(c => {
//             if(c.direction === 'horizontal') {
//                 return globalY === c.y1 && globalX >= c.x1 && globalX <= c.x2;
//             } else {
//                 return globalX === c.x1 && globalY >= c.y1 && globalY <= c.y2;
//             }
//         });
//     }

//     getRoomAtCorridor(currentRoom, localX, localY) {
//         if(currentRoom.grid[localY][localX] !== '+') return null;
        
//         const corridor = this.corridors_.find(c => {
//             const globalX = currentRoom.mapX + localX;
//             const globalY = currentRoom.mapY + localY;
            
//             return (c.room1 === currentRoom && c.x1 === globalX && c.y1 === globalY) ||
//                    (c.room2 === currentRoom && c.x2 === globalX && c.y2 === globalY);
//         });
        
//         if(!corridor) return null;
        
//         return corridor.room1 === currentRoom ? corridor.room2 : corridor.room1;
//     }

//     // Xona va corridorlarni explored qilib belgilash
//     markRoomAsExplored(room) {
//         room.isVisible = true;
        
//         // Xonadagi barcha tile'larni explored qilib belgilash
//         for(let ry = 0; ry < room.height; ry++) {
//             for(let rx = 0; rx < room.width; rx++) {
//                 const key = `${room.mapX + rx},${room.mapY + ry}`;
//                 this.exploredTiles_.add(key);
//             }
//         }
//     }

//     markCorridorAsExplored(corridor) {
//         if(corridor.direction === 'horizontal') {
//             const y = corridor.y1;
//             for(let x = corridor.x1; x <= corridor.x2; x++) {
//                 const key = `${x},${y}`;
//                 this.exploredTiles_.add(key);
//             }
//         } else {
//             const x = corridor.x1;
//             for(let y = corridor.y1; y <= corridor.y2; y++) {
//                 const key = `${x},${y}`;
//                 this.exploredTiles_.add(key);
//             }
//         }
//     }

//     isExplored(x, y) {
//         const key = `${x},${y}`;
//         return this.exploredTiles_.has(key);
//     }

//     drawRooms() {
//         // Avval hamma joyni bo'sh qilamiz
//         for(let i = 0; i < MAP_HEIGHT; i++) {
//             for(let j = 0; j < MAP_WIDTH; j++) {
//                 this.grid_[i][j] = ' ';
//             }
//         }

//         // Explored xonalarni chizamiz (static - eski ko'rinish)
//         for(let i = 0; i < this.notViewRooms.length; i++) {
//             const room = this.notViewRooms[i];
            
//             if(!room.hasBeenExplored) continue;
            
//             for(let ry = 0; ry < room.height; ry++) {
//                 for(let rx = 0; rx < room.width; rx++) {
//                     const mapY = room.mapY + ry;
//                     const mapX = room.mapX + rx;
                    
//                     if(!this.isExplored(mapX, mapY)) continue;
                    
//                     if(room.grid[ry][rx] === 1) {
//                         this.grid_[mapY][mapX] = '#';
//                     } else if(room.grid[ry][rx] === '+') {
//                         this.grid_[mapY][mapX] = '+';
//                     } else {
//                         this.grid_[mapY][mapX] = '.';
//                     }
//                 }
//             }
//         }

//         // Hozirgi visible xonani chizamiz (dynamic - jonli ko'rinish)
//         for(let i = 0; i < this.notViewRooms.length; i++) {
//             const room = this.notViewRooms[i];
            
//             if(!room.isVisible) continue;
            
//             room.refreshRoom();
            
//             for(let ry = 0; ry < room.height; ry++) {
//                 for(let rx = 0; rx < room.width; rx++) {
//                     const mapY = room.mapY + ry;
//                     const mapX = room.mapX + rx;
                    
//                     if(room.grid[ry][rx] === 1) {
//                         this.grid_[mapY][mapX] = '#';
//                     } else if(room.grid[ry][rx] === '+') {
//                         this.grid_[mapY][mapX] = '+';
//                     } else if(room.grid[ry][rx] instanceof Enemy) {
//                         this.grid_[mapY][mapX] = room.grid[ry][rx].char;
//                     } else if(room.grid[ry][rx] instanceof Weapon) {
//                         this.grid_[mapY][mapX] = ')';
//                     } else if(room.grid[ry][rx] instanceof Player) {
//                         this.grid_[mapY][mapX] = '@';
//                     } else {
//                         this.grid_[mapY][mapX] = '.';
//                     }
//                 }
//             }
//         }

//         // Explored corridorlarni chizamiz
//         this.corridors_.forEach(corridor => {
//             if(corridor.direction === 'horizontal') {
//                 const y = corridor.y1;
//                 for(let x = corridor.x1 + 1; x < corridor.x2; x++) {
//                     if(this.isExplored(x, y)) {
//                         this.grid_[y][x] = '#';
//                     }
//                 }
//             } else {
//                 const x = corridor.x1;
//                 for(let y = corridor.y1 + 1; y < corridor.y2; y++) {
//                     if(this.isExplored(x, y)) {
//                         this.grid_[y][x] = '#';
//                     }
//                 }
//             }
//         });
//     }
// }


// src/domain/entities/Map.js

// const ROOMS_IN_WIDTH = 3;
// const ROOMS_IN_HEIGHT = 3;
// const ROOMS_NUM = ROOMS_IN_HEIGHT * ROOMS_IN_WIDTH;
// const REGION_WIDTH = 65;
// const REGION_HEIGHT = 13;
// const MIN_ROOM_WIDTH = 6;
// const MAX_ROOM_WIDTH = REGION_WIDTH - 2;
// const MIN_ROOM_HEIGHT = 5;
// const MAX_ROOM_HEIGHT = REGION_HEIGHT - 2;
// const MAP_WIDTH = ROOMS_IN_WIDTH * REGION_WIDTH;
// const MAP_HEIGHT = ROOMS_IN_HEIGHT * REGION_HEIGHT;

// import { Room } from "./Room.js"
// import { Weapon } from "../entities/Weapon.js"
// import { Enemy } from "../entities/Enemy.js"
// import { Player } from "../entities/Player.js"  

// export class Map {
//     constructor() {
//         this.viewRooms_ = [];
//         this.notViewRooms_ = [];
//         this.corridors_ = [];
//         this.exploredTiles_ = new Set();

//         this.grid_ = Array.from(
//             { length: MAP_HEIGHT },
//             () => Array(MAP_WIDTH).fill(' ')
//         );

//         this.generateRooms();
//         this.placeRooms();
//     }

//     get viewRooms() { return this.viewRooms_; }
//     get notViewRooms() { return this.notViewRooms_; }
//     get grid() { return this.grid_; }

//     generateRooms() {
//         for(let i = 0; i < ROOMS_NUM; i++) {
//             const roomWidth = Math.floor(Math.random() * (MAX_ROOM_WIDTH - MIN_ROOM_WIDTH + 1) + MIN_ROOM_WIDTH);
//             const roomHeight = Math.floor(Math.random() * (MAX_ROOM_HEIGHT - MIN_ROOM_HEIGHT + 1) + MIN_ROOM_HEIGHT);
//             const room = new Room(roomWidth, roomHeight);
//             room.gridIndex = i;
//             this.notViewRooms_.push(room);
//         }
//     }

//     placeRooms() {
//         let index = 0;

//         for (let ry = 0; ry < ROOMS_IN_HEIGHT; ry++) {
//             for (let rx = 0; rx < ROOMS_IN_WIDTH; rx++) {
//                 const room = this.notViewRooms[index++];

//                 const offsetX = rx * REGION_WIDTH;
//                 const offsetY = ry * REGION_HEIGHT;

//                 const x = offsetX + Math.floor((REGION_WIDTH - room.width) / 2);
//                 const y = offsetY + Math.floor((REGION_HEIGHT - room.height) / 2);

//                 room.mapX = x;
//                 room.mapY = y;
//                 room.regionX = rx;
//                 room.regionY = ry;
//             }
//         }
//     }

//     createCorridors() {
//         // Gorizontal koridorlar
//         for(let ry = 0; ry < ROOMS_IN_HEIGHT; ry++) {
//             for(let rx = 0; rx < ROOMS_IN_WIDTH - 1; rx++) {
//                 const roomIndex1 = ry * ROOMS_IN_WIDTH + rx;
//                 const roomIndex2 = ry * ROOMS_IN_WIDTH + (rx + 1);
                
//                 const room1 = this.notViewRooms[roomIndex1];
//                 const room2 = this.notViewRooms[roomIndex2];
                
//                 this.createHorizontalCorridor(room1, room2);
//             }
//         }

//         // Vertikal koridorlar
//         for(let ry = 0; ry < ROOMS_IN_HEIGHT - 1; ry++) {
//             for(let rx = 0; rx < ROOMS_IN_WIDTH; rx++) {
//                 const roomIndex1 = ry * ROOMS_IN_WIDTH + rx;
//                 const roomIndex2 = (ry + 1) * ROOMS_IN_WIDTH + rx;
                
//                 const room1 = this.notViewRooms[roomIndex1];
//                 const room2 = this.notViewRooms[roomIndex2];
                
//                 this.createVerticalCorridor(room1, room2);
//             }
//         }
//     }

//     createHorizontalCorridor(room1, room2) {
//         const y = Math.floor(room1.height / 2);
//         const x1 = room1.width - 1;
//         const x2 = 0;
        
//         room1.grid[y][x1] = '+';
//         room2.grid[y][x2] = '+';
        
//         const corridor = {
//             room1,
//             room2,
//             x1: room1.mapX + x1,
//             y1: room1.mapY + y,
//             x2: room2.mapX + x2,
//             y2: room2.mapY + y,
//             direction: 'horizontal'
//         };
        
//         this.corridors_.push(corridor);
//     }

//     createVerticalCorridor(room1, room2) {
//         const x = Math.floor(room1.width / 2);
//         const y1 = room1.height - 1;
//         const y2 = 0;
        
//         room1.grid[y1][x] = '+';
//         room2.grid[y2][x] = '+';
        
//         const corridor = {
//             room1,
//             room2,
//             x1: room1.mapX + x,
//             y1: room1.mapY + y1,
//             x2: room2.mapX + x,
//             y2: room2.mapY + y2,
//             direction: 'vertical'
//         };
        
//         this.corridors_.push(corridor);
//     }

//     markRoomAsExplored(room) {
//         room.isVisible = true;
        
//         for(let ry = 0; ry < room.height; ry++) {
//             for(let rx = 0; rx < room.width; rx++) {
//                 const key = `${room.mapX + rx},${room.mapY + ry}`;
//                 this.exploredTiles_.add(key);
//             }
//         }
//     }

//     markTileAsExplored(x, y) {
//         const key = `${x},${y}`;
//         this.exploredTiles_.add(key);
//     }

//     isExplored(x, y) {
//         const key = `${x},${y}`;
//         return this.exploredTiles_.has(key);
//     }

//     drawRooms() {
//         // Hamma joyni bo'sh qilamiz
//         for(let i = 0; i < MAP_HEIGHT; i++) {
//             for(let j = 0; j < MAP_WIDTH; j++) {
//                 this.grid_[i][j] = ' ';
//             }
//         }

//         // Explored xonalarni chizamiz (static)
//         for(let i = 0; i < this.notViewRooms.length; i++) {
//             const room = this.notViewRooms[i];
            
//             if(!room.hasBeenExplored) continue;
            
//             for(let ry = 0; ry < room.height; ry++) {
//                 for(let rx = 0; rx < room.width; rx++) {
//                     const mapY = room.mapY + ry;
//                     const mapX = room.mapX + rx;
                    
//                     if(!this.isExplored(mapX, mapY)) continue;
                    
//                     if(room.grid[ry][rx] === 1) {
//                         this.grid_[mapY][mapX] = '#';
//                     } else if(room.grid[ry][rx] === '+') {
//                         this.grid_[mapY][mapX] = '+';
//                     } else {
//                         this.grid_[mapY][mapX] = '.';
//                     }
//                 }
//             }
//         }

//         // Hozirgi visible xonani chizamiz (dynamic)
//         for(let i = 0; i < this.notViewRooms.length; i++) {
//             const room = this.notViewRooms[i];
            
//             if(!room.isVisible) continue;
            
//             room.refreshRoom();
            
//             for(let ry = 0; ry < room.height; ry++) {
//                 for(let rx = 0; rx < room.width; rx++) {
//                     const mapY = room.mapY + ry;
//                     const mapX = room.mapX + rx;
                    
//                     if(room.grid[ry][rx] === 1) {
//                         this.grid_[mapY][mapX] = '#';
//                     } else if(room.grid[ry][rx] === '+') {
//                         this.grid_[mapY][mapX] = '+';
//                     } else if(room.grid[ry][rx] instanceof Enemy) {
//                         this.grid_[mapY][mapX] = room.grid[ry][rx].char;
//                     } else if(room.grid[ry][rx] instanceof Weapon) {
//                         this.grid_[mapY][mapX] = ')';
//                     } else if(room.grid[ry][rx] instanceof Player) {
//                         this.grid_[mapY][mapX] = '@';
//                     } else {
//                         this.grid_[mapY][mapX] = '.';
//                     }
//                 }
//             }
//         }

//         // Faqat explored corridor tile'larni chizamiz
//         this.corridors_.forEach(corridor => {
//             if(corridor.direction === 'horizontal') {
//                 const y = corridor.y1;
//                 for(let x = corridor.x1 + 1; x < corridor.x2; x++) {
//                     if(this.isExplored(x, y)) {
//                         this.grid_[y][x] = '#';
//                     }
//                 }
//             } else {
//                 const x = corridor.x1;
//                 for(let y = corridor.y1 + 1; y < corridor.y2; y++) {
//                     if(this.isExplored(x, y)) {
//                         this.grid_[y][x] = '#';
//                     }
//                 }
//             }
//         });
//     }

//     drawPlayerInCorridor(globalX, globalY) {
//         // Corridor ichida player belgisini qo'yamiz
//         if(globalX >= 0 && globalX < MAP_WIDTH && globalY >= 0 && globalY < MAP_HEIGHT) {
//             this.grid_[globalY][globalX] = '@';
//         }
//     }
// }


// src/domain/entities/Map.js

// const ROOMS_IN_WIDTH = 3;
// const ROOMS_IN_HEIGHT = 3;
// const ROOMS_NUM = ROOMS_IN_HEIGHT * ROOMS_IN_WIDTH;
// const REGION_WIDTH = 65;
// const REGION_HEIGHT = 13;
// const MIN_ROOM_WIDTH = 8;
// const MAX_ROOM_WIDTH = REGION_WIDTH - 2;
// const MIN_ROOM_HEIGHT = 6;
// const MAX_ROOM_HEIGHT = REGION_HEIGHT - 2;
// const MAP_WIDTH = ROOMS_IN_WIDTH * REGION_WIDTH;
// const MAP_HEIGHT = ROOMS_IN_HEIGHT * REGION_HEIGHT;

// import { Room } from "./Room.js"
// import { Weapon } from "../entities/Weapon.js"
// import { Enemy } from "../entities/Enemy.js"
// import { Player } from "../entities/Player.js"

// export class Map {
//     constructor() {
//         this.viewRooms_ = [];
//         this.notViewRooms_ = [];
//         this.corridors_ = [];
//         this.exploredTiles_ = new Set();
//         this.portals_ = []; // Portal uchun

//         this.grid_ = Array.from(
//             { length: MAP_HEIGHT },
//             () => Array(MAP_WIDTH).fill(' ')
//         );

//         this.generateRooms();
//         this.placeRooms();
//     }

//     get viewRooms() { return this.viewRooms_; }
//     get notViewRooms() { return this.notViewRooms_; }
//     get grid() { return this.grid_; }
//     get portals() { return this.portals_; }

//     generateRooms() {
//         for(let i = 0; i < ROOMS_NUM; i++) {
//             const roomWidth = Math.floor(Math.random() * (MAX_ROOM_WIDTH - MIN_ROOM_WIDTH + 1) + MIN_ROOM_WIDTH);
//             const roomHeight = Math.floor(Math.random() * (MAX_ROOM_HEIGHT - MIN_ROOM_HEIGHT + 1) + MIN_ROOM_HEIGHT);
//             const room = new Room(roomWidth, roomHeight);
//             room.gridIndex = i;
//             this.notViewRooms_.push(room);
//         }
//     }

//     placeRooms() {
//         let index = 0;

//         for (let ry = 0; ry < ROOMS_IN_HEIGHT; ry++) {
//             for (let rx = 0; rx < ROOMS_IN_WIDTH; rx++) {
//                 const room = this.notViewRooms[index++];

//                 const offsetX = rx * REGION_WIDTH;
//                 const offsetY = ry * REGION_HEIGHT;

//                 const x = offsetX + Math.floor((REGION_WIDTH - room.width) / 2);
//                 const y = offsetY + Math.floor((REGION_HEIGHT - room.height) / 2);

//                 room.mapX = x;
//                 room.mapY = y;
//                 room.regionX = rx;
//                 room.regionY = ry;
//             }
//         }
//     }

//     createCorridors() {
//         // Gorizontal koridorlar
//         for(let ry = 0; ry < ROOMS_IN_HEIGHT; ry++) {
//             for(let rx = 0; rx < ROOMS_IN_WIDTH - 1; rx++) {
//                 const roomIndex1 = ry * ROOMS_IN_WIDTH + rx;
//                 const roomIndex2 = ry * ROOMS_IN_WIDTH + (rx + 1);
                
//                 const room1 = this.notViewRooms[roomIndex1];
//                 const room2 = this.notViewRooms[roomIndex2];
                
//                 this.createHorizontalCorridor(room1, room2);
//             }
//         }

//         // Vertikal koridorlar
//         for(let ry = 0; ry < ROOMS_IN_HEIGHT - 1; ry++) {
//             for(let rx = 0; rx < ROOMS_IN_WIDTH; rx++) {
//                 const roomIndex1 = ry * ROOMS_IN_WIDTH + rx;
//                 const roomIndex2 = (ry + 1) * ROOMS_IN_WIDTH + rx;
                
//                 const room1 = this.notViewRooms[roomIndex1];
//                 const room2 = this.notViewRooms[roomIndex2];
                
//                 this.createVerticalCorridor(room1, room2);
//             }
//         }
//     }

//     createHorizontalCorridor(room1, room2) {
//         // Xona o'rtasidan corridor yaratamiz
//         const y = Math.floor(room1.height / 2);
//         const x1 = room1.width - 1;
//         const x2 = 0;
        
//         // Tekshirish: grid mavjudligini va o'lchamini
//         if(!room1.grid || !room1.grid[y] || !room2.grid || !room2.grid[y]) {
//             console.error('Grid not initialized properly for corridor');
//             return;
//         }
        
//         // Corridor belgisini qo'yamiz
//         room1.grid[y][x1] = '+';
//         room2.grid[y][x2] = '+';
        
//         const corridor = {
//             room1,
//             room2,
//             x1: room1.mapX + x1,
//             y1: room1.mapY + y,
//             x2: room2.mapX + x2,
//             y2: room2.mapY + y,
//             direction: 'horizontal',
//             tiles: [] // Corridor tile'larini saqlaymiz
//         };
        
//         // Corridor tile'larini hisoblash
//         for(let x = corridor.x1 + 1; x < corridor.x2; x++) {
//             corridor.tiles.push({ x, y: corridor.y1 });
//         }
        
//         this.corridors_.push(corridor);
//     }

//     createVerticalCorridor(room1, room2) {
//         const x = Math.floor(room1.width / 2);
//         const y1 = room1.height - 1;
//         const y2 = 0;
        
//         // Tekshirish
//         if(!room1.grid || !room1.grid[y1] || !room2.grid || !room2.grid[y2]) {
//             console.error('Grid not initialized properly for corridor');
//             return;
//         }
        
//         room1.grid[y1][x] = '+';
//         room2.grid[y2][x] = '+';
        
//         const corridor = {
//             room1,
//             room2,
//             x1: room1.mapX + x,
//             y1: room1.mapY + y1,
//             x2: room2.mapX + x,
//             y2: room2.mapY + y2,
//             direction: 'vertical',
//             tiles: []
//         };
        
//         // Corridor tile'larini hisoblash
//         for(let y = corridor.y1 + 1; y < corridor.y2; y++) {
//             corridor.tiles.push({ x: corridor.x1, y });
//         }
        
//         this.corridors_.push(corridor);
//     }

//     // Portalni qo'shish
//     createPortal() {
//         // Tasodifiy xonani tanlaymiz (birinchi xona emas)
//         const availableRooms = this.notViewRooms.filter((r, idx) => idx !== 0);
//         const randomRoom = availableRooms[Math.floor(Math.random() * availableRooms.length)];
        
//         const cells = randomRoom.findAvailableCells();
//         if(cells.length === 0) return;
        
//         const pos = cells[Math.floor(Math.random() * cells.length)];
        
//         const portal = {
//             room: randomRoom,
//             x: pos.x,
//             y: pos.y,
//             globalX: randomRoom.mapX + pos.x,
//             globalY: randomRoom.mapY + pos.y
//         };
        
//         randomRoom.grid[pos.y][pos.x] = 'P'; // Portal belgisi
//         this.portals_.push(portal);
        
//         return portal;
//     }

//     getCorridorAt(globalX, globalY) {
//         return this.corridors_.find(c => {
//             if(c.direction === 'horizontal') {
//                 return globalY === c.y1 && globalX > c.x1 && globalX < c.x2;
//             } else {
//                 return globalX === c.x1 && globalY > c.y1 && globalY < c.y2;
//             }
//         });
//     }

//     isInCorridor(globalX, globalY) {
//         return this.getCorridorAt(globalX, globalY) !== undefined;
//     }

//     markRoomAsExplored(room) {
//         if(!room) return;
        
//         room.isVisible = true;
//         room.hasBeenExplored = true;
        
//         for(let ry = 0; ry < room.height; ry++) {
//             for(let rx = 0; rx < room.width; rx++) {
//                 const key = `${room.mapX + rx},${room.mapY + ry}`;
//                 this.exploredTiles_.add(key);
//             }
//         }
//     }

//     markTileAsExplored(x, y) {
//         const key = `${x},${y}`;
//         this.exploredTiles_.add(key);
//     }

//     isExplored(x, y) {
//         const key = `${x},${y}`;
//         return this.exploredTiles_.has(key);
//     }

//     drawRooms() {
//         // Bo'sh qilish
//         for(let i = 0; i < MAP_HEIGHT; i++) {
//             for(let j = 0; j < MAP_WIDTH; j++) {
//                 this.grid_[i][j] = ' ';
//             }
//         }

//         // Explored xonalarni static ko'rinishda chizish
//         for(let i = 0; i < this.notViewRooms.length; i++) {
//             const room = this.notViewRooms[i];
            
//             if(!room.hasBeenExplored) continue;
            
//             for(let ry = 0; ry < room.height; ry++) {
//                 for(let rx = 0; rx < room.width; rx++) {
//                     const mapY = room.mapY + ry;
//                     const mapX = room.mapX + rx;
                    
//                     if(!this.isExplored(mapX, mapY)) continue;
                    
//                     const cell = room.grid[ry][rx];
                    
//                     if(cell === 1) {
//                         this.grid_[mapY][mapX] = '#';
//                     } else if(cell === '+') {
//                         this.grid_[mapY][mapX] = '+';
//                     } else if(cell === 'P') {
//                         this.grid_[mapY][mapX] = 'P'; // Portal
//                     } else {
//                         this.grid_[mapY][mapX] = '.';
//                     }
//                 }
//             }
//         }

//         // Hozirgi visible xonani dynamic chizish
//         for(let i = 0; i < this.notViewRooms.length; i++) {
//             const room = this.notViewRooms[i];
            
//             if(!room.isVisible) continue;
            
//             room.refreshRoom();
            
//             for(let ry = 0; ry < room.height; ry++) {
//                 for(let rx = 0; rx < room.width; rx++) {
//                     const mapY = room.mapY + ry;
//                     const mapX = room.mapX + rx;
                    
//                     const cell = room.grid[ry][rx];
                    
//                     if(cell === 1) {
//                         this.grid_[mapY][mapX] = '#';
//                     } else if(cell === '+') {
//                         this.grid_[mapY][mapX] = '+';
//                     } else if(cell === 'P') {
//                         this.grid_[mapY][mapX] = 'P';
//                     } else if(cell instanceof Enemy) {
//                         this.grid_[mapY][mapX] = cell.char;
//                     } else if(cell instanceof Weapon) {
//                         this.grid_[mapY][mapX] = ')';
//                     } else if(cell instanceof Player) {
//                         this.grid_[mapY][mapX] = '@';
//                     } else {
//                         this.grid_[mapY][mapX] = '.';
//                     }
//                 }
//             }
//         }

//         // Explored corridor'larni chizish
//         this.corridors_.forEach(corridor => {
//             corridor.tiles.forEach(tile => {
//                 if(this.isExplored(tile.x, tile.y)) {
//                     this.grid_[tile.y][tile.x] = '#';
//                 }
//             });
//         });
//     }

//     drawPlayerInCorridor(globalX, globalY) {
//         if(globalX >= 0 && globalX < MAP_WIDTH && globalY >= 0 && globalY < MAP_HEIGHT) {
//             this.grid_[globalY][globalX] = '@';
//         }
//     }
// }



// src/domain/entities/Map.js

const ROOMS_IN_WIDTH = 3;
const ROOMS_IN_HEIGHT = 3;
const ROOMS_NUM = ROOMS_IN_HEIGHT * ROOMS_IN_WIDTH;
const REGION_WIDTH = 65;
const REGION_HEIGHT = 13;
const MIN_ROOM_WIDTH = 8;
const MAX_ROOM_WIDTH = REGION_WIDTH - 2;
const MIN_ROOM_HEIGHT = 6;
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
        this.corridors_ = [];
        this.exploredTiles_ = new Set();
        this.portals_ = []; // Portal uchun

        this.grid_ = Array.from(
            { length: MAP_HEIGHT },
            () => Array(MAP_WIDTH).fill(' ')
        );

        this.generateRooms();
        this.placeRooms();
    }

    get viewRooms() { return this.viewRooms_; }
    get notViewRooms() { return this.notViewRooms_; }
    get grid() { return this.grid_; }
    get portals() { return this.portals_; }

    generateRooms() {
        for(let i = 0; i < ROOMS_NUM; i++) {
            const roomWidth = Math.floor(Math.random() * (MAX_ROOM_WIDTH - MIN_ROOM_WIDTH + 1) + MIN_ROOM_WIDTH);
            const roomHeight = Math.floor(Math.random() * (MAX_ROOM_HEIGHT - MIN_ROOM_HEIGHT + 1) + MIN_ROOM_HEIGHT);
            const room = new Room(roomWidth, roomHeight);
            room.gridIndex = i;
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

                const x = offsetX + Math.floor((REGION_WIDTH - room.width) / 2);
                const y = offsetY + Math.floor((REGION_HEIGHT - room.height) / 2);

                room.mapX = x;
                room.mapY = y;
                room.regionX = rx;
                room.regionY = ry;
            }
        }
    }

    createCorridors() {
        // Gorizontal koridorlar
        for(let ry = 0; ry < ROOMS_IN_HEIGHT; ry++) {
            for(let rx = 0; rx < ROOMS_IN_WIDTH - 1; rx++) {
                const roomIndex1 = ry * ROOMS_IN_WIDTH + rx;
                const roomIndex2 = ry * ROOMS_IN_WIDTH + (rx + 1);
                
                const room1 = this.notViewRooms[roomIndex1];
                const room2 = this.notViewRooms[roomIndex2];
                
                this.createHorizontalCorridor(room1, room2);
            }
        }

        // Vertikal koridorlar
        for(let ry = 0; ry < ROOMS_IN_HEIGHT - 1; ry++) {
            for(let rx = 0; rx < ROOMS_IN_WIDTH; rx++) {
                const roomIndex1 = ry * ROOMS_IN_WIDTH + rx;
                const roomIndex2 = (ry + 1) * ROOMS_IN_WIDTH + rx;
                
                const room1 = this.notViewRooms[roomIndex1];
                const room2 = this.notViewRooms[roomIndex2];
                
                this.createVerticalCorridor(room1, room2);
            }
        }
    }

    createHorizontalCorridor(room1, room2) {
        // Xona o'rtasidan corridor yaratamiz
        const y = Math.floor(room1.height / 2);
        const x1 = room1.width - 1;
        const x2 = 0;
        
        // Tekshirish: grid mavjudligini va o'lchamini
        if(!room1.grid || !room1.grid[y] || !room2.grid || !room2.grid[y]) {
            console.error('Grid not initialized properly for corridor');
            return;
        }
        
        // Corridor belgisini qo'yamiz
        room1.grid[y][x1] = '+';
        room2.grid[y][x2] = '+';
        
        const corridor = {
            room1,
            room2,
            x1: room1.mapX + x1,
            y1: room1.mapY + y,
            x2: room2.mapX + x2,
            y2: room2.mapY + y,
            direction: 'horizontal',
            tiles: [], // Corridor tile'larini saqlaymiz
            room1EntryLocal: {x: x1, y: y}, // Room1 dagi corridor joyi
            room2EntryLocal: {x: x2, y: y}, // Room2 dagi corridor joyi
            used: false // Corridor ishlatilganmi
        };
        
        // Corridor tile'larini hisoblash
        for(let x = corridor.x1 + 1; x < corridor.x2; x++) {
            corridor.tiles.push({ x, y: corridor.y1 });
        }
        
        this.corridors_.push(corridor);
    }

    createVerticalCorridor(room1, room2) {
        const x = Math.floor(room1.width / 2);
        const y1 = room1.height - 1;
        const y2 = 0;
        
        // Tekshirish
        if(!room1.grid || !room1.grid[y1] || !room2.grid || !room2.grid[y2]) {
            console.error('Grid not initialized properly for corridor');
            return;
        }
        
        room1.grid[y1][x] = '+';
        room2.grid[y2][x] = '+';
        
        const corridor = {
            room1,
            room2,
            x1: room1.mapX + x,
            y1: room1.mapY + y1,
            x2: room2.mapX + x,
            y2: room2.mapY + y2,
            direction: 'vertical',
            tiles: [],
            room1EntryLocal: {x: x, y: y1}, // Room1 dagi corridor joyi
            room2EntryLocal: {x: x, y: y2}, // Room2 dagi corridor joyi
            used: false // Corridor ishlatilganmi
        };
        
        // Corridor tile'larini hisoblash
        for(let y = corridor.y1 + 1; y < corridor.y2; y++) {
            corridor.tiles.push({ x: corridor.x1, y });
        }
        
        this.corridors_.push(corridor);
    }

    // Portalni qo'shish
    createPortal() {
        // Tasodifiy xonani tanlaymiz (birinchi xona emas)
        const availableRooms = this.notViewRooms.filter((r, idx) => idx !== 0);
        const randomRoom = availableRooms[Math.floor(Math.random() * availableRooms.length)];
        
        const cells = randomRoom.findAvailableCells();
        if(cells.length === 0) return;
        
        const pos = cells[Math.floor(Math.random() * cells.length)];
        
        const portal = {
            room: randomRoom,
            x: pos.x,
            y: pos.y,
            globalX: randomRoom.mapX + pos.x,
            globalY: randomRoom.mapY + pos.y
        };
        
        randomRoom.grid[pos.y][pos.x] = 'P'; // Portal belgisi
        this.portals_.push(portal);
        
        return portal;
    }

    getCorridorAt(globalX, globalY) {
        return this.corridors_.find(c => {
            if(c.direction === 'horizontal') {
                return globalY === c.y1 && globalX > c.x1 && globalX < c.x2;
            } else {
                return globalX === c.x1 && globalY > c.y1 && globalY < c.y2;
            }
        });
    }

    isInCorridor(globalX, globalY) {
        return this.getCorridorAt(globalX, globalY) !== undefined;
    }

    markRoomAsExplored(room) {
        if(!room) return;
        
        room.isVisible = true;
        room.hasBeenExplored = true;
        
        for(let ry = 0; ry < room.height; ry++) {
            for(let rx = 0; rx < room.width; rx++) {
                const key = `${room.mapX + rx},${room.mapY + ry}`;
                this.exploredTiles_.add(key);
            }
        }
    }

    markTileAsExplored(x, y) {
        const key = `${x},${y}`;
        this.exploredTiles_.add(key);
    }

    isExplored(x, y) {
        const key = `${x},${y}`;
        return this.exploredTiles_.has(key);
    }

    drawRooms() {
        // Bo'sh qilish
        for(let i = 0; i < MAP_HEIGHT; i++) {
            for(let j = 0; j < MAP_WIDTH; j++) {
                this.grid_[i][j] = ' ';
            }
        }

        // Explored xonalarni static ko'rinishda chizish
        for(let i = 0; i < this.notViewRooms.length; i++) {
            const room = this.notViewRooms[i];
            
            if(!room.hasBeenExplored) continue;
            
            for(let ry = 0; ry < room.height; ry++) {
                for(let rx = 0; rx < room.width; rx++) {
                    const mapY = room.mapY + ry;
                    const mapX = room.mapX + rx;
                    
                    if(!this.isExplored(mapX, mapY)) continue;
                    
                    const cell = room.grid[ry][rx];
                    
                    if(cell === 1) {
                        this.grid_[mapY][mapX] = '#';
                    } else if(cell === '+') {
                        this.grid_[mapY][mapX] = '+';
                    } else if(cell === 'P') {
                        this.grid_[mapY][mapX] = 'P'; // Portal
                    } else {
                        this.grid_[mapY][mapX] = '.';
                    }
                }
            }
        }

        // Hozirgi visible xonani dynamic chizish
        for(let i = 0; i < this.notViewRooms.length; i++) {
            const room = this.notViewRooms[i];
            
            if(!room.isVisible) continue;
            
            room.refreshRoom();
            
            for(let ry = 0; ry < room.height; ry++) {
                for(let rx = 0; rx < room.width; rx++) {
                    const mapY = room.mapY + ry;
                    const mapX = room.mapX + rx;
                    
                    const cell = room.grid[ry][rx];
                    
                    if(cell === 1) {
                        this.grid_[mapY][mapX] = '#';
                    } else if(cell === '+') {
                        this.grid_[mapY][mapX] = '+';
                    } else if(cell === 'P') {
                        this.grid_[mapY][mapX] = 'P';
                    } else if(cell instanceof Enemy) {
                        this.grid_[mapY][mapX] = cell.char;
                    } else if(cell instanceof Weapon) {
                        this.grid_[mapY][mapX] = ')';
                    } else if(cell instanceof Player) {
                        this.grid_[mapY][mapX] = '@';
                    } else {
                        this.grid_[mapY][mapX] = '.';
                    }
                }
            }
        }

        // Explored corridor'larni chizish
        this.corridors_.forEach(corridor => {
            corridor.tiles.forEach(tile => {
                if(this.isExplored(tile.x, tile.y)) {
                    this.grid_[tile.y][tile.x] = '#';
                }
            });
        });
    }

    drawPlayerInCorridor(globalX, globalY) {
        if(globalX >= 0 && globalX < MAP_WIDTH && globalY >= 0 && globalY < MAP_HEIGHT) {
            this.grid_[globalY][globalX] = '@';
        }
    }
}