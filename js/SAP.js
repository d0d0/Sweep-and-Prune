"use strict";

let BreakException = {};

function SAP(size) {
    this.pairManagementX = new MatrixPairManagement(size);
    this.pairManagementY = new MatrixPairManagement(size);
}

SAP.prototype = {
    constructor: SAP,
    _createAxisList: function (rectangles) {
        this._listSortedByX = this._copyArray(rectangles).sort(this._compareByXAxis);
        this._listSortedByY = this._copyArray(rectangles).sort(this._compareByYAxis);
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
    _compareByYAxis: function (a, b) {
        if (a.getY() < b.getY()) {

            return -1;
        }
        if (a.getY() > b.getY()) {

            return 1;
        }

        return 0;
    },
    _buildList: function (axis, arr) {
        if (axis.toLowerCase() == 'x') {
            this._axisListX = [];
            arr.forEach(function (obj) {
                this._axisListX.push({
                    rect: obj,
                    axis: obj.getX(),
                    isMin: true
                });
                this._axisListX.push({
                    rect: obj,
                    axis: obj.getX() + obj.getWidth(),
                    isMin: false
                });
            }.bind(this));
        } else if (axis.toLowerCase() == 'y') {
            this._axisListY = [];
            arr.forEach(function (obj) {
                this._axisListY.push({
                    rect: obj,
                    axis: obj.getY(),
                    isMin: true
                });
                this._axisListY.push({
                    rect: obj,
                    axis: obj.getY() + obj.getHeight(),
                    isMin: false
                });
            }.bind(this));
        }
    },
    _valueOverlap: function (value, min, max) {

        return value >= min && value <= max;
    },
    _checkOverlap: function (x1, s1, x2, s2) {

        return this._valueOverlap(x1, x2, s2) || this._valueOverlap(x2, x1, s1);
    },
    _reportPairs: function (axis, a) {
        for (let j = 1; j < axis.length; j++) {
            let currentPoint = axis[j],
                current = currentPoint.axis,
                greater,
                overlap,
                i = j - 1;
            while (i >= 0 && axis[i].axis > current) {
                greater = axis[i];

                if (currentPoint.isMin && !greater.isMin) {
                    if (a == 'x') {
                        overlap = this._checkOverlap(greater.rect.getX(), greater.rect.getX() + greater.rect.getWidth(), currentPoint.rect.getX(), currentPoint.rect.getX() + currentPoint.rect.getWidth());
                    } else {
                        overlap = this._checkOverlap(greater.rect.getY(), greater.rect.getY() + greater.rect.getHeight(), currentPoint.rect.getY(), currentPoint.rect.getY() + currentPoint.rect.getHeight());
                    }
                    if (overlap) {
                        if (a == 'x') {
                            this.pairManagementX.addPair(greater.rect.index, currentPoint.rect.index);
                        } else {
                            this.pairManagementY.addPair(greater.rect.index, currentPoint.rect.index);
                        }
                    }
                }
                if (!currentPoint.isMin && greater.isMin) {
                    if (a == 'x') {
                        this.pairManagementX.removePair(greater.rect.index, currentPoint.rect.index);
                    } else {
                        this.pairManagementY.removePair(greater.rect.index, currentPoint.rect.index);
                    }
                }
                axis[i + 1] = greater;
                --i;
            }
            axis[i + 1] = currentPoint;
        }
    },
    getCollisions: function (rectangles) {
        this._createAxisList(rectangles);
        this._buildList('x', this._listSortedByX);
        this._buildList('y', this._listSortedByY);
        this.pairManagementX.clear();
        this.pairManagementY.clear();
        this._reportPairs(this._axisListX, 'x');
        this._reportPairs(this._axisListY, 'y');
        let pairsX = this.pairManagementX.getPairs();
        let pairsY = this.pairManagementY.getPairs();
        let result = [];
        for (let i = 0; i < pairsX.length; i++) {
            for (let j = 0; j < pairsX[i].length; j++) {
                if (i != j && pairsX[i][j] && (pairsY[i][j] || pairsY[j][i])) {
                    result.push({
                        a: i,
                        b: j
                    });
                }
            }
        }

        return result;
    }
};