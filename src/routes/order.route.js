const express = require('express')
const {
    createOrderByCartUser,
    handleOrderByPaymentOnline,
    getAllOrderByParams,
    getOrderByUserId,
    getOrderById,
} = require('../controllers/order.controller')
const { ROUTE } = require('../utils/Routes')

const router = express.Router()

//[GET BY PARAMS]
router.get(ROUTE.ORDER_BY_PARAMS, getAllOrderByParams)

//[GET BY ORDER ID]
router.get(ROUTE.ORDER_BY_ID, getOrderById)

//[GET ORDER BY USER ID]
router.get(ROUTE.ORDER_BY_USER_ID, getOrderByUserId)

//[POST =  CREATE ORDER BY CART USER]
router.post('/', createOrderByCartUser)

//[POST CREATE PAYMENT ONLINE]
router.post(ROUTE.ORDER_BY_ID_CREATE_PAYMENT_ONLINE, handleOrderByPaymentOnline)

module.exports = router
