"use strict";

function HashPairManagement() {
    this.pair = [];
}

HashPairManagement.prototype = {
    constructor: HashPairManagement,
    _hash: function (id1, id2) {

        return (id1 * 1640531513  + id2 * 2654435789) % this.pair.length;
    },
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

        return 'HashPairManagement';
    }
};