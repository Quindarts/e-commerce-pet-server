const express = require('express')
const {
    createOrderByCartUser,
    handleOrderByPaymentOnline,
} = require('../controllers/order.controller')
const router = express.Router()

router.post('/', createOrderByCartUser)
router.post('/:order_id/payment_online', handleOrderByPaymentOnline)

module.exports = router
