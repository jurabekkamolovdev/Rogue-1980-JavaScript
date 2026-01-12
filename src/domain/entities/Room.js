// src/domain/entities/Room.js


export class Room {
    constructor(width, height) {
        this.width_ = width;
        this.height_ = height;

        this.grid = Array.from(
            { length: height },
            () => Array(width).fill(0)
        );
    }

    printRoom() {
        for(let i = 0; i < this.height_; i++) {
            let temp = '';
            for(let j = 0; j < this.width_; j++) {
                temp += '0';
            }
            console.log(temp);
        }
    }
}
