const { body, query, param } = require('express-validator')
const { validate } = require('./validation')
const Provider = require('../models/provider.model')

// function check exist by property
function checkExistByProperty(property) {
    const checkExist = async (value) => {
        const check = await Provider.exists({
            [property]: value,
        })
        if (check) {
            throw new Error(`${property} already in use`)
        }
    }
    return checkExist
}

// function check exist by id
async function checkExistById(providerId) {
    const exist = await Provider.exists({
        _id: providerId,
    })
    if (!exist) {
        throw new Error(`Provider is not existed`)
    }
}

const isValidProviderId = [
    param('providerId')
        .custom(checkExistById)
        .withMessage('Provider is not existed'),
    validate,
]

// validate name, email, phone for creating provider
const isValidCreateProviderRequest = [
    body('name').isString().withMessage('Please enter a valid name'),
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .custom(checkExistByProperty('email'))
        .withMessage('E-mail already in use'),
    body('phone')
        .isNumeric()
        .isLength({ min: 9, max: 10 })
        .withMessage(
            'Please enter a valid phone number, length must be 9 to 10 numbers '
        )
        .custom(checkExistByProperty('phone'))
        .withMessage('Phone number already in use'),
    validate,
]

// validate name, email, phone for updating provider
const isValidUpdateProviderRequest = [
    body('name')
        .isString()
        .withMessage(
            'Please enter a valid name, your previous name or your new name'
        ),
    body('email')
        .isEmail()
        .withMessage(
            'Please enter a valid email, your previous email or your new email'
        ),
    body('phone')
        .isNumeric()
        .isLength({ min: 9, max: 10 })
        .withMessage(
            'Please enter a valid phone number, your previous phone number or your new phone number, length must be 9 to 10 numbers '
        ),
    validate,
]

// validate seach param
const isValidGetManyQueryParams = [
    query('limit').isNumeric().withMessage('Limit must be number'),
    query('offset').isNumeric().withMessage('Offset must be number'),
    validate,
]

module.exports = {
    isValidCreateProviderRequest,
    isValidGetManyQueryParams,
    isValidUpdateProviderRequest,
    isValidProviderId,
}
