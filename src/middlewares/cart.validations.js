const { check } = require('express-validator')
const { ObjectId } = require('mongodb')

exports.isValidProductIdCart = [
    check('cart_details.product_id')
        .isEmpty()
        .withMessage('No product id provider'),
    (req, res, next) => {
        next()
    },
]
exports.isValidQuantityProductCart = [
    check('cart_details.*.quantity')
        .isInt({ gt: 0 })
        .withMessage('Quantity must be number and greater than 0'),
    (req, res, next) => {
        next()
    },
]
exports.isValidStockProductCart = [
    check('cart_details.**.stock')
        .isInt({ gt: 0 })
        .withMessage('Stock must be number and greater than 0'),
    (req, res, next) => {
        next()
    },
]
exports.isValidPriceProductCart = [
    check('cart_details.**.price')
        .isInt({ gt: 0 })
        .withMessage('Price must be number and greater than 0'),
    (req, res, next) => {
        next()
    },
]
exports.isValidWeightProductCart = [
    check('cart_details.**.weight')
        .isInt({ gt: 0 })
        .withMessage('Weight must be number and greater than 0'),
    (req, res, next) => {
        next()
    },
]
