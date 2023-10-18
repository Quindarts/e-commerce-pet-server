const express = require('express')
const { ROUTE } = require('../utils/Routes')
const { login, register } = require('../controllers/auth.controller')
const router = express.Router()

//[ROUTE LOGIN ]
router.post(ROUTE.LOGIN, login)

//[ROUTE REGISTER]
router.post(ROUTE.REGISTER, register)
console.log("🚀 ~ file: auth.route.js:11 ~ router:", router)


module.exports = router

//[ROUTE LOGIN-FACEBOOK ]
//[ROUTE LOGIN-GOOGLE ]

//[ROUTE FORGOT-PASSWORD]
//[ROUTE CHANGE-PASSWORD]
