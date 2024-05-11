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
    getAllProductManagerAdmin,
} = require('../controllers/product.controller')
const { uploadSingleImage } = require('../controllers/upload.controller')

const {
    isValidIdBodyAndQueryParams,
} = require('../middlewares/product.validation')
const { validate } = require('../middlewares/validation')
const { ROLES } = require('../utils/constant')
const { checkCurrentRole } = require('../handler/user.handler')
const { isExpiredToken } = require('../handler/token.handler')

//[ROUTE GET ALL] //get-all?limit=&offset=
router.get('/', isValidIdBodyAndQueryParams, validate, getAllProduct)
router.get(
    ROUTE.PRODUCT_ADMIN,
    isValidIdBodyAndQueryParams,
    validate,
    isExpiredToken,
    (req, res, next) => checkCurrentRole(req, res, next, ROLES.ADMIN),
    getAllProductManagerAdmin
)
//[ROUTE POST] /
router.post(
    '/',
    isExpiredToken,
    (req, res, next) => checkCurrentRole(req, res, next, ROLES.ADMIN),
    uploadSingleImage,
    createProduct
)

//[ROUTE GET BY QUERY] // name, code
router.get(ROUTE.PRODUCT_QUERY, getProductByQuery)

//[ROUTE GET BY CATEGORY] // name, code, id
router.get(ROUTE.PRODUCT_QUERY_BY_CATEGORY, getProductByCategory)

//[ROUTE FILTER]
router.get(ROUTE.PRODUCT_FILTER, filterProduct)

//[ROUTE GET] /:id
router.get(ROUTE.PRODUCT_BY_ID, getProductByID)

//[ROUTE UPDATE]

router.put(
    ROUTE.PRODUCT_BY_ID,
    isExpiredToken,
    (req, res, next) => checkCurrentRole(req, res, next, ROLES.ADMIN),
    uploadSingleImage,
    updateProduct
)

//[ROUTE DELETE]
router.put(
    ROUTE.PRODUCT_CHANGE_STATUS,
    isExpiredToken,
    (req, res, next) => checkCurrentRole(req, res, next, ROLES.ADMIN),
    deleteProduct
)

module.exports = router
