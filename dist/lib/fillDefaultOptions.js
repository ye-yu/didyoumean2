"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var ReturnTypeEnums_1 = require("../enums/ReturnTypeEnums");
var ThresholdTypeEnums_1 = require("../enums/ThresholdTypeEnums");
var errors_1 = require("../errors");
var fillDefaultOptions = function (options) {
    var optionsWithDefaultValues = __assign({ caseSensitive: false, deburr: true, matchPath: [], returnType: ReturnTypeEnums_1.ReturnTypeEnums.FIRST_CLOSEST_MATCH, thresholdType: ThresholdTypeEnums_1.ThresholdTypeEnums.SIMILARITY, trimSpaces: true }, options);
    switch (optionsWithDefaultValues.thresholdType) {
        case ThresholdTypeEnums_1.ThresholdTypeEnums.EDIT_DISTANCE:
            return __assign({ threshold: 20 }, optionsWithDefaultValues);
        case ThresholdTypeEnums_1.ThresholdTypeEnums.SIMILARITY:
            return __assign({ threshold: 0.4 }, optionsWithDefaultValues);
        default:
            throw errors_1.unknownThresholdTypeError;
    }
};
exports["default"] = fillDefaultOptions;
