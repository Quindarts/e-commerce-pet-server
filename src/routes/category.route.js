const express = require('express')
const { validate } = require('../middlewares/validation')
const router = express.Router()
const {
    createCategory,
    getCategoryById,
    getAllCategory,
    updateCategory,
    deleteCategory,
} = require('../controllers/category.controller')
const { ROUTE } = require('../utils/Routes')
const {
    isValidNameCategoryLength,
    isValidTotalCategory,
    isValidCategoryId,
} = require('../middlewares/category.validation')

//[ROUTE GET] /get-by-id/:id
router.get(
    ROUTE.GET_CATEGORY_BY_ID,
    isValidCategoryId,
    validate,
    getCategoryById
)

//[ROUTE GET] /get-all
router.get("/", getAllCategory)

//[ROUTE POST]
router.post(
    "/",
    isValidNameCategoryLength,
    isValidTotalCategory,
    validate,
    createCategory
)

//[ROUTE UPDATE]
router.put(
    ROUTE.GET_CATEGORY_BY_ID,
    isValidCategoryId,
    validate,
    updateCategory
)

//[ROUTE DELETE]
router.delete(
    ROUTE.GET_CATEGORY_BY_ID,
    isValidCategoryId,
    validate,
    deleteCategory
)
module.exports = router
