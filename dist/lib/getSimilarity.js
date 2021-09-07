"use strict";
exports.__esModule = true;
var fastest_levenshtein_1 = require("fastest-levenshtein");
/**
 * Using edit distance between `a` and `b` to calculate similarity
 *
 * @param {string} a - `input`
 * @param {string} b - String from `matchList`
 * @returns {number} similarity between `a` and `b`
 */
var getSimilarity = function (a, b) {
    if (!a || !b)
        return 0;
    if (a === b)
        return 1;
    var editDistance = (0, fastest_levenshtein_1.distance)(a, b);
    var longestLength = Math.max(a.length, b.length);
    return (longestLength - editDistance) / longestLength;
};
exports["default"] = getSimilarity;
