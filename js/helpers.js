Function.prototype.inheritsFrom = function (parentClassOrObject) {
    if (parentClassOrObject.constructor == Function) {
        //Normal Inheritance
        this.prototype = new parentClassOrObject;
        this.prototype.constructor = this;
        this.prototype.parent = parentClassOrObject.prototype;
    }
    else {
        //Pure Virtual Inheritance
        this.prototype = parentClassOrObject;
        this.prototype.constructor = this;
        this.prototype.parent = parentClassOrObject;
    }
    return this;
};

if (!window.requestAnimationFrame) {

    window.requestAnimationFrame = (function () {

        return window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {

                window.setTimeout(callback, 1000 / 60);

            };

    })();

}

function random_color() {
    var rint = Math.round(0xffffff * Math.random());

    return ('0x' + rint.toString(16)).replace(/^#0([0-9a-f]{6})$/i, '#$1');
}

function array_intersect() {
    var i, all, shortest, nShortest, n, len, ret = [], obj={}, nOthers;
    nOthers = arguments.length-1;
    nShortest = arguments[0].length;
    shortest = 0;
    for (i=0; i<=nOthers; i++){
        n = arguments[i].length;
        if (n<nShortest) {
            shortest = i;
            nShortest = n;
        }
    }

    for (i=0; i<=nOthers; i++) {
        n = (i===shortest)?0:(i||shortest); //Read the shortest array first. Read the first array instead of the shortest
        len = arguments[n].length;
        for (var j=0; j<len; j++) {
            var elem = arguments[n][j];
            if(obj[elem] === i-1) {
                if(i === nOthers) {
                    ret.push(elem);
                    obj[elem]=0;
                } else {
                    obj[elem]=i;
                }
            }else if (i===0) {
                obj[elem]=0;
            }
        }
    }
    return ret;
}