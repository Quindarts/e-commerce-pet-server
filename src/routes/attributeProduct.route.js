const express = require('express')
const { validate } = require('../middlewares/validation')
const router = express.Router()

const { ROUTE } = require('../utils/Routes')
const {
    getAllAttributeProductByParams,
    getAttributeProductById,
    createAttributeProduct,
    updateAttributeProduct,
    deleteAttributeProduct,
} = require('../controllers/attributeProduct.controller')

//[ROUTE GET] get-by-id
router.get(ROUTE.ATTRIBUTE_PRODUCT_BY_ID, validate, getAttributeProductById)

//[ROUTE GET] /get-all
router.get('/', getAllAttributeProductByParams)

//[ROUTE POST]
router.post('/', validate, createAttributeProduct)

//[ROUTE UPDATE]
router.put(ROUTE.ATTRIBUTE_PRODUCT_BY_ID, validate, updateAttributeProduct)

//[ROUTE DELETE]
router.delete(ROUTE.ATTRIBUTE_PRODUCT_BY_ID, validate, deleteAttributeProduct)

module.exports = router
