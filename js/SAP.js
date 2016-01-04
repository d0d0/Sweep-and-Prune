"use strict";

let BreakException = {};

function SAP() {
    this.pairManagement = new HashPairManagement();
}

SAP.prototype = {
    constructor: SAP,
    _createAxisList: function (rectangles) {
        let listSortedByX = this._copyArray(rectangles).sort(this._compareByXAxis);
        let listSortedByY = this._copyArray(rectangles).sort(this._compareByYAxis);

        return {
            listSortedByX: listSortedByX,
            listSortedByY: listSortedByY
        };
    },
    _copyArray: function (arr) {

        return arr.slice();
    },
    _compareByXAxis: function (a, b) {
        if (a.getX() < b.getX()) {

            return -1;
        }
        if (a.getX() > b.getX()) {

            return 1;
        }

        return 0;
    },
    _buildList: function (axis, arr) {
        let result = [];

        if (axis.toLowerCase() == 'x') {
            arr.forEach(function (obj) {
                result.push({
                    a: obj.getX(),
                    b: obj.getX() + obj.getWidth()
                });
            });
        } else if (axis.toLowerCase() == 'y') {
            arr.forEach(function (obj) {
                result.push({
                    a: obj.getY(),
                    b: obj.getY() + obj.getHeight()
                });
            });
        }

        return result;
    },
    _reportPairs: function (axisX, axisY, rectanglesSortedByX, rectanglesSortedByY, stage) {
        let result = {
                pairsX: [],
                pairsY: []
            },
            pairsX = [],
            pairsY = [];

        let lastIndex;
        axisX.forEach(function (obj) {
            // obj.a obj.b
            if (!lastIndex) {
                lastIndex = obj.a;
            }
            result.pairsX.push([]);
            try {
                rectanglesSortedByX.forEach(function (rect) {
                    if (rect.getX() >= lastIndex && rect.getX() < obj.b) {
                        result.pairsX[result.pairsX.length - 1].push(rect.index);
                    }

                    if (rect.getX() >= obj.b) {

                        throw BreakException;
                    }
                });
            } catch (e) {
                if (e !== BreakException) {
                    throw e
                }
            }

            result.pairsX[result.pairsX.length - 1].sort();
            for (let i = 0; i < result.pairsX[result.pairsX.length - 1].length; i++) {
                for (let j = i; j < result.pairsX[result.pairsX.length - 1].length; j++) {
                    if (i == j) {
                        continue;
                    }

                    pairsX.push({
                        a: result.pairsX[result.pairsX.length - 1][i],
                        b: result.pairsX[result.pairsX.length - 1][j]
                    });
                }
            }
            lastIndex = obj.b;
        });

        lastIndex = undefined;
        axisY.forEach(function (obj) {
            // obj.a obj.b
            if (!lastIndex) {
                lastIndex = obj.a;
            }
            result.pairsY.push([]);

            try {
                rectanglesSortedByY.forEach(function (rect) {
                    if (rect.getY() >= lastIndex && rect.getY() < obj.b) {
                        result.pairsY[result.pairsY.length - 1].push(rect.index);
                    }

                    if (rect.getY() >= obj.b) {

                        throw BreakException;
                    }
                });
            } catch (e) {
                if (e !== BreakException) {
                    throw e
                }
            }

            result.pairsY[result.pairsY.length - 1].sort();
            for (let i = 0; i < result.pairsY[result.pairsY.length - 1].length; i++) {
                for (let j = i; j < result.pairsY[result.pairsY.length - 1].length; j++) {
                    if (i == j) {
                        continue;
                    }

                    pairsY.push({
                        a: result.pairsY[result.pairsY.length - 1][i],
                        b: result.pairsY[result.pairsY.length - 1][j]
                    });
                }
            }
            lastIndex = obj.b;
        });
        console.log(array_intersect(pairsX, pairsY));

        return array_intersect(pairsX, pairsY);
    },
    _compareByYAxis: function (a, b) {
        if (a.getY() < b.getY()) {

            return -1;
        }
        if (a.getY() > b.getY()) {

            return 1;
        }

        return 0;
    },
    getCollisions: function (rectangles, stage) {
        let sortedAxisList = this._createAxisList(rectangles);
        let buildedListX = this._buildList('x', sortedAxisList.listSortedByX);
        let buildedListY = this._buildList('y', sortedAxisList.listSortedByY);
        let pairs = this._reportPairs(buildedListX, buildedListY, sortedAxisList.listSortedByX, sortedAxisList.listSortedByY, stage);

        return pairs;
    }
};