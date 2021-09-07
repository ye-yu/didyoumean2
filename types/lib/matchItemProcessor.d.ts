import type { MatchItem, Options } from '../types';
/**
 * Process matchItem according to options
 *
 * @param {Object|string} matchItem - Item for matching with `input`
 * @param {Object} options - options that allows you to modify the behavior
 * @returns {string} - processed matchItem
 */
declare const matchItemProcessor: (matchItem: MatchItem, options: Options) => string;
export default matchItemProcessor;
