const Cart = require('../models/cart.model')
const User = require('../models/user.model')
const Product = require('../models/product.model')
const { HTTP_STATUS } = require('../utils/constant')
const { ObjectId } = require('mongodb')
const { default: mongoose } = require('mongoose')

//[GET] GET ALL LIST CART
const getAllCart = async (req, res) => {
    try {
        const listCart = await Cart.find().lean()
        if (!listCart) {
            return res.status(HTTP_STATUS.CONFLICT).json({
                success: false,
                status: HTTP_STATUS.CONFLICT,
                message: 'Get all cart failed.',
            })
        }
        return res.status(HTTP_STATUS.OK).json({
            success: true,
            status: HTTP_STATUS.OK,
            message: 'Get all cart success.',
            listCart,
        })
    } catch (error) {
        console.log('🚀 ~ getAllCart ~ error:', error)

        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to get all cart.',
        })
    }
}
//[GET] BY USER ID
const getCartByUserId = async (req, res) => {
    try {
        const { user_id } = req.params
        console.log('🚀 ~ getCartByUserId ~ user_id:', user_id)
        const cart = await Cart.findOne({ _id: user_id }).lean()
        console.log('🚀 ~ getCartByUserId ~ cart:', cart)
        if (!cart) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                status: HTTP_STATUS.NOT_FOUND,
                message: 'Get cart failed.',
            })
        }
        return res.status(HTTP_STATUS.OK).json({
            success: true,
            status: HTTP_STATUS.OK,
            message: 'Get cart user success.',
            cart,
        })
    } catch (error) {
        console.log('🚀 ~ getCartByUserId ~ error:', error)
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to get cart by id',
        })
    }
}

//[POST] CREATE CART
const createCart = async (req, res) => {
    try {
        const { user_id } = req
        const cartOld = await Cart.findById({ _id: user_id }).lean()

        if (cartOld) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                status: HTTP_STATUS.NOT_FOUND,
                message: 'This cart is already exists.',
            })
        }
        const newCart = await Cart.create({
            _id: user_id,
            cart_details: [],
        })

        return res.status(HTTP_STATUS.CREATED).json({
            success: true,
            status: HTTP_STATUS.CREATED,
            message: 'Create new Cart success.',
            newCart,
        })
    } catch (error) {
        console.log('🚀 ~ createCart ~ error:', error)
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to create new cart.',
        })
    }
}
//[HELPER]
const checkProductItemCartAvaiable = async (
    quantity_product_in_cart,
    product_id
) => {
    try {
        const productItem = await Product.findById({
            _id: product_id,
        }).lean()
        var avaiable = productItem.avaiable
        return quantity_product_in_cart <= avaiable
    } catch (error) {
        console.log('🚀 ~ toggleProductCart ~ error:', error)
    }
}
//[HELPER]
const getProductNeedInCart = async (product_id) => {
    try {
        const productList = await Cart.aggregate([
            {
                $unwind: '$cart_details',
            },
            {
                $group: {
                    _id: null,
                    product_ids: { $addToSet: '$cart_details.product_id' },
                },
            },
            {
                $unwind: '$product_ids',
            },
            {
                $sort: { product_ids: 1 },
            },
        ])
        var result
        productList.forEach((pr, index) => {
            if (pr['product_ids'].toString() === product_id) result = index
        })
        return result
    } catch (error) {
        console.log('🚀 ~ getIndexByProductId ~ error:', error)
    }
}

//[PUT] UPDATE CART BY USER_ID
const updateCart = async (req, res) => {
    try {
        const { user_id } = req.params

        const { cart_details } = req.body

        const updateCart = await Cart.findOneAndUpdate(
            {
                _id: user_id,
            },
            {
                $set: { cart_details },
            },
            { new: true }
        )
        return res.status(HTTP_STATUS.CREATED).json({
            success: true,
            status: HTTP_STATUS.CREATED,
            message: 'Update Cart success.',
            cart: updateCart,
        })
    } catch (error) {
        console.log('🚀 ~ createCart ~ error:', error)
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to update cart.',
        })
    }
}
// [PUT] CLEAR CART_DETAILS TO NULL
const resetCart = async (req, res) => {
    const { user_id } = req
    try {
        const cart = await Cart.findByIdAndUpdate(
            { _id: user_id },
            { $set: { cart_details: [] } },
            { new: true }
        )
        res.status(HTTP_STATUS.CREATED).json({
            success: true,
            status: HTTP_STATUS.CREATED,
            message: 'Reset Cart success.',
            cart,
        })
    } catch (error) {
        console.log('🚀 ~ deleteCart ~ error:', error)
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to reset cart.',
        })
    }
}
//[DELETE] DELETE PRODUCT IN CART
const deleteProductInCartByProductId = async (req, res) => {
    const { user_id, product_id } = req.params
    try {
        const cart = await Cart.findOne({
            _id: user_id,
            'cart_details.product_id': product_id,
        })
        if (!cart) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                status: HTTP_STATUS.NOT_FOUND,
                message: 'No cart user found.',
            })
        }
        const resultDelete = await Cart.findOneAndUpdate(
            {
                _id: user_id,
                'cart_details.product_id': product_id,
            },
            { $pull: { cart_details: { product_id: product_id } } },
            { new: true }
        )
        res.status(HTTP_STATUS.CREATED).json({
            success: true,
            status: HTTP_STATUS.CREATED,
            message: 'Delete Cart by Product id success.',
            cart: resultDelete,
        })
    } catch (error) {
        console.log('🚀 ~ updateCartByProductID ~ error:', error)
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to delete product in cart.',
        })
    }
}
//[PUT] UPDATE CART BY PRODUCT ID
const updateCartByProductID = async (req, res) => {
    const { user_id, product_id } = req.params
    const { quantity } = req.body
    try {
        const cart = await Cart.findOne({
            _id: user_id,
            'cart_details.product_id': product_id,
        })
        if (!cart) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                status: HTTP_STATUS.NOT_FOUND,
                message: 'No cart user found.',
            })
        }
        const checkedAvaiable = await checkProductItemCartAvaiable(
            quantity,
            product_id
        )
        if (!checkedAvaiable) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                status: HTTP_STATUS.NOT_FOUND,
                message: 'Product not avaiable',
            })
        }

        var productUpdate = await getProductNeedInCart(product_id)
        console.log(
            '🚀 ~ updateCartByProductID ~ productUpdate:',
            productUpdate
        )

        var setValue = `cart_details.${productUpdate}.quantity`
        var kv = {}
        kv[setValue] = quantity

        const resultUpdate = await Cart.findOneAndUpdate(
            {
                _id: user_id,
                'cart_details.product_id': product_id,
            },
            { $set: kv },
            { new: true }
        )
        return res.status(HTTP_STATUS.CREATED).json({
            success: true,
            status: HTTP_STATUS.CREATED,
            message: 'Update Cart by Product id success.',
            cart: resultUpdate,
        })
    } catch (error) {
        console.log('🚀 ~ updateCartByProductID ~ error:', error)
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to update cart.',
        })
    }
}
module.exports = {
    getAllCart,
    getCartByUserId,
    createCart,
    updateCart,
    resetCart,
    updateCartByProductID,
    deleteProductInCartByProductId,
}
