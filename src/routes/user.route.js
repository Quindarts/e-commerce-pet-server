const express = require('express')
const { ROUTE } = require('../utils/Routes')
const { getAllUser, getUserById } = require('../controllers/user.controller')
const { isExpiredToken } = require('../handler/token.handler')
const router = express.Router()

//[GET] get-all
router.get('/', isExpiredToken, getAllUser)

//[GET] get-by-id
router.get(ROUTE.USER_BY_ID, isExpiredToken, getUserById)
//[GET] get-by-params

//[POST]
// router.post()

//[PUT]
// router.put()

//[DELETE]
// router.post()

module.exports = router
