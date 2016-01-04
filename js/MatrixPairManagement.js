"use strict";

function MatrixPairManagement() {
    this.pair = [];
}

MatrixPairManagement.prototype = {
    constructor: MatrixPairManagement,
    addPair: function (id1, id2) {

        this.pair.push({
            id1, id2
        });
    },
    removePair: function (id1, id2) {


    },
    findPair(id1, id2){

    },
    getPairs: function () {

    },
    toString: function () {

        return 'MatrixPairManagement';
    }
};