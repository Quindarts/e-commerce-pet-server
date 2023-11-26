const express = require('express')
const { ROUTE } = require('../utils/Routes')
const { getAllUser } = require('../controllers/user.controller')
const { isExpiredToken } = require('../middlewares/checkToken')
const router = express.Router()

//[GET]
router.get(ROUTE.GET_ALL_USER, isExpiredToken, getAllUser)
//[POST]
// router.post()
//[PUT]
// router.put()
//[DELETE]
// router.post()

module.exports = router
