const express = require('express')
const { ROUTE } = require('../utils/Routes')
const {
    login,
    register,
    generateAccessToken,
} = require('../controllers/auth.controller')
const {
    isValidUserNameLength,
    isValidEmail,
    isValidPasswordLength,
    isMatchPasswordRegex,
} = require('../middlewares/auth.validations')
const { validate } = require('../middlewares/validation')
const router = express.Router()

//[ROUTE LOGIN ]
router.post(
    ROUTE.LOGIN,
    isValidUserNameLength,
    isValidPasswordLength,
    isMatchPasswordRegex,
    validate,
    login
)

//[ROUTE REGISTER]

router.post(
    ROUTE.REGISTER,
    isValidUserNameLength,
    isValidEmail,
    isValidPasswordLength,
    isMatchPasswordRegex,
    validate,
    register
)
//[ROUTE GENERATE NEW ACCESSTOKEN]
router.post(ROUTE.GENERATE_ACCESSTOKEN, generateAccessToken)

module.exports = router

//[ROUTE LOGIN-FACEBOOK ]
//[ROUTE LOGIN-GOOGLE ]

//[ROUTE FORGOT-PASSWORD]
router.post(ROUTE.FORGOT_PASSWORD)
//[ROUTE CHANGE-PASSWORD]
