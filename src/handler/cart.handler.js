const Cart = require('../models/cart.model')
const { HTTP_STATUS } = require('../utils/constant')

const isNotExitsProductInCart = async (req, res, next) => {
    const body = req.body
    let list_product = []
    body['cart_details'].forEach((pr) => {
        list_product.push(pr['product_id'])
    })
    let count = 0
    list_product.map(
        (pr_id, index) => list_product.indexOf(pr_id) === index && count++
    )
    return count !== list_product.length
        ? res.status(HTTP_STATUS.CONFLICT).json({
              success: false,
              status: HTTP_STATUS.CONFLICT,
              message: 'Duplicate products in the shopping cart',
          })
        : next()
}

module.exports = { isNotExitsProductInCart }
