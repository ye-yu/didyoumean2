"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var normalizeString_1 = __importDefault(require("./normalizeString"));
var getMatchItemStr = function (matchItem, matchPath) {
    var matchItemStr = matchPath.length > 0
        ? matchPath.reduce(function (acc, prop) { return acc === null || acc === void 0 ? void 0 : acc[prop]; }, matchItem)
        : matchItem;
    if (typeof matchItemStr !== 'string')
        return '';
    return matchItemStr;
};
/**
 * Process matchItem according to options
 *
 * @param {Object|string} matchItem - Item for matching with `input`
 * @param {Object} options - options that allows you to modify the behavior
 * @returns {string} - processed matchItem
 */
var matchItemProcessor = function (matchItem, options) {
    var matchPath = options.matchPath;
    var matchItemStr = getMatchItemStr(matchItem, matchPath);
    return (0, normalizeString_1["default"])(matchItemStr, options);
};
exports["default"] = matchItemProcessor;
