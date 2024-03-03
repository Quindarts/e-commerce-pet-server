const Order = require('../models/order.model')
const Cart = require('../models/cart.model')
const OrderDetail = require('../models/orderDetail.model')
const Product = require('../models/product.model')
const {
    HTTP_STATUS,
    ORDER_STATUS,
    STATUS_ORDER,
    PAYMENT_METHOD,
} = require('../utils/constant')
const { generateOrderCode } = require('../helper/randomCode')
const { createPayment } = require('./paymentInfo.controller')

//[GET ALL BY PARAMS]
const getAllOrderByParams = async (req, res) => {
    const { limit, offset } = req.params
    try {
        const listOrder = Order.find()
            .limit(limit)
            .skip((offset - 1) * limit)
            .sort({ createdAt: -1 })
            .lean()

        if (!listOrder) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                status: HTTP_STATUS.NOT_FOUND,
                message: 'Get all list order not found.',
            })
        }
        return res.status(HTTP_STATUS.OK).json({
            success: true,
            status: HTTP_STATUS.OK,
            message: 'Get list order success.',
            list: listOrder,
            params: {
                limit: limit,
                page: offset,
            },
        })
    } catch (error) {
        console.log('🚀 ~ getAllOrderByParams ~ error:', error)
    }
}

//[POST] CREATE ORDER
const createOrderByCartUser = async (req, res) => {
    const { user_id, shipping_detail } = req.body
    const code = generateOrderCode(6)

    try {
        const cartUser = await Cart.findById(user_id).lean()
        let cartDetailsProduct = []
        let totalItem = 0

        if (!cartUser) {
            return res.status(HTTP_STATUS.CONFLICT).json({
                success: false,
                status: HTTP_STATUS.CONFLICT,
                message: 'No cart user found.',
            })
        } else {
            for (let i = 0; i < cartUser.cart_details.length; i++) {
                let detail = cartUser.cart_details[i]
                const product = await Product.findById(
                    detail['product_id']
                ).lean()

                cartDetailsProduct.push({
                    product,
                    attributeProduct: {},
                    quantity: detail['quantity'],
                })
                totalItem += detail['quantity'] * product['price']
            }

            const newOrder = await Order.create({
                code: code,
                orderDetails: cartDetailsProduct,
                countOrderItem: cartDetailsProduct.length,
                totalOrderItem: caculateTotalOrder(
                    totalItem,
                    { precent: 10 },
                    5
                ),
                user_id: user_id,
                shipping_detail: shipping_detail,
            })
            if (!newOrder) {
                return res.status(HTTP_STATUS.CONFLICT).json({
                    success: false,
                    status: HTTP_STATUS.CONFLICT,
                    message: 'Create Order failed. Try again',
                })
            }
            return res.status(HTTP_STATUS.CREATED).json({
                success: true,
                status: HTTP_STATUS.CREATED,
                message: 'Create Order success',
                newOrder,
            })
        }
    } catch (error) {
        console.log('🚀 ~ createOrder ~ error:', error)
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Create Order failed. Try again',
        })
    }
}
//[HELP] calulate total order
const caculateTotalOrder = (totalItem, coupon, shippingValue) => {
    let couponValue
    if (coupon['precent']) {
        couponValue = coupon['precent'] / 100
        return parseInt((totalItem + shippingValue) * (1 - couponValue))
    } else {
        couponValue = coupon['money']
        return totalItem + shippingValue - couponValue
    }
}

//[UPDATE] CHANGE <STATUS = PROCCESS> WHEN PAYMENT PROCCESS
const handleOrderByPaymentOnline = async (req, res) => {
    const { order_id } = req.params
    const { amount, bankCode, language } = req.body

    try {
        const orderPayment = await Order.findById(order_id).lean()
        console.log(
            '🚀 ~ handleOrderByPaymentOnline ~ orderPayment:',
            orderPayment
        )

        // if (!orderPayment) {
        //     return res.status(HTTP_STATUS.CONFLICT).json({
        //         success: false,
        //         status: HTTP_STATUS.CONFLICT,
        //         message: 'Change status order failed. No Order found',
        //     })
        // }
        // if (orderPayment.status !== STATUS_ORDER.UNPAID) {
        //     return res.status(HTTP_STATUS.CONFLICT).json({
        //         success: false,
        //         status: HTTP_STATUS.CONFLICT,
        //         message: 'Order status not found.',
        //     })
        // }
        const resultChange = await Order.findOneAndUpdate(
            {
                _id: order_id,
            },
            {
                $set: {
                    status: STATUS_ORDER.PROCESSING,
                },
                $pull: {
                    paymentMethod: PAYMENT_METHOD.ONLINE,
                },
            },
            {
                new: true,
            }
        )
        if (resultChange) {
            const vpnUrl = await createPayment(
                req,
                res,
                amount,
                bankCode,
                language
            )
            if (!vpnUrl) {
                return res.status(HTTP_STATUS.CONFLICT).json({
                    success: false,
                    status: HTTP_STATUS.NOT_FOUND,
                    message: 'Go to Payment failed. Please try again!',
                })
            }
            return res.status(HTTP_STATUS.OK).json({
                success: false,
                status: HTTP_STATUS.OK,
                message: 'Order need to payment.',
                vpnUrl: vpnUrl,
                order: resultChange,
            })
        }
    } catch (error) {
        console.log('🚀 ~ handleOrderByPaymentOnline ~ error:', error)
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Payment order not working. Try again',
        })
    }
}

//

module.exports = {
    createOrderByCartUser,
    handleOrderByPaymentOnline,
    getAllOrderByParams,
}
