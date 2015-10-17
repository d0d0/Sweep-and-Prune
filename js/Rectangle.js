"use strict";

function Rectangle(x, y) {
    this._velocity = {
        x: Math.random() * 5 - 2.5,
        y: Math.random() * 5 - 2.5
    };
    this._width = 30;
    this._height = 30;
    this._color = 0xFFFF00;
    this._graphics = new PIXI.Graphics();
    this._graphics.interactive = true;
    this._graphics.click = this.onClick;
    this._graphics.beginFill(this._color);
    this._graphics.drawRect(this.x, this.y, this._width, this._height);
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

        this._graphics.x += this._velocity.x;
        this._graphics.y += this._velocity.y;

        if (this._graphics.x < 0) {
            this._velocity.x *= -1;
        }
        if (this._graphics.y < 0) {
            this._velocity.y *= -1;
        }
        if (this._graphics.x + this._width > window.innerWidth && this._velocity.x > 0) {
            this._velocity.x *= -1;
        }
        if (this._graphics.y + this._height > window.innerHeight && this._velocity.y > 0) {
            this._velocity.y *= -1;
        }

        this.setColor(0x00FF00);
    },
    getX: function () {

        return this._graphics.x;
    },
    getY: function () {

        return this._graphics.y;
    },
    getWidth: function () {

        return this._width;
    },
    getHeight: function () {

        return this._height;
    },
    setX: function (x) {

        this._graphics.x = x;
    },
    setY: function (y) {

        this._graphics.y = y;
    },
    setColor: function (color) {
        if (color == this._color) {
            return;
        }

        this._color = color;
        this._graphics.clear();
        this._graphics.beginFill(this._color);
        this._graphics.drawRect(this.x, this.y, this._width, this._height);
    }
};