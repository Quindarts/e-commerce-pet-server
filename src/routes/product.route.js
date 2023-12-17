const express = require('express')
const { ROUTE } = require('../utils/Routes')
const router = express.Router()
const {
    getProductByID,
    getAllProduct,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/product.controller')

//[ROUTE GET ALL] //get-all?limit=&offset=
router.get('/', getAllProduct)

//[ROUTE GET] /:id
router.get(ROUTE.PRODUCT_BY_ID, getProductByID)

//[ROUTE POST] /
router.post('/', createProduct)

//[ROUTE UPDATE]
router.put(ROUTE.PRODUCT_BY_ID, updateProduct)

//[ROUTE DELETE]
router.put(ROUTE.PRODUCT_CHANGE_STATUS, deleteProduct)

module.exports = router
