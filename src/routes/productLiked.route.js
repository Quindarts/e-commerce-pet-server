const express = require('express')
const {
    getAllProductLiked,
    getProductLikedById,
    updateProductLikedByUserIdAndProductId,
    createProductLikedByUserId,
    deleteProductLikedByUserIdByProductId,
} = require('../controllers/productLiked.controller')
const { ROUTE } = require('../utils/Routes')
const router = express.Router()

router.get('/', getAllProductLiked)
router.get(ROUTE.PRODUCT_LIKED_USER, getProductLikedById)
router.post(ROUTE.PRODUCT_LIKED_USER, createProductLikedByUserId)
router.put(ROUTE.PRODUCT_LIKED_USER, updateProductLikedByUserIdAndProductId)
router.delete(ROUTE.PRODUCT_LIKED_USER, deleteProductLikedByUserIdByProductId)

module.exports = router
