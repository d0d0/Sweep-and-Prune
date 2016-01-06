"use strict";

function AABB() {

}

AABB.prototype = {
    constructor: AABB,
    getCollisions: function (rectangles) {
        let pairs = [];

        for (var i = 0; i < rectangles.length; i++) {
            for (var j = i + 1; j < rectangles.length; j++) {
                var overLap = (this._valueOverlap(rectangles[i].getX(), rectangles[j].getX(), rectangles[j].getX() + rectangles[j].getWidth()) ||
                    this._valueOverlap(rectangles[j].getX(), rectangles[i].getX(), rectangles[i].getX() + rectangles[i].getWidth())) &&
                    (this._valueOverlap(rectangles[i].getY(), rectangles[j].getY(), rectangles[j].getY() + rectangles[j].getHeight()) ||
                    this._valueOverlap(rectangles[j].getY(), rectangles[i].getY(), rectangles[i].getY() + rectangles[i].getHeight()));
                if (overLap) {
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