"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.ThresholdTypeEnums = exports.ReturnTypeEnums = void 0;
var fastest_levenshtein_1 = require("fastest-levenshtein");
var ReturnTypeEnums_1 = require("./enums/ReturnTypeEnums");
exports.ReturnTypeEnums = ReturnTypeEnums_1.ReturnTypeEnums;
var ThresholdTypeEnums_1 = require("./enums/ThresholdTypeEnums");
exports.ThresholdTypeEnums = ThresholdTypeEnums_1.ThresholdTypeEnums;
var errors_1 = require("./errors");
var fillDefaultOptions_1 = __importDefault(require("./lib/fillDefaultOptions"));
var getSimilarity_1 = __importDefault(require("./lib/getSimilarity"));
var matchItemProcessor_1 = __importDefault(require("./lib/matchItemProcessor"));
var normalizeString_1 = __importDefault(require("./lib/normalizeString"));
var resultProcessor_1 = __importDefault(require("./lib/resultProcessor"));
/**
 * Main function for didyoumean2
 *
 * @param {string} input - string that you are not sure and want to match with `matchList`
 * @param {Object[]|string[]} matchList - List for matching with `input`
 * @param {null|Object|undefined} options - options that allows you to modify the behavior
 * @returns {Array|null|Object|string} - matched result(s), return object if `match` is `{Object[]}`
 */
function didYouMean(input, matchList, options) {
    /*+++++++++++++++++++
     + Initiate options +
     +++++++++++++++++++*/
    var optionsWithDefaults = (0, fillDefaultOptions_1["default"])(options);
    var returnType = optionsWithDefaults.returnType, threshold = optionsWithDefaults.threshold, thresholdType = optionsWithDefaults.thresholdType;
    /*++++++++++++++++++++
     + Deal with options +
     ++++++++++++++++++++*/
    var normalizedInput = (0, normalizeString_1["default"])(input, optionsWithDefaults);
    var checkIfMatched; // Validate if score is matched
    var scoreProcessor; // Get score
    switch (thresholdType) {
        case ThresholdTypeEnums_1.ThresholdTypeEnums.EDIT_DISTANCE:
            checkIfMatched = function (score) { return score <= threshold; };
            scoreProcessor = function (matchItem) {
                return (0, fastest_levenshtein_1.distance)(normalizedInput, (0, matchItemProcessor_1["default"])(matchItem, optionsWithDefaults));
            };
            break;
        case ThresholdTypeEnums_1.ThresholdTypeEnums.SIMILARITY:
            checkIfMatched = function (score) { return score >= threshold; };
            scoreProcessor = function (matchItem) {
                return (0, getSimilarity_1["default"])(normalizedInput, (0, matchItemProcessor_1["default"])(matchItem, optionsWithDefaults));
            };
            break;
        /* istanbul ignore next */ default:
            throw errors_1.unknownThresholdTypeError;
    }
    /*+++++++++++
     + Matching +
     +++++++++++*/
    var matchedIndexes = [];
    var matchListLen = matchList.length;
    switch (returnType) {
        case ReturnTypeEnums_1.ReturnTypeEnums.ALL_CLOSEST_MATCHES:
        case ReturnTypeEnums_1.ReturnTypeEnums.FIRST_CLOSEST_MATCH: {
            var scores = [];
            var marginValue = void 0;
            switch (thresholdType) {
                case ThresholdTypeEnums_1.ThresholdTypeEnums.EDIT_DISTANCE:
                    // Process score and save the smallest score
                    marginValue = Infinity;
                    for (var i = 0; i < matchListLen; i += 1) {
                        var score = scoreProcessor(matchList[i]);
                        if (marginValue > score)
                            marginValue = score;
                        scores.push(score);
                    }
                    break;
                case ThresholdTypeEnums_1.ThresholdTypeEnums.SIMILARITY:
                    // Process score and save the largest score
                    marginValue = 0;
                    for (var i = 0; i < matchListLen; i += 1) {
                        var score = scoreProcessor(matchList[i]);
                        if (marginValue < score)
                            marginValue = score;
                        scores.push(score);
                    }
                    break;
                /* istanbul ignore next */ default:
                    throw errors_1.unknownThresholdTypeError;
            }
            var scoresLen = scores.length;
            for (var i = 0; i < scoresLen; i += 1) {
                var score = scores[i];
                if (checkIfMatched(score) && score === marginValue) {
                    matchedIndexes.push(i);
                }
            }
            break;
        }
        case ReturnTypeEnums_1.ReturnTypeEnums.ALL_MATCHES:
            for (var i = 0; i < matchListLen; i += 1) {
                var score = scoreProcessor(matchList[i]);
                // save all indexes of matched scores
                if (checkIfMatched(score)) {
                    matchedIndexes.push(i);
                }
            }
            break;
        case ReturnTypeEnums_1.ReturnTypeEnums.ALL_SORTED_MATCHES: {
            var unsortedResults = [];
            for (var i = 0; i < matchListLen; i += 1) {
                var score = scoreProcessor(matchList[i]);
                // save all indexes of matched scores
                if (checkIfMatched(score)) {
                    unsortedResults.push({
                        score: score,
                        index: i
                    });
                }
            }
            switch (thresholdType) {
                case ThresholdTypeEnums_1.ThresholdTypeEnums.EDIT_DISTANCE:
                    unsortedResults.sort(function (a, b) { return a.score - b.score; });
                    break;
                case ThresholdTypeEnums_1.ThresholdTypeEnums.SIMILARITY:
                    unsortedResults.sort(function (a, b) { return b.score - a.score; });
                    break;
                /* istanbul ignore next */ default:
                    throw errors_1.unknownThresholdTypeError;
            }
            for (var _i = 0, unsortedResults_1 = unsortedResults; _i < unsortedResults_1.length; _i++) {
                var unsortedResult = unsortedResults_1[_i];
                matchedIndexes.push(unsortedResult.index);
            }
            break;
        }
        case ReturnTypeEnums_1.ReturnTypeEnums.FIRST_MATCH:
            for (var i = 0; i < matchListLen; i += 1) {
                var score = scoreProcessor(matchList[i]);
                // Return once matched, performance is main target in this returnType
                if (checkIfMatched(score)) {
                    matchedIndexes.push(i);
                    break;
                }
            }
            break;
        /* istanbul ignore next */ default:
            throw errors_1.unknownReturnTypeError;
    }
    /*+++++++++++++++++++++++
     + Process return value +
     +++++++++++++++++++++++*/
    return (0, resultProcessor_1["default"])(matchList, matchedIndexes, returnType);
}
exports["default"] = didYouMean;
