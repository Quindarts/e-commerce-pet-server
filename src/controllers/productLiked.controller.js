const { update } = require('lodash')
const ProductLiked = require('../models/productLiked.model')
const User = require('../models/user.model')

const { HTTP_STATUS } = require('../utils/constant')
const { ObjectId } = require('mongodb')

const getAllProductLiked = async (req, res) => {
    try {
        const productLiked = await ProductLiked.find({})
            .populate('products')
            .lean()

        return res.status(HTTP_STATUS.OK).json({
            succesS: true,
            status: HTTP_STATUS.OK,
            message: 'Get list liked product of all user success',
            products: productLiked,
        })
    } catch (error) {
        console.log('🚀 ~ getAllProductLiked ~ error:', error)
    }
}
const getProductLikedById = async (req, res) => {
    const { user_id } = req.params
    try {
        const productLiked = await ProductLiked.findOne({
            user_id: user_id,
        })
            .populate('products')
            .lean()

        const total = productLiked.products.length

        if (!productLiked) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                status: HTTP_STATUS.NOT_FOUND,
                message:
                    'Get list product liked not found.No list product provided',
            })
        }
        return res.status(HTTP_STATUS.OK).json({
            success: true,
            status: HTTP_STATUS.OK,
            message: 'Get list product liked by user success.',
            total,
            productLiked,
        })
    } catch (error) {
        console.log('🚀 ~ getProductLikedById ~ error:', error)
    }
}
const deleteProductLikedByUserIdByProductId = async (req, res) => {
    const { user_id } = req.params
    const { product_id } = req.body
    try {
        const productLiked = await ProductLiked.findOne({ user_id: user_id })
        if (!productLiked) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                status: HTTP_STATUS.NOT_FOUND,
                message:
                    'List product liked not found.No list product provided',
            })
        }
        if (!productLiked.products.includes(product_id)) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                status: HTTP_STATUS.NOT_FOUND,
                message: 'No product found',
            })
        }
        const productDeleted = productLiked.products.filter(
            (pr_id) => pr_id.toString() !== product_id
        )
        const deleteProductLiked = await ProductLiked.findOneAndUpdate(
            {
                user_id: user_id,
            },
            {
                $set: { products: productDeleted },
            },
            {
                new: true,
            }
        )
            .populate('products')
            .lean()
        return res.status(HTTP_STATUS.CREATED).json({
            success: true,
            status: HTTP_STATUS.CREATED,
            message: 'Delete product success',
            products: deleteProductLiked,
        })
    } catch (error) {
        console.log('🚀 ~ deleteProductLikedById ~ error:', error)
    }
}
const createProductLikedByUserId = async (req, res) => {
    const { user_id } = req.params
    const { product_id } = req.body
    try {
        const user = await User.findById(user_id).lean()

        if (!user) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                status: HTTP_STATUS.NOT_FOUND,
                message: 'No user found',
            })
        }
        const exitsUser = await ProductLiked.findOne({ user_id: user_id })

        if (exitsUser) {
            return res.status(HTTP_STATUS.CONFLICT).json({
                success: false,
                status: HTTP_STATUS.CONFLICT,
                message: 'User already exist',
            })
        }

        const productLiked = await ProductLiked.create({
            user_id: user_id,
            products: [product_id],
        })
        return res.status(HTTP_STATUS.CREATED).json({
            success: true,
            status: HTTP_STATUS.CREATED,
            message: 'create new product liked user success',
            productLiked: productLiked,
        })
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'create new product liked user failed',
        })
    }
}
const updateProductLikedByUserIdAndProductId = async (req, res) => {
    const { user_id } = req.params
    const { product_id } = req.body
    try {
        const productLiked = await ProductLiked.findOne({
            user_id: user_id,
        }).lean()

        if (!productLiked) {
            productLiked = new ProductLiked({ user_id: user_id, products: [] })
        }
        var flag = false

        productLiked.products.map((product) => {
            if (product.toString() === product_id) flag = true
        })
        if (flag) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                status: HTTP_STATUS.NOT_FOUND,
                message: 'Product is already exist',
            })
        }
        const newList = await ProductLiked.findOneAndUpdate(
            {
                user_id: user_id,
            },
            {
                $push: {
                    products: [product_id],
                },
            },
            {
                new: true,
            }
        ).lean()

        return res.status(HTTP_STATUS.CREATED).json({
            success: true,
            status: HTTP_STATUS.CREATED,
            message: 'Add product to wishlist success',
            products: newList,
        })
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: true,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Add product failed',
        })
    }
}

module.exports = {
    getAllProductLiked,
    getProductLikedById,
    deleteProductLikedByUserIdByProductId,
    updateProductLikedByUserIdAndProductId,
    createProductLikedByUserId,
}
