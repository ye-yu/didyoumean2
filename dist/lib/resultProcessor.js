"use strict";
exports.__esModule = true;
var ReturnTypeEnums_1 = require("../enums/ReturnTypeEnums");
var errors_1 = require("../errors");
/**
 * Generate result
 *
 * @param {Object[]|string[]} matchList - List for matching with `input`
 * @param {number[]} matchedIndexes - indexes of matchList that need to be returned as result
 * @param {ReturnTypeEnums} returnType - how the result will response to user
 * @returns {Array|null|Object|string} - matched result(s), return object if `match` is `{Object[]}`
 */
var resultProcessor = function (matchList, matchedIndexes, returnType) {
    switch (returnType) {
        case ReturnTypeEnums_1.ReturnTypeEnums.ALL_CLOSEST_MATCHES:
        case ReturnTypeEnums_1.ReturnTypeEnums.ALL_MATCHES:
        case ReturnTypeEnums_1.ReturnTypeEnums.ALL_SORTED_MATCHES:
            return matchedIndexes.map(function (matchedIndex) { return matchList[matchedIndex]; });
        case ReturnTypeEnums_1.ReturnTypeEnums.FIRST_CLOSEST_MATCH:
        case ReturnTypeEnums_1.ReturnTypeEnums.FIRST_MATCH:
            if (!matchedIndexes.length)
                return null;
            return matchList[matchedIndexes[0]];
        default:
            throw errors_1.unknownReturnTypeError;
    }
};
exports["default"] = resultProcessor;
