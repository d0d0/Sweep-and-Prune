"use strict";

function Core() {
    var interactive = true;

    this._stats = new Stats();
    this._stats.setMode(0);
    this._stats.domElement.style.position = 'absolute';
    this._stats.domElement.style.left = '0px';
    this._stats.domElement.style.top = '0px';
    this._rectangles = [];
    this._stage = new PIXI.Stage(0x66FF99, interactive);
    this._renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
    this._collisionAlgo = new AABB();

    document.body.appendChild(this._renderer.view);
    document.body.appendChild(this._stats.domElement);
}

Core.prototype = {
    constructor: Core,
    addRectangle: function () {
        var rect = new Rectangle(10, 10);

        this._rectangles.push(rect);
        this._stage.addChild(rect.getGraphics());
    },
    onResize: function () {
        this._rectangles.forEach(function (obj) {
            if (obj.getX() >= window.innerWidth) {
                obj.setX(window.innerWidth);
            }
            if (obj.getY() >= window.innerHeight) {
                obj.setY(window.innerHeight);
            }
        });

        this._renderer.resize(window.innerWidth, window.innerHeight);
    },
    _moveObjects: function () {
        this._rectangles.forEach(function (obj) {
            obj.updatePosition();
        });
    },
    render: function () {
        this._stats.begin();

        let that = this;
        that._moveObjects();
        that._collisionAlgo.getCollisions(that._rectangles).forEach(function (obj) {
            that._rectangles[obj.a].setColor(0xFF0000);
            that._rectangles[obj.b].setColor(0xFF0000);
        });
        that._renderer.render(that._stage);

        this._stats.end();

        requestAnimationFrame(function () {
            that.render();
        });
    }
};