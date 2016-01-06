"use strict";

var size = 250;
var core = new Core(size);

for (var i = 0; i < size; i++) {
    core.addRectangle();
}

core.render();

window.onresize = function () {
    core.onResize();
};

var gui = new dat.GUI();

gui.add(core, 'algo', ['AABB', 'SAP']).onChange(function (newValue) {
    if (newValue == 'AABB') {
        core.setAlgo(new AABB(size));
    } else {
        core.setAlgo(new SAP(size));
    }
});

gui.add(core, 'management', ['matrix', 'hash']).onChange(function (newValue) {
    core.getAlgo().setPairManagement(newValue);
});