
const express = require('express')
const router = express.Router()
const {
    createPayment,
    getPaymentSatus,
} = require('../controllers/paymentInfo.controller')

//[POST] CREATE PAYMENT
router.post('/create_payment_url', createPayment)

//[GET] RETURN PAYMENT STATUS
router.get('/payment_info', getPaymentSatus)

module.exports = router
