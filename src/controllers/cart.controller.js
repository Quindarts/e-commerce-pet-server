const Cart = require('../models/cart.model')
const User = require('../models/user.model')
const { HTTP_STATUS } = require('../utils/constant')

const getAllCart = async (req, res) => {
    try {
        const listCart = await Cart.find().lean()

        res.status(HTTP_STATUS.OK).json({
            success: true,
            status: HTTP_STATUS.OK,
            message: 'Get all cart success.',
            listCart,
        })
    } catch (error) {
        console.log('🚀 ~ getAllCart ~ error:', error)

        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to get all cart.',
        })
    }
}
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
const getCartByUserId = async (req, res) => {
    try {
        const { user_id } = req

        const cart = await Cart.findOne({ _id: user_id }).lean()

        res.status(HTTP_STATUS.OK).json({
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
const updateCart = async (req, res) => {
    try {
        const user_id = req.user_id
        const { cart_details } = req.body

        const updateCart = await Cart.findByIdAndUpdate(
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
            message: 'Create new Cart success.',
            updateCart,
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
module.exports = {
    getAllCart,
    getCartByUserId,
    createCart,
    updateCart,
    resetCart,
}
