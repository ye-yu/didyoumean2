"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var lodash_deburr_1 = __importDefault(require("lodash.deburr"));
/**
 * Normalize a string
 *
 * @param {string} str - any string
 * @param {Object} options - options that allows you to modify the behavior
 * @returns {string} - normalized string
 */
var normalizeString = function (str, options) {
    var s = str;
    if (options.trimSpaces) {
        s = s.trim().replace(/\s+/g, ' ');
    }
    if (options.deburr) {
        s = (0, lodash_deburr_1["default"])(s);
    }
    if (!options.caseSensitive) {
        s = s.toLowerCase();
    }
    return s;
};
exports["default"] = normalizeString;
