
const express = require('express')
const router = express.Router()
const {
    createPayment,
    getPaymentSuccess,
} = require('../controllers/paymentInfo.controller')
const { ROUTE } = require('../utils/Routes')

//[POST] CREATE PAYMENT
router.post(ROUTE.CREATE_PAYMENT, createPayment)

//[GET] RETURN PAYMENT STATUS
router.get(ROUTE.GET_PAYMENT_ONLINE, getPaymentSuccess)

module.exports = router
