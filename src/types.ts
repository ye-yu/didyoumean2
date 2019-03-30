import {ReturnTypeEnums} from './enums/ReturnTypeEnums'
import {ThresholdTypeEnums} from './enums/ThresholdTypeEnums'

export type Options = Readonly<{
  caseSensitive: boolean
  deburr: boolean
  matchPath: ReadonlyArray<number | string>
  returnType: ReturnTypeEnums
  threshold: number
  thresholdType: ThresholdTypeEnums
  trimSpaces: boolean
}>

export type InputOptions = Partial<Options>
