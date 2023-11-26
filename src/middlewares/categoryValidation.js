const { check } = require('express-validator')

exports.isValidNameCategoryLength = [
    check('name')
        .trim()
        .notEmpty()
        .withMessage('Name category is not required'),
    (req, res, next) => {
        next()
    },
]

exports.isValidTotalCategory = [
    check('total').isInt().withMessage('Total category is not required'),
    (req, res, next) => {
        next()
    },
]

exports.isValidCategoryId = [
    check('id').trim().notEmpty().withMessage('Category is not required'),
    (req, res, next) => {
        next()
    },
]
