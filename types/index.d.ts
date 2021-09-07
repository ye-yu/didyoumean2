import { ReturnTypeEnums } from './enums/ReturnTypeEnums';
import { ThresholdTypeEnums } from './enums/ThresholdTypeEnums';
import type { MatchItem, Options } from './types';
declare function didYouMean<T extends MatchItem>(input: string, matchList: ReadonlyArray<T>, options?: Partial<Options> & Readonly<{
    returnType?: ReturnTypeEnums.FIRST_CLOSEST_MATCH | ReturnTypeEnums.FIRST_MATCH;
}>): T | null;
declare function didYouMean<T extends MatchItem>(input: string, matchList: ReadonlyArray<T>, options: Partial<Options> & Readonly<{
    returnType: ReturnTypeEnums.ALL_CLOSEST_MATCHES | ReturnTypeEnums.ALL_MATCHES | ReturnTypeEnums.ALL_SORTED_MATCHES;
}>): Array<T>;
export default didYouMean;
export { ReturnTypeEnums, ThresholdTypeEnums };
