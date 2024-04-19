const moment = require('moment')
const Order = require('../models/order.model')
const User = require('../models/user.model')
const Product = require('../models/product.model')
const Cart = require('../models/cart.model')
const { HTTP_STATUS } = require('../utils/constant')

//[POST] CREATE PAYMENT
const createPayment = async (req, res, amount, bankCode, language) => {
    process.env.TZ = 'Asia/Ho_Chi_Minh'

    let date = new Date()
    let createDate = moment(date).format('YYYYMMDDHHmmss')

    let ipAddr =
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress

    // let config = require('config')
    let tmnCode = `${process.env.VNP_TMNCODE}`
    let secretKey = `${process.env.VNP_HASH_SECERT}`
    let vnpUrl = `${process.env.VNP_URL}`
    let returnUrl = `${process.env.VNP_RETURN_URL}`
    let orderId = moment(date).format('DDHHmmss')
    // let amount = req.body.amount
    // let bankCode = req.body.bankCode

    let locale = language
    if (locale === null || locale === '') {
        locale = 'vn'
    }
    let currCode = 'VND'
    let vnp_Params = {}
    vnp_Params['vnp_Version'] = '2.1.0'
    vnp_Params['vnp_Command'] = 'pay'
    vnp_Params['vnp_TmnCode'] = 'PY5RFARW'
    vnp_Params['vnp_Locale'] = locale
    vnp_Params['vnp_CurrCode'] = currCode
    vnp_Params['vnp_TxnRef'] = orderId
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId
    vnp_Params['vnp_OrderType'] = 'other'
    vnp_Params['vnp_Amount'] = amount * 100
    vnp_Params['vnp_ReturnUrl'] = returnUrl
    vnp_Params['vnp_IpAddr'] = ipAddr
    vnp_Params['vnp_CreateDate'] = createDate

    if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = bankCode
    }

    vnp_Params = sortObject(vnp_Params)

    let querystring = require('qs')
    let signData = querystring.stringify(vnp_Params, { encode: false })
    let crypto = require('crypto')
    let hmac = crypto.createHmac('sha512', secretKey)
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex')
    vnp_Params['vnp_SecureHash'] = signed
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false })

    return vnpUrl
}

//[GET] RETURN PAYMENT STATUS
// clear cart => change status order = express -> send order warehouse => select shipper to shipping
const getPaymentSatus = async (req, res) => {
    let vnp_Params = req.query
    let secureHash = vnp_Params['vnp_SecureHash']

    delete vnp_Params['vnp_SecureHash']
    delete vnp_Params['vnp_SecureHashType']

    vnp_Params = sortObject(vnp_Params)
    // let config = require('config')
    let tmnCode = `${process.env.VNP_TMNCODE}`
    let secretKey = `${process.env.VNP_HASH_SECERT}`
    let querystring = require('qs')
    let signData = querystring.stringify(vnp_Params, { encode: false })
    let crypto = require('crypto')
    let hmac = crypto.createHmac('sha512', secretKey)
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex')

    if (secureHash === signed) {
        return res.status(HTTP_STATUS.OK).json({
            success: true,
            status: HTTP_STATUS.OK,
            message: 'Payment success',
            vnp_TmnCode: 'PY5RFARW',
            code: vnp_Params['vnp_ResponseCode'],
        })
    } else {
        res.status(HTTP_STATUS.NOT_FOUND).json({
            success: false,
            message: 'Payment failed',
            code: '97',
        })
    }
}
function sortObject(obj) {
    let sorted = {}
    let str = []
    let key
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key))
        }
    }
    str.sort()
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(
            /%20/g,
            '+'
        )
    }
    return sorted
}
module.exports = {
    createPayment,
    getPaymentSatus,
}
