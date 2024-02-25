const express = require('express')
const { validate } = require('../middlewares/validation')
const router = express.Router()
const {
    createCategory,
    getCategoryById,
    getAllCategory,
    updateCategory,
    deleteCategory,
    getListCategoryChildByPath,
} = require('../controllers/category.controller')
const { ROUTE } = require('../utils/Routes')
const {
    isValidNameCategoryLength,
    isValidTotalCategory,
    isValidCategoryId,
} = require('../middlewares/category.validation')

//[ROUTE GET] /get-by-id/:id
router.get(ROUTE.CATEGORY_BY_ID, isValidCategoryId, validate, getCategoryById)

//[ROUTE GET] /get-all
router.get('/', getAllCategory)

//[ROUTE GET] /get-list-child-by-path
router.get(ROUTE.CATEGORY_CHILD_BY_PATH_PARENT, getListCategoryChildByPath)

//[ROUTE POST]
router.post(
    '/',
    isValidNameCategoryLength,
    isValidTotalCategory,
    validate,
    createCategory
)

//[ROUTE UPDATE]
router.put(
    ROUTE.CATEGORY_BY_ID,
    isValidCategoryId,
    validate,
    updateCategory
)

//[ROUTE DELETE]
router.delete(
    ROUTE.CATEGORY_BY_ID,
    isValidCategoryId,
    validate,
    deleteCategory
)
module.exports = router
