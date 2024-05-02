const { body, query } = require('express-validator')
const { validate } = require('./validation')

// validate name, email, phone for creating provider
const isValidCreateProviderRequest = [
    body('name').isString().withMessage('Please enter a valid name'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('phone').isNumeric().withMessage('Please enter a valid phone number'),
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
        .withMessage(
            'Please enter a valid phone number, your previous phone number or your new phone number'
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
}
