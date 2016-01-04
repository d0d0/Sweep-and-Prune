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
    this._collisionAlgo = new SAP();

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
            if (obj.getX() + obj.getWidth() >= window.innerWidth) {
                obj.setX(window.innerWidth - obj.getWidth());
            }
            if (obj.getY() + obj.getWidth() >= window.innerHeight) {
                obj.setY(window.innerHeight - obj.getHeight());
            }
        });

        this._renderer.resize(window.innerWidth, window.innerHeight);
    },
    setAlgo: function (newAlgo) {

        this._collisionAlgo = newAlgo;
    },
    _moveObjects: function () {
        this._rectangles.forEach(function (obj, index) {
            obj.updatePosition();
            obj.index = index;
        });
    },
    render: function () {
        this._stats.begin();
        this._moveObjects();

        this._collisionAlgo.getCollisions(this._rectangles, this._stage).forEach(function (obj) {
            this._rectangles[obj.a].setColor(0xFF0000);
            this._rectangles[obj.b].setColor(0xFF0000);
        }.bind(this));
        this._renderer.render(this._stage);

        this._stats.end();

        requestAnimationFrame(function () {
            this.render();
        }.bind(this));
    }
};