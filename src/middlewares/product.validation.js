const { check, buildCheckFunction, oneOf } = require('express-validator')
const checkBodyAndQuery = buildCheckFunction(['body', 'query'])

exports.isValidNameProductLength = [
    check('name').trim().notEmpty().withMessage('Name Product is required'),
    (req, res, next) => {
        next()
    },
]

exports.isValidPriceProduct = [
    check('price').isInt().withMessage('Price product is required'),
    (req, res, next) => {
        next()
    },
]

exports.isValidIdBodyAndQuery = [
    checkBodyAndQuery().trim().notEmpty().withMessage('Product id is required'),
    (req, res, next) => {
        next()
    },
]

exports.isValidIdBodyAndQueryParams = [
    checkBodyAndQuery('limit')
        .trim()
        .notEmpty()
        .withMessage('Limit is required'),
    checkBodyAndQuery('offset')
        .trim()
        .notEmpty()
        .withMessage('Offset is required'),
    (req, res, next) => {
        next()
    },
]
