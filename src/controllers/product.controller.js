const { generateProductCode } = require('../helper/randomCode')
const Product = require('../models/product.model')
const { HTTP_STATUS } = require('../utils/constant')

//[GET LIST PRODUCT BY PARAMS ] /get-all-product?params

const getAllProduct = async (req, res) => {
    const { limit, offset } = Object.assign({}, req.query)
    var listProduct = await Product.find()
        .populate('category')
        .limit(limit)
        .skip((offset - 1) * limit)
        .sort({ createdAt: -1 })
        .lean() 

    if (!listProduct) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
            success: false,
            status: HTTP_STATUS.NOT_FOUND,
            message: 'No Product found.',
        })
    }
    res.status(HTTP_STATUS.OK).json({
        success: true,
        status: HTTP_STATUS.CREATED,
        message: 'Get product success.',
        list: listProduct,
        params: {
            limit: limit,
            page: offset,
        },
    })
}

//[GET PRODUCT BY ID] /get-product-by-id:id
const getProductByID = async (req, res) => {
    const { product_id } = req.params
    try {
        const product = await Product.findOne({
            _id: product_id,
        }).lean()

        if (!product) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                status: HTTP_STATUS.NOT_FOUND,
                message: 'No Product found.',
            })
        }
        res.status(HTTP_STATUS.OK).json({
            success: true,
            status: HTTP_STATUS.OK,
            message: 'Get product success.',
            product,
        })
    } catch (error) {
        console.log(
            '🚀 ~ file: product.controller.js:10 ~ getProductById ~ error:',
            error
        )
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to get product.',
        })
    }
}
//[POST CREATE PRODUCT]
const createProduct = async (req, res) => {
    const {
        name,
        images,
        price,
        avaiable,
        description,
        tags,
        brand,
        dimensions,
        category,
        provider,
    } = req.body
    try {
        const newCode = generateProductCode(name)

        const checkCode = await Product.findOne({ code: newCode }).lean()

        if (checkCode) {
            return res.status(HTTP_STATUS.CONFLICT).json({
                success: false,
                status: HTTP_STATUS.CONFLICT,
                message: 'This product already exists. ',
            })
        }

        const newProduct = await Product.create({
            code: newCode,
            name,
            images,
            price,
            avaiable,
            description,
            tags,
            brand,
            dimensions,
            category,
            provider,
        })
        if (!newProduct) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                status: HTTP_STATUS.BAD_REQUEST,
                message: 'Your product is not valid',
            })
        }
        res.status(HTTP_STATUS.CREATED).json({
            success: true,
            status: HTTP_STATUS.CREATED,
            message: 'Create new Product success.',
            newProduct,
        })
    } catch (error) {
        console.log(
            '🚀 ~ file: product.controller.js:28 ~ createProduct ~ error:',
            error
        )
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to create new product.',
        })
    }
}

//[PUT UPDATE PRODUCT] :id/update
const updateProduct = async (req, res) => {
    const { product_id } = req.params
    console.log(
        '🚀 ~ file: product.controller.js:137 ~ updateProduct ~ product_id:',
        product_id
    )
    try {
        const {
            name,
            images,
            price,
            avaiable,
            description,
            tags,
            brand,
            dimensions,
            category,
            provider,
            isActive,
        } = req.body

        const oldProduct = await Product.findOne({
            _id: product_id,
        })
        if (!oldProduct) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                status: HTTP_STATUS.NOT_FOUND,
                message: 'This Product already exists. ',
            })
        }

        const updateProduct = await Product.findByIdAndUpdate(
            {
                _id: product_id,
            },
            {
                $set: {
                    name,
                    images,
                    price,
                    avaiable,
                    description,
                    tags,
                    brand,
                    dimensions,
                    category,
                    provider,
                    isActive,
                },
            },
            { new: true }
        )
        if (!updateProduct) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                status: HTTP_STATUS.BAD_REQUEST,
                message: 'Update Product failed.',
            })
        }
        res.status(HTTP_STATUS.CREATED).json({
            success: true,
            status: HTTP_STATUS.CREATED,
            message: 'Update Product success.',
            product: updateProduct,
        })
    } catch (error) {
        console.log(
            '🚀 ~ file: Product.controller.js:120 ~ updateProduct ~ error:',
            error
        )
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to update product.',
        })
    }
}

//[PUT DELETE PRODUCT] :id/delete
const deleteProduct = async (req, res) => {
    const { product_id } = req.params
    try {
        const oldProduct = await Product.findOne({
            _id: product_id,
        })
        if (!oldProduct) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                status: HTTP_STATUS.NOT_FOUND,
                message: 'This Product already exists. ',
            })
        }
        const updateProduct = await Product.findByIdAndUpdate(
            {
                _id: product_id,
            },
            {
                $set: {
                    isActive: false,
                },
            },
            { new: true }
        )
        if (!updateProduct) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                status: HTTP_STATUS.BAD_REQUEST,
                message: 'Delete Product failed.',
            })
        }
        res.status(HTTP_STATUS.CREATED).json({
            success: true,
            status: HTTP_STATUS.CREATED,
            message: 'Delete Product success.',
            product: updateProduct,
        })
    } catch (error) {
        console.log(
            '🚀 ~ file: product.controller.js:208 ~ deleteProduct ~ error:',
            error
        )
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to delete product.',
        })
    }
}

module.exports = {
    createProduct,
    getProductByID,
    getAllProduct,
    updateProduct,
    deleteProduct,
}
