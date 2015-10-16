"use strict";

function Rectangle(x, y) {
    this._velocityX = Math.random() * 5 - 2.5;
    this._velocityY = Math.random() * 5 - 2.5;
    this._width = 30;
    this._heigh = 30;
    this._color = 0xFFFF00;
    this._graphics = new PIXI.Graphics();
    this._graphics.interactive = true;
    this._graphics.click = this.onClick;
    this._graphics.beginFill(this._color);
    this._graphics.drawRect(this.x, this.y, this._width, this._heigh);
    this._graphics._rectangle = this;
}

Rectangle.prototype = {
    constructor: Rectangle,
    getGraphics: function () {

        return this._graphics;
    },
    onClick: function (obj) {
        obj.target._rectangle.setColor(random_color());
    },
    updatePosition: function () {
        let changed = false;

        this._graphics.x += this._velocityX;
        this._graphics.y += this._velocityY;
        if (this._graphics.x < 0) {
            this._velocityX *= -1;
            changed = true;
        }
        if (this._graphics.y < 0) {
            this._velocityY *= -1;
            changed = true;
        }
        if (this._graphics.x + this._width > window.innerWidth && this._velocityX > 0) {
            this._velocityX *= -1;
            changed = true;
        }
        if (this._graphics.y + this._heigh > window.innerHeight && this._velocityY > 0) {
            this._velocityY *= -1;
            changed = true;
        }
        if (changed) {
            this.setColor(random_color());
        }
    },
    getX: function () {

        return this._graphics.x;
    },
    getY: function () {

        return this._graphics.y;
    },
    setX: function (x) {

        this._graphics.x = x;
    },
    setY: function (y) {

        this._graphics.y = y;
    },
    setColor: function (color) {
        this._color = color;
        this._graphics.clear();
        this._graphics.beginFill(this._color);
        this._graphics.drawRect(this.x, this.y, this._width, this._heigh);
    }
};