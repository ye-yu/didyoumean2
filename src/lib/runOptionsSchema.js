'use strict'

const returnTypeEnums = require('../enums/returnTypeEnums')
const simpleSchema = require('./simpleSchema')
const thresholdTypeEnums = require('../enums/thresholdTypeEnums')
const values = require('ramda/src/values')

const EDIT_DISTANCE = thresholdTypeEnums.EDIT_DISTANCE
const SIMILARITY = thresholdTypeEnums.SIMILARITY

/**
 * Run `simpleSchema` on `options`
 * @param {null|Object|undefined} options - An options that allows you to modify the behavior
 * @return {Object} options with default values
 */
function runOptionsSchema(options) {
  options = simpleSchema(options, {
    type: 'object',
    default: {}
  })

  options.caseSensitive = simpleSchema(options.caseSensitive, {
    type: 'boolean',
    default: false
  })

  options.deburr = simpleSchema(options.deburr, {
    type: 'boolean',
    default: false
  })

  options.matchPath = simpleSchema(options.matchPath, {
    type: 'array',
    default: []
  })

  options.returnType = simpleSchema(options.returnType, {
    type: 'string',
    default: returnTypeEnums.FIRST_CLOSEST_MATCH,
    enum: values(returnTypeEnums)
  })

  options.thresholdType = simpleSchema(options.thresholdType, {
    type: 'string',
    default: SIMILARITY,
    enum: values(thresholdTypeEnums)
  })

  switch (options.thresholdType) {
    case EDIT_DISTANCE:
      options.threshold = simpleSchema(options.threshold, {
        type: 'integer',
        default: 20
      })
      break

    case SIMILARITY:
      options.threshold = simpleSchema(options.threshold, {
        type: 'number',
        default: 0.4
      })
      break

    /* istanbul ignore next */ default:
    // handled by simpleSchema
  }

  options.trimSpaces = simpleSchema(options.trimSpaces, {
    type: 'boolean',
    default: true
  })

  return options
}

module.exports = runOptionsSchema
