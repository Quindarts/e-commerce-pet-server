const express = require('express')
const { ROUTE } = require('../utils/Routes')
const { getAllUser } = require('../controllers/user.controller')
const { isExpiredToken } = require('../middlewares/checkedToken')
const router = express.Router()

//[GET] get-all
router.get('/', isExpiredToken, getAllUser)

//[GET] get-by-params

//[POST]
// router.post()

//[PUT]
// router.put()

//[DELETE]
// router.post()

module.exports = router
