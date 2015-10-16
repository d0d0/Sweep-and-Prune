"use strict";

function Core() {
    var interactive = true;
    this._rectangles = [];
    this._stage = new PIXI.Stage(0x66FF99, interactive);
    this._renderer = PIXI.autoDetectRenderer(800, 600);

    document.body.appendChild(this._renderer.view);
}

Core.prototype = {
    constructor: Core,
    addRectangle: function () {
        var rect = new Rectangle(10, 10);

        this._rectangles.push(rect);
        this._stage.addChild(rect.getGraphics());
    },
    render: function () {
        let that = this;
        that._renderer.render(that._stage);

        that._rectangles[0].getGraphics().x += 1;

        requestAnimationFrame(function () {
            that.render();
        });
    }
};