"use strict";

function MatrixPairManagement(size) {
    this._matrix = [];

    for (let i = 0; i < size; i++) {
        this._matrix.push([]);
        for (let j = 0; j < size; j++) {
            this._matrix[this._matrix.length - 1].push(false);
        }
    }
}

MatrixPairManagement.prototype = {
    constructor: MatrixPairManagement,
    addPair: function (id1, id2) {

        this._matrix[id1][id2] = true;
    },
    removePair: function (id1, id2) {

        this._matrix[id1][id2] = false;
    },
    findPair(id1, id2){

        return this._matrix[id1][id2];
    },
    getPairs: function () {
        let result = [];

        for (let i = 0; i < this._matrix.length; i++) {
            for (let j = 0; j < this._matrix[i].length; j++) {
                if (this._matrix[i][j]) {
                    result.push({
                        a: i,
                        b: j
                    });
                }
            }
        }

        return result;
    },
    toString: function () {

        return 'MatrixPairManagement';
    }
};