const { check } = require('express-validator')

exports.isValidNameCategoryLength = [
    check('name').trim().notEmpty().withMessage('Name category is required'),
    (req, res, next) => {
        next()
    },
]

exports.isValidTotalCategory = [
    check('total').isInt().withMessage('Total category is required'),
    (req, res, next) => {
        next()
    },
]

exports.isValidCategoryId = [
    check('category_id').trim().notEmpty().withMessage('Category is required'),
    (req, res, next) => {
        next()
    },
]
