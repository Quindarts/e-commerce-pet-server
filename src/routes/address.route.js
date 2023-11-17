const express = require('express')
const { ROUTE } = require('../utils/Routes')
const { createAddress } = require('../controllers/address.controller')
const router = express.Router()

//[POST]
router.post(ROUTE.CREATE_ADDRESS, createAddress)

module.exports = router
