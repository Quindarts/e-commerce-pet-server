const Category = require('.././models/category.model')
const helperCode = require('../helper/randomCode')
const { HTTP_STATUS } = require('../utils/constant')
const redis = require('../config/redis')
const { ROUTE } = require('../utils/Routes')
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
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to get List Category Child By Path.',
        })
    }
}
//[HELPER GET ALL CHILD BY PARENT NODE]
const getAllChildrenByParrentNode = async (parentNode) => {
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
        console.log('🚀 ~ getAllChildrenByParrentNode ~ error:', error)
    }
}

//[GET LIST CATEOGRY BY QUERY] /?query
const getCategoryByQuery = async (req, res) => {
    const { name, code, offset, limit, sortField, sortType } = Object.assign(
        {},
        req.query
    )
    var regex = {
        name: {
            $regex: name ? name : '',
            $options: 'i',
        },
        code: {
            $regex: code ? code : '',
            $options: 'i',
        },
    }
    try {
        const list_category = await Category.find(regex)
            .limit(limit)
            .skip((offset - 1) * limit)
            .sort({ [sortField]: sortType })
            .sort({ createdAt: -1 })
            .lean()

        const total = await Category.find(regex).count()

        res.status(HTTP_STATUS.OK).json({
            success: true,
            status: 200,
            message: 'Search to Category by query success.',
            total,
            list_category,
        })
    } catch (error) {
        console.log('🚀 ~ getCategoryByQuery ~ error:', error)
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to query Category.',
        })
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
        console.log('🚀 ~ getRootCategory ~ error:', error)

        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to get Root Category category.',
        })
    }
}
const getTreeCategoryInRedis = async (req, res) => {
    try {
        const data = await redis.get(`${ROUTE.CATEGORY_TREE}`)
        if (!data) {
            const tree = await getTreeCategory()
            redis.setEx(ROUTE.CATEGORY_TREE, 10000, JSON.stringify(tree))
            return res.status(HTTP_STATUS.OK).json({
                success: true,
                status: HTTP_STATUS.OK,
                message: 'Category found.',
                tree: tree,
            })
        }

        return res.status(HTTP_STATUS.OK).json({
            success: true,
            status: HTTP_STATUS.OK,
            message: 'Category found.',
            tree: JSON.parse(data),
        })
    } catch (error) {
        console.log('🚀 ~ getTreeCategoryInRedis ~ error:', error)
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Get tree category failed.',
        })
    }
}

//[GET ALL TREE CATEGORY]
const getTreeCategory = async () => {
    try {
        const nodeRoot = await Category.find({
            path: {
                $regex: /^,index,/,
            },
            isActive: true,
        })
            .sort({ path: 1 })
            .select({ name: 1 })

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

                const child = await getAllChildrenByParrentNode(
                    current_node.name
                )
                current_node.child = child

                tree.push(current_node)
            }
            return tree
        }
    } catch (error) {
        console.log('🚀 ~ getTreeCategory ~ error:', error)
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to get Tree Category category.',
        })
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

//[PUT] ACTIVE CATEGORY
const updateActiveCategory = async (req, res) => {
    const { category_id } = req.params

    try {
        const category_need = await Category.findById(category_id).lean()

        if (!category_need) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                status: HTTP_STATUS.NOT_FOUND,
                message: 'No category found.',
            })
        }

        const result = await Category.findByIdAndUpdate(
            { _id: category_id },
            {
                $set: {
                    isActive: !category_need.isActive,
                },
            },
            {
                new: true,
            }
        )
        res.status(HTTP_STATUS.CREATED).json({
            success: true,
            status: HTTP_STATUS.CREATED,
            message: 'Update Category success.',
            category: result,
        })
    } catch (error) {
        console.log('🚀 ~ updateActiveCategory ~ error:', error)
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to update active category.',
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
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to update category.',
        })
    }
}

//[DELETE]
const deleteCategory = async (req, res) => {
    try {
        const { category_id } = req.params

        const deleteCategory = await Category.findOneAndDelete({
            _id: category_id,
        })

        if (!deleteCategory) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                status: HTTP_STATUS.BAD_REQUEST,
                message: 'Delete Failed. No Category valid.',
            })
        }

        return res.status(HTTP_STATUS.OK).json({
            success: true,
            status: HTTP_STATUS.OK,
            message: 'Delete Category success.',
        })
    } catch (err) {
        console.log(
            '🚀 ~ file: Category.controller.js:187 ~ deleteCategory ~ err:',
            err
        )
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
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
    updateActiveCategory,
    getCategoryByQuery,
    getTreeCategoryInRedis,
}
