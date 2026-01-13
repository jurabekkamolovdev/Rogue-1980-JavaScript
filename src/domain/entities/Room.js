// src/domain/entities/Room.js


export class Room {
    constructor(width, height) {
        this.width_ = width;
        this.height_ = height;

        this.grid_ = Array.from(
            { length: height },
            () => Array(width).fill(0)
        );
        this.setWalls();
    }

    get width() { return this.width_; }
    get height() { return this.height_; }

    get grid() { return this.grid_; }

    findAvailableCells() {
        const result = [];

        for(let i = 0; i < this.height_; i++) {
            for(let j = 0; j < this.width_; j++) {
                if(this.grid_[i][j] === 0) {
                    result.push({x: i, y: j})
                }
            }
        }

    }

    setWalls() {
        for(let i = 0; i < this.height_; i++) {
            for(let j = 0; j < this.width_; j++) {
                if(i === 0 || j === 0 || i === this.height_ - 1 || j === this.width_ - 1) {
                    this.grid_[i][j] = 1;
                }
            }
        }
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
