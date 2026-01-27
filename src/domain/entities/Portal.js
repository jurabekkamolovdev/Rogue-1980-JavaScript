// src/domain/entities/Portal.js

export class Portal {
    constructor() {
        this.x_ = 0;
        this.y_ = 0;
        this.char_ = '{magenta-fg}{bold}P{/bold}{/magenta-fg}';
    }

    get x() { return this.x_; }
    set x(value) { this.x_ = value; }

    get y() { return this.y_; }
    set y(value) { this.y_ = value; }

    get char() { return this.char_; }
}