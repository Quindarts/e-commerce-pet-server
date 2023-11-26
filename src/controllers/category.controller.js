const Category = require('.././models/category.model')
const helperCode = require('../helper/randomCode')
const { HTTP_STATUS } = require('../utils/constant')

//[GET CATEGORY BY ID] /:categoryId
const getCategoryById = async (req, res) => {
    const categoryId = req.body.id || req.params.id
    try {
        const category = await Category.findOne({ _id: categoryId }).lean()

        if (!category) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                status: HTTP_STATUS.NOT_FOUND,
                message: 'No Category found.',
            })
        }
        res.status(HTTP_STATUS.OK).json({
            success: true,
            status: HTTP_STATUS.CREATED,
            message: 'Get Category by id success.',
            category,
        })
    } catch (error) {
        console.log(
            '🚀 ~ file: category.controller.js:12 ~ getCategoryById ~ error:',
            error
        )
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to get Category by id.',
        })
    }
}

//[GET ALL CATEGORY]
const getAllCategory = async (req, res) => {
    try {
        const listCategory = await Category.find().lean()

        if (!listCategory) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                status: HTTP_STATUS.NOT_FOUND,
                message: 'List Category not found.',
            })
        }
        res.status(HTTP_STATUS.OK).json({
            success: true,
            status: HTTP_STATUS.OK,
            message: 'Get list Category success.',
            listCategory,
        })
    } catch (error) {
        console.log(
            '🚀 ~ file: category.controller.js:10 ~ getAllCategory ~ error:',
            error
        )
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to get category.',
        })
    }
}

//[POST]
const createCategory = async (req, res) => {
    try {
        const { name, total, description } = req.body
        const oldCategory = await Category.findOne({ name: name }).lean()

        if (oldCategory) {
            return res.status(HTTP_STATUS.CONFLICT).json({
                success: false,
                status: HTTP_STATUS.CONFLICT,
                message: 'This category already exists. ',
            })
        }
        let newCode = helperCode.generateRandomCategoryCode(6)
        console.log(
            '🚀 ~ file: category.controller.js:82 ~ createCategory ~ newCode:',
            newCode
        )
        const newCategory = await Category.create({
            code: newCode,
            name: name,
            total: total,
            description: description,
        })

        if (!newCategory) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                status: HTTP_STATUS.BAD_REQUEST,
                message: 'Your category is not valid',
            })
        }

        res.status(HTTP_STATUS.CREATED).json({
            success: true,
            status: HTTP_STATUS.CREATED,
            message: 'Create category success.',
            category: newCategory,
        })
    } catch (error) {
        console.log(
            '🚀 ~ file: category.controller.js:36 ~ createCategory ~ error:',
            error
        )
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to create category.',
        })
    }
}
//[PUT]
const updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id || req.body.id

        const { name, total, description } = req.body

        const oldCategory = await Category.findOne({
            _id: categoryId,
        })
        if (!oldCategory) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                status: HTTP_STATUS.NOT_FOUND,
                message: 'This category already exists. ',
            })
        }

        const updateCategory = await Category.findByIdAndUpdate(
            {
                _id: categoryId,
            },
            {
                $set: {
                    name,
                    total,
                    description,
                },
            },
            { new: true }
        )
        if (!updateCategory) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                status: HTTP_STATUS.BAD_REQUEST,
                message: 'Update Category failed.',
            })
        }
        res.status(HTTP_STATUS.CREATED).json({
            success: true,
            status: HTTP_STATUS.CREATED,
            message: 'Update Category success.',
            category: updateCategory,
        })
    } catch (error) {
        console.log(
            '🚀 ~ file: category.controller.js:120 ~ updateCategory ~ error:',
            error
        )
    }
}

//[DELETE]
const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.body.id

        const deleteCategory = await Category.findByIdAndDelete(categoryId)

        if (!deleteCategory) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                status: HTTP_STATUS.BAD_REQUEST,
                message: 'Delete Failed. No Category valid.',
            })
        }

        res.status(HTTP_STATUS.OK).json({
            success: true,
            status: HTTP_STATUS.OK,
            message: 'Delete Category success.',
        })
    } catch (err) {
        console.log(
            '🚀 ~ file: Category.controller.js:187 ~ deleteCategory ~ err:',
            err
        )
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to delete Category.',
        })
    }
}

module.exports = {
    createCategory,
    getAllCategory,
    getCategoryById,
    deleteCategory,
    updateCategory,
}
