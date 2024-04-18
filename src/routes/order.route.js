const express = require('express')
const {
    createOrderByCartUser,
    handleOrderByPaymentOnline,
    getAllOrderByParams,
} = require('../controllers/order.controller')

const router = express.Router()

router.get('/', getAllOrderByParams)
router.post('/', createOrderByCartUser)
router.post('/:order_id/payment_online', handleOrderByPaymentOnline)

module.exports = router
