import Immutable from 'seamless-immutable'

import {ReturnTypeEnums} from '../enums/ReturnTypeEnums'
import {ThresholdTypeEnums} from '../enums/ThresholdTypeEnums'
import fillDefaultOptions from './fillDefaultOptions'

const defaultOptions = Immutable({
  caseSensitive: false,
  deburr: false,
  matchPath: [],
  returnType: ReturnTypeEnums.FIRST_CLOSEST_MATCH,
  threshold: 0.4,
  thresholdType: ThresholdTypeEnums.SIMILARITY,
  trimSpaces: true
})

const defaultOptionsForEditDistance = Immutable({
  caseSensitive: false,
  deburr: false,
  matchPath: [],
  returnType: ReturnTypeEnums.FIRST_CLOSEST_MATCH,
  threshold: 20,
  thresholdType: ThresholdTypeEnums.EDIT_DISTANCE,
  trimSpaces: true
})

test('without arguments', () => {
  expect(fillDefaultOptions()).toEqual(defaultOptions)
})

test(`thresholdType: "${ThresholdTypeEnums.EDIT_DISTANCE}"`, () => {
  expect(
    fillDefaultOptions({
      thresholdType: ThresholdTypeEnums.EDIT_DISTANCE
    })
  ).toEqual(defaultOptionsForEditDistance)
})