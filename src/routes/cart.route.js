const express = require('express')
const { ROUTE } = require('../utils/Routes')
const {
    getCartByUserId,
    getAllCart,
    createCart,
    updateCart,
    resetCart,
    updateCartByProductID,
} = require('../controllers/cart.controller')
const { isActiveUser } = require('../handler/user.handler')
const { isExpiredToken } = require('../handler/token.handler')
const {
    isValidQuantityProductCart,
    isValidProductIdCart,
    isValidStockProductCart,
    isValidPriceProductCart,
    isValidWeightProductCart,
    isValidUserId,
} = require('../middlewares/cart.validations')
const { validate } = require('../middlewares/validation')
const router = express.Router()

//[GET ALL]
router.get('/', getAllCart)

//[GET CART BY USER ID]
router.get(ROUTE.CART_BY_USER_ID, isExpiredToken, isActiveUser, getCartByUserId)

//[CREATE CART BY USER ID]
router.post(ROUTE.CART_BY_USER_ID, isExpiredToken, isActiveUser, createCart)

router.put(
    ROUTE.CART_UPDATE_BY_PRODUCT_ID,
    // isExpiredToken,
    // isActiveUser,
    // validate,
    updateCartByProductID
)
//[UPDATE CART BY USER ID]
// router.put(
//     ROUTE.CART_BY_USER_ID,
//     isValidProductIdCart,
//     isValidStockProductCart,
//     isValidPriceProductCart,
//     isValidWeightProductCart,
//     isValidQuantityProductCart,
//     isExpiredToken,
//     isActiveUser,
//     validate,
//     updateCart
// )

//[RESET CART BY USER ID]
router.delete(ROUTE.CART_BY_USER_ID, isExpiredToken, isActiveUser, resetCart)

module.exports = router
