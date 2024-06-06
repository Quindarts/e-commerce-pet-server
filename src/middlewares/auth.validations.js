const { check } = require('express-validator')


exports.isValidUserNameLength = [
    check('userName')
        .isLength({ min: 8 })
        .withMessage('Username must be at least 8 characters long'),
    (req, res, next) => {
        next()
    },
]

exports.isValidPasswordLength = [
    check('password')
        .optional()
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),
    (req, res, next) => {
        next()
    },
    check('newPassword')
        .optional()
        .isLength({ min: 8 })
        .withMessage('New password must be at least 8 characters long'),
    (req, res, next) => {
        next()
    },
]

exports.isValidEmail = [
    check('email').isEmail().withMessage('Email is wrong'),
    (req, res, next) => {
        next()
    },
]

exports.isMatchPasswordRegex = [
    check('password')
        .optional()
        .custom((value) => {
            const regex =
                /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d@$!%*#?&]{8,}$/
            if (!regex.test(value))
                return Promise.reject(
                    'Password must be at least 1 Upper, 1 lower and 1 number character'
                )
            return true
        }),
    (req, res, next) => {
        next()
    },
    check('newPassword')
        .optional()
        .custom((value) => {
            const regex =
                /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d@$!%*#?&]{8,}$/
            if (!regex.test(value))
                return Promise.reject(
                    'New password must be at least 1 Upper, 1 lower and 1 number character'
                )
            return true
        }),
    (req, res, next) => {
        next()
    },
]

exports.isConfirmPasswordMatch = [
    check('confirmPassword')
        .optional()
        .custom((value, { req }) => {
            if (value !== req.body.password)
                return Promise.reject('Passwords does not match')
            return true
        }),
    (req, res, next) => {
        next()
    },
    check('confirmNewPassword')
        .optional()
        .custom((value, { req }) => {
            if (value !== req.body.newPassword)
                return Promise.reject(
                    'New password and confirm new password does not match'
                )
            return true
        }),
    (req, res, next) => {
        next()
    },
]
