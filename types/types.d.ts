import type { ReturnTypeEnums } from './enums/ReturnTypeEnums';
import type { ThresholdTypeEnums } from './enums/ThresholdTypeEnums';
export declare type MatchItem = Record<string, unknown> | string;
export declare type Options = Readonly<{
    caseSensitive: boolean;
    deburr: boolean;
    matchPath: ReadonlyArray<number | string>;
    returnType: ReturnTypeEnums;
    threshold: number;
    thresholdType: ThresholdTypeEnums;
    trimSpaces: boolean;
}>;
