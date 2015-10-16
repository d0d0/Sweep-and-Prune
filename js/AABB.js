"use strict";

function AABB() {

}

AABB.prototype = {
    constructor: AABB,
    getCollisions: function (rectangles) {
        let pairs = [];

        for (var i = 0; i < rectangles.length; i++) {
            for (var j = i; j < rectangles.length; j++) {
                if (i === j) {
                    continue;
                }
                var overLapX = this._valueOverlap(rectangles[i].getX(), rectangles[j].getX(), rectangles[j].getX() + rectangles[j].getWidth()) ||
                        this._valueOverlap(rectangles[j].getX(), rectangles[i].getX(), rectangles[i].getX() + rectangles[i].getWidth()),
                    overLapY = this._valueOverlap(rectangles[i].getY(), rectangles[j].getY(), rectangles[j].getY() + rectangles[j].getHeight()) ||
                        this._valueOverlap(rectangles[j].getY(), rectangles[i].getY(), rectangles[i].getY() + rectangles[i].getHeight());
                if (overLapX && overLapY) {
                    pairs.push({
                        a: i,
                        b: j
                    });
                }
            }
        }

        return pairs;
    },
    _valueOverlap: function (value, min, max) {
        return value >= min && value <= max;
    }
};