"use strict";

function HashPairManagement() {
    this.pairs = {};
}

HashPairManagement.prototype = {
    constructor: HashPairManagement,
    _hash: function (id1, id2) {

        return (id1 * 1640531513 + id2 * 2654435789);
    },
    addPair: function (id1, id2) {

        this.pairs[this._hash(id1, id2)] = {
            a: id1,
            b: id2
        };
    },
    removePair: function (id1, id2) {

        delete this.pairs[this._hash(id1, id2)];
        delete this.pairs[this._hash(id2, id1)];
    },
    clear: function () {

        this.pairs = {};
    },
    findPair(id1, id2){

        return this._hash(id1, id2) in this.pairs || this._hash(id2, id1) in this.pairs
    },
    intersect: function (hashPairManagement) {
        let result = [],
            pair;

        for (let key in this.pairs) {
            pair = this.pairs[key];
            if (hashPairManagement.findPair(pair.a, pair.b)) {
                result.push(pair);
            }
        }

        return result;
    },
    getPairs: function () {

        return this.pairs;
    },
    toString: function () {

        return 'HashPairManagement';
    }
};