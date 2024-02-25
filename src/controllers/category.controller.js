const Category = require('.././models/category.model')
const helperCode = require('../helper/randomCode')
const { HTTP_STATUS } = require('../utils/constant')

//[GET CATEGORY BY ID] /:category_id
const getCategoryById = async (req, res) => {
    const { category_id } = req.params

    try {
        const category = await Category.findOne({ _id: category_id }).lean()

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

//[GET LIST CATEGORY CHILD BY CATEGORY PATH ]
const getListCategoryChildByPath = async (req, res) => {
    const { path } = req.params

    var regex = {
        path: {
            $regex: path ? ',' + path + ',' : '',
        },
        isActive: true,
    }
    try {
        const listCategory = await Category.find(regex).sort({ path: 1 })
        res.status(HTTP_STATUS.OK).json({
            success: true,
            status: HTTP_STATUS.OK,
            message: 'Get Category  success.',
            listCategory,
        })
    } catch (error) {
        console.log('🚀 ~ getListCategoryChildByPath ~ error:', error)
    }
}

const getAllChildernNodeByParentNode = async (parentNode) => {
    try {
        var regex = {
            path: {
                $regex: parentNode ? ',' + parentNode + ',' : '',
            },
            isActive: true,
        }
        const child = await Category.find(regex)
            .sort({ path: 1 })
            .select({ name: 1, path: 1 })

        return child
    } catch (error) {
        console.log('🚀 ~ getAllChildernNodeByParentNode ~ error:', error)
    }
}

//[GET ROOT CATEGORY ]
const getRootCategory = async (req, res) => {
    try {
        const listCategory = await Category.find({
            path: {
                $regex: /^,index,/,
            },
        }).sort({ path: 1 })

        res.status(HTTP_STATUS.OK).json({
            success: true,
            status: HTTP_STATUS.OK,
            message: 'Get Category success.',
            listCategory,
        })
        if (!listCategory) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                status: HTTP_STATUS.NOT_FOUND,
                message: 'No list Category found.',
            })
        }
    } catch (error) {
        console.log('🚀 ~ getTreeCategory ~ error:', error)
    }
}
//[GET ALL TREE CATEGORY]
const getTreeCategory = async (req, res) => {
    try {
        var tree = []
        const nodeRoot = await Category.find({
            path: {
                $regex: /^,index,/,
            },
        })
            .sort({ path: 1 })
            .select({ name: 1})
        if (!nodeRoot) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                status: HTTP_STATUS.NOT_FOUND,
                message: 'No list Category found.',
            })
        } else {
            let tree = []
            for (node in nodeRoot) {
                let current_node = {
                    _id: nodeRoot[node]._id,
                    name: nodeRoot[node].name,
                    child: [],
                }

                const child = await getAllChildernNodeByParentNode(
                    current_node.name
                )
                current_node.child = child

                tree.push(current_node)
            }
            return res.status(HTTP_STATUS.OK).json({
                success: false,
                status: HTTP_STATUS.OK,
                message: 'Category found.',
                tree,
            })
        }
    } catch (error) {
        console.log('🚀 ~ getTreeCategory ~ error:', error)
    }
}
//[GET ALL CATEGORY]
const getAllCategory = async (req, res) => {
    try {
        const { limit, offset } = Object.assign({}, req.query)
        const listCategory = await Category.find()
            .limit(limit)
            .skip((offset - 1) * limit)
            .sort({ path: 1 })
            .lean()

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
            params: {
                limit: limit,
                page: offset,
            },
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
        const { name, total, description, path, url, isActive } = req.body

        const oldCategory = await Category.findOne({ name: name }).lean()

        if (oldCategory) {
            return res.status(HTTP_STATUS.CONFLICT).json({
                success: false,
                status: HTTP_STATUS.CONFLICT,
                message: 'This category already exists. ',
            })
        }
        let newCode = helperCode.generateRandomCategoryCode(6)

        const newCategory = await Category.create({
            code: newCode,
            name: name,
            total: total,
            description: description,
            path: path,
            url: url,
            isActive: isActive,
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
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to create category.',
        })
    }
}
//[PUT]
const updateCategory = async (req, res) => {
    try {
        const { category_id } = req.params || req.body

        const { name, total, description, path, url, isActive } = req.body
        const oldCategory = await Category.findOne({
            _id: category_id,
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
                _id: category_id,
            },
            {
                $set: {
                    name,
                    total,
                    description,
                    path,
                    url,
                    isActive,
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
        const { category_id } = req.params

        const unActiveCategory = await Category.findByIdAndUpdate(
            {
                _id: category_id,
            },
            {
                $set: {
                    isActive: false,
                },
            },
            { new: true }
        )

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
            category: unActiveCategory,
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
    getListCategoryChildByPath,
    getRootCategory,
    getTreeCategory,
}
