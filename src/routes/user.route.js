const express = require('express')
const { ROUTE } = require('../utils/Routes')
const {
    getAllUser,
    getUserById,
    updateUser,
    changeActiveUser,
    getUserByName,
    filterUser,
} = require('../controllers/user.controller')
const { isExpiredToken } = require('../handler/token.handler')
const {
    isValidIdBodyAndQueryParams,
} = require('../middlewares/product.validation')
const { validate } = require('../models/user.model')
const router = express.Router()

//[GET] get-all
router.get(
    '/',
    isValidIdBodyAndQueryParams,
    validate,
    isExpiredToken,
    getAllUser
)

//[GET] get-by-id
router.get(ROUTE.USER_BY_ID, isExpiredToken, getUserById)
//[GET] get-by-params

//[GET] get-by-query
router.get(ROUTE.USER_BY_NAME, isExpiredToken, getUserByName)

//[POST]
router.post(ROUTE.USER_BY_ID, isExpiredToken, updateUser)

//[POST CHANGE ACTIVE]
router.put(ROUTE.USER_CHANGE_ACTIVE, isExpiredToken, changeActiveUser)
//[DELETE]

//[ROUTE FILTER]
router.get(ROUTE.USER_FILTER, isExpiredToken, filterUser)
// router.post()

module.exports = router
