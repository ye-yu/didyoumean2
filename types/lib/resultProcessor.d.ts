import { ReturnTypeEnums } from '../enums/ReturnTypeEnums';
/**
 * Generate result
 *
 * @param {Object[]|string[]} matchList - List for matching with `input`
 * @param {number[]} matchedIndexes - indexes of matchList that need to be returned as result
 * @param {ReturnTypeEnums} returnType - how the result will response to user
 * @returns {Array|null|Object|string} - matched result(s), return object if `match` is `{Object[]}`
 */
declare const resultProcessor: <T>(matchList: readonly T[], matchedIndexes: ReadonlyArray<number>, returnType: ReturnTypeEnums) => T | T[] | null;
export default resultProcessor;
