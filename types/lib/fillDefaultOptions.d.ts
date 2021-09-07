import { ReturnTypeEnums } from '../enums/ReturnTypeEnums';
import { ThresholdTypeEnums } from '../enums/ThresholdTypeEnums';
import type { Options } from '../types';
declare const fillDefaultOptions: (options?: Partial<Readonly<{
    caseSensitive: boolean;
    deburr: boolean;
    matchPath: readonly (string | number)[];
    returnType: ReturnTypeEnums;
    threshold: number;
    thresholdType: ThresholdTypeEnums;
    trimSpaces: boolean;
}>> | undefined) => Options;
export default fillDefaultOptions;
