const express = require('express')
const { ROUTE } = require('../utils/Routes')
const {
    getCartByUserId,
    getAllCart,
    createCart,
    updateCart,
    resetCart,
    updateCartByProductID,
    deleteProductInCartByProductId,
    addProductToCart,
} = require('../controllers/cart.controller')
const { isActiveUser, checkCurrentRole } = require('../handler/user.handler')
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
const { isNotExitsProductInCart } = require('../handler/cart.handler')
const { ROLES } = require('../utils/constant')
const router = express.Router()

//[GET ALL]
router.get('/', getAllCart)

//[GET CART BY USER ID]
router.get(
    ROUTE.CART_BY_USER_ID,
    isExpiredToken,
    (req, res, next) => checkCurrentRole(req, res, next, ROLES.USER),
    // isExpiredToken, isActiveUser,
    getCartByUserId
)

//[CREATE CART BY USER ID]
router.post(
    ROUTE.CART_BY_USER_ID,
    isExpiredToken,
    (req, res, next) => checkCurrentRole(req, res, next, ROLES.USER),
    createCart
)

//[CREATE CART BY USER ID]
router.post(
    ROUTE.CART_BY_USER_ID,
    isExpiredToken,
    (req, res, next) => checkCurrentRole(req, res, next, ROLES.USER),
    createCart
)

// [UPDATE CART BY USER ID]
router.put(
    ROUTE.CART_BY_USER_ID,
    // isValidProductIdCart,
    // isValidStockProductCart,
    // isValidPriceProductCart,
    // isValidWeightProductCart,
    // isValidQuantityProductCart,
    // isExpiredToken,
    // isActiveUser,
    validate,
    isExpiredToken,
    (req, res, next) => checkCurrentRole(req, res, next, ROLES.USER),
    updateCart
)

//[ADD  CART BY PRODUCT ID]
router.post(
    ROUTE.CART_UPDATE_BY_PRODUCT_ID,
    isExpiredToken,
    (req, res, next) => checkCurrentRole(req, res, next, ROLES.USER),
    addProductToCart
)

//[UPDATE CART BY PRODUCT ID]
router.put(
    ROUTE.CART_UPDATE_BY_PRODUCT_ID,
    isExpiredToken,
    // isActiveUser,
    validate,
    (req, res, next) => checkCurrentRole(req, res, next, ROLES.USER),
    updateCartByProductID
)
//[DELETE CART BY PRODUCT ID]

router.delete(
    ROUTE.CART_UPDATE_BY_PRODUCT_ID,
    isExpiredToken,
    // isActiveUser,
    validate,
    (req, res, next) => checkCurrentRole(req, res, next, ROLES.USER),
    deleteProductInCartByProductId
)

//[RESET CART BY USER ID]
router.delete(
    ROUTE.CART_BY_USER_ID,
    isExpiredToken,
    //  isActiveUser,
    (req, res, next) => checkCurrentRole(req, res, next, ROLES.USER),
    resetCart
)

module.exports = router
