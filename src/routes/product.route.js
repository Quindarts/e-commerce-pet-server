const express = require('express')
const { ROUTE } = require('../utils/Routes')
const router = express.Router()
const {
    getProductByID,
    getAllProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductByQuery,
    filterProduct,
    getProductByCategory,
} = require('../controllers/product.controller')
const { uploadSingleImage } = require('../controllers/upload.controller')

const {
    isValidIdBodyAndQuery,
    isValidIdBodyAndQueryParams,
} = require('../middlewares/product.validation')
const { validate } = require('../middlewares/validation')

//[ROUTE GET ALL] //get-all?limit=&offset=
router.get('/', isValidIdBodyAndQueryParams, validate, getAllProduct)

//[ROUTE GET BY QUERY] // name, code
router.get(ROUTE.PRODUCT_QUERY, getProductByQuery)

//[ROUTE GET BY CATEGORY] // name, code, id
router.get(ROUTE.PRODUCT_QUERY_BY_CATEGORY, getProductByCategory)

//[ROUTE FILTER]
router.get(ROUTE.PRODUCT_FILTER, filterProduct)

//[ROUTE GET] /:id
router.get(ROUTE.PRODUCT_BY_ID, getProductByID)

//[ROUTE POST] /
router.post('/', createProduct)

//[ROUTE UPDATE]

router.put(ROUTE.PRODUCT_BY_ID, uploadSingleImage, updateProduct)

//[ROUTE DELETE]
router.put(ROUTE.PRODUCT_CHANGE_STATUS, deleteProduct)

module.exports = router
