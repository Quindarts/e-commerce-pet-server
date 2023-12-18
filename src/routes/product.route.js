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
const {
    isValidIdBodyAndQuery,
    isValidIdBodyAndQueryParams,
} = require('../middlewares/product.validation')
const { validate } = require('../middlewares/validation')

//[ROUTE GET ALL] //get-all?limit=&offset=
router.get('/', isValidIdBodyAndQueryParams, validate, getAllProduct)

//[ROUTE GET] /:id
router.get(ROUTE.PRODUCT_BY_ID, getProductByID)

//[ROUTE POST] /
router.post('/', createProduct)

//[ROUTE UPDATE]
router.put(ROUTE.PRODUCT_BY_ID, isValidIdBodyAndQuery, validate, updateProduct)

//[ROUTE DELETE]
router.put(ROUTE.PRODUCT_CHANGE_STATUS, deleteProduct)

module.exports = router
