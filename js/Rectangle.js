"use strict";

function Rectangle(x, y) {
    this._x = x;
    this._y = y;
    this._color = 0xFFFF00;
    this._graphics = new PIXI.Graphics();
    this._graphics.interactive = true;
    this._graphics.beginFill(this._color);
    this._graphics.drawRect(this._x, this._y, 500, 500);
}

Rectangle.prototype = {
    constructor: Rectangle,
    getGraphics: function () {

        return this._graphics;
    },
    getX: function () {

        return this._x;
    },
    getY: function () {

        return this._y;
    },
    setColor: function (color) {
        this._color = color;
        this._graphics.clear();
        this._graphics.beginFill(this._color);
    }
};