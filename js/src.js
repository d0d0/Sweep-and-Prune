"use strict";

var core = new Core();

for (var i = 0; i < 50; i++) {
    core.addRectangle();
}

core.render();

window.onresize = function () {
    core.onResize();
};