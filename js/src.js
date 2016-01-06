"use strict";

var size = 50;
var core = new Core(size);

for (var i = 0; i < size; i++) {
    core.addRectangle();
}

core.render();

window.onresize = function () {
    core.onResize();
};