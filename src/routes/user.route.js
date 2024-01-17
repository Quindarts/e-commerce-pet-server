const express = require('express')
const { ROUTE } = require('../utils/Routes')
const {
    getAllUser,
    getUserById,
    updateUser,
    changeActiveUser,
} = require('../controllers/user.controller')
const { isExpiredToken } = require('../handler/token.handler')
const router = express.Router()

//[GET] get-all
router.get('/', isExpiredToken, getAllUser)

//[GET] get-by-id
router.get(ROUTE.USER_BY_ID, isExpiredToken, getUserById)
//[GET] get-by-params

//[POST]
router.post(ROUTE.USER_BY_ID, isExpiredToken, updateUser)

//[POST CHANGE ACTIVE]
router.put(ROUTE.USER_CHANGE_ACTIVE, isExpiredToken, changeActiveUser)
//[DELETE]
// router.post()

module.exports = router
