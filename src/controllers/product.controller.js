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
            message: 'Get all list product not found.',
        })
    }
    res.status(HTTP_STATUS.OK).json({
        success: true,
        status: HTTP_STATUS.OK,
        message: 'Get list product success.',
        list: listProduct,
        params: {
            limit: limit,
            page: offset,
        },
    })
}
//[GET PRODUCT BY CATEGORY]
const getProductByCategory = async (req, res) => {
    const { category_id } = req.params
    try {
        const list_product = await Product.find({ category: category_id })
            .populate('category')
            .sort({ createdAt: -1 })
            .lean()
        return res.status(HTTP_STATUS.OK).json({
            success: true,
            status: 200,
            message: 'Search product by category query success.',
            list_product,
        })
    } catch (error) {
        console.log('🚀 ~ getProductByCategory ~ error:', error)
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to query product.',
        })
    }
}

//[GET PRODUCT BY SEARCH] /?query
const getProductByQuery = async (req, res) => {
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
        const list_product = await Product.find(regex)
            .populate('category')
            .limit(limit)
            .skip((offset - 1) * limit)
            .sort({ [sortField]: sortType })
            .sort({ createdAt: -1 })
            .lean()

        const total = await Product.find(regex).count()

        res.status(HTTP_STATUS.OK).json({
            success: true,
            status: 200,
            message: 'Search to product by query success.',
            total,
            list_product,
        })
    } catch (error) {
        console.log('🚀 ~ getProductByQuery ~ error:', error)
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to query product.',
        })
    }
}

//[FILTER PRODUCT ]
const filterProduct = async (req, res) => {
    const { offset, limit, sortField, sortType } = Object.assign({}, req.query)

    const { category_id, brand, discount, rating } = Object.assign(
        {},
        req.query
    )
    var query = {}

    if (category_id !== undefined) query['category'] = categoryId
    if (brand !== undefined) {
        const brandArr = brand.split(',')
        query['brand'] = { $in: brandArr }
    }
    if (discount !== undefined) query['discount'] = { $lt: discount }
    if (rating !== undefined) query['avg_review'] = { $lt: rating }

    try {
        const products = await Product.find(query)
            .populate('category')

            .limit(limit)
            .skip((offset - 1) * limit)
            .sort({ [sortField]: sortType })
            .sort({ createdAt: -1 })
            .lean()

        const totalRows = await Product.find(query).count()

        res.status(HTTP_STATUS.OK).json({
            success: true,
            status: HTTP_STATUS.OK,
            totalRows,
            products,
        })
    } catch (error) {
        console.log('🚀 ~ filterProduct ~ error:', error)

        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to filter product.',
        })
    }
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
        attribute_product,
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
            attribute_product,
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
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
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
            attribute_product,
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
                    attribute_product,
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
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
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
        return res.status(HTTP_STATUS.CREATED).json({
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
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
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
    filterProduct,
    getProductByQuery,
    getProductByCategory,
}
