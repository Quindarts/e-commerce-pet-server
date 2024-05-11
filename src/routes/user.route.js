const express = require('express')
const { ROUTE } = require('../utils/Routes')
const {
    getAllUser,
    getUserById,
    updateUser,
    changeActiveUser,
} = require('../controllers/user.controller')
const { isExpiredToken } = require('../handler/token.handler')
const { checkCurrentRole } = require('../handler/user.handler')
const { ROLES } = require('../utils/constant')
const router = express.Router()

//[GET] get-all
router.get(
    '/',
    isExpiredToken,
    (req, res, next) => checkCurrentRole(req, res, next, ROLES.ADMIN),
    getAllUser
)

//[GET] get-by-id
router.get(ROUTE.USER_BY_ID, isExpiredToken, getUserById)
//[GET] get-by-params

//[POST]
router.post(
    ROUTE.USER_BY_ID,
    isExpiredToken,
    (req, res, next) => checkCurrentRole(req, res, next, ROLES.ADMIN),
    updateUser
)

//[POST CHANGE ACTIVE]
router.put(
    ROUTE.USER_CHANGE_ACTIVE,
    isExpiredToken,
    (req, res, next) => checkCurrentRole(req, res, next, ROLES.OWNER),
    changeActiveUser
)
//[DELETE]

// router.post()

module.exports = router
