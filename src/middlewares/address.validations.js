const { check } = require('express-validator')

exports.isValidProvinceLength = [
    // check('province.provinceName')
    //     .isLength({ min: 3 })
    //     .withMessage('Province name is not required'),
    // (req, res, next) => {
    //     next()
    // },
]

exports.isValidCountryLength = [
    check('country')
        .isLength({ min: 3 })
        .withMessage('Country is not required'),
    (req, res, next) => {
        next()
    },
]
exports.isHavedAddressId = [
    check('address_id')
        .isLength({ min: 10 })
        .withMessage('AddressId is not valid'),
    (req, res, next) => {
        next()
    },
]
