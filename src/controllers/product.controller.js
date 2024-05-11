const { generateProductCode } = require('../helper/randomCode')
const Product = require('../models/product.model')
const { HTTP_STATUS } = require('../utils/constant')
const _ = require('lodash')

const getAllProductManagerAdmin = async (req, res) => {
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
    const totalPage = await Product.find().count()
    res.status(HTTP_STATUS.OK).json({
        success: true,
        status: HTTP_STATUS.OK,
        message: 'Get list product success.',
        list: listProduct,
        params: {
            limit: limit,
            page: offset,
            totalPage: `${_.ceil(totalPage / _.toInteger(limit))}`,
        },
    })
}
//[GET LIST PRODUCT BY PARAMS ] /get-all-product?params
const getAllProduct = async (req, res) => {
    const { limit, offset } = Object.assign({}, req.query)
    var listProduct = await Product.find({ isActive: true })
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
    const totalPage = await Product.find().count()
    res.status(HTTP_STATUS.OK).json({
        success: true,
        status: HTTP_STATUS.OK,
        message: 'Get list product success.',
        list: listProduct,
        params: {
            limit: limit,
            page: offset,
            totalPage: `${_.ceil(totalPage / _.toInteger(limit))}`,
        },
    })
}
//[GET PRODUCT BY CATEGORY]
const getProductByCategory = async (req, res) => {
    const { category_id } = req.params
    try {
        const list_product = await Product.find({
            category: category_id,
            isActive: true,
        })
            .populate('category')
            .sort({ createdAt: -1 })
            .lean()
        const size = list_product.length
        return res.status(HTTP_STATUS.OK).json({
            success: true,
            status: 200,
            message: 'Search product by category query success.',
            list_product,
            total: `${size}`,
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
//[GET PRODUCTSHOP]
//url/shop/keyword&&limit=&&offset=&&minPrice=&&maxPrice&&color=&&brand=sortField=sortType
//[FILTER PRODUCT ]
const filterProduct = async (req, res) => {
    const { offset, limit, sortField, sortType } = Object.assign({}, req.query)
    const {
        category_id,
        brand,
        distancePrice,
        color,
        tags,
        keywords,
        searchType,
    } = Object.assign({}, req.query)

    var query = { isActive: true }
    if (distancePrice !== '' && distancePrice !== undefined) {
        query['price'] = {
            $gte: parseInt(distancePrice.split(',')[0]),
            $lte: parseInt(distancePrice.split(',')[1]),
        }
    }
    if (
        keywords !== '' &&
        searchType !== '' &&
        keywords !== undefined &&
        searchType !== undefined
    ) {
        query[searchType] = {
            $regex: keywords ? keywords : '',
            $options: 'i',
        }
    }
    if (category_id !== undefined && category_id !== '')
        query['category'] = category_id

    if (color !== undefined && color !== '') {
        const colorArr = color.split(',')
        query['color'] = { $in: colorArr }
    }
    if (tags !== undefined && tags !== '') {
        const tagsArr = tags.split(',')
        query['tags'] = { $in: tagsArr }
    }
    if (brand !== undefined && brand !== '') {
        const brandArr = brand.split(',')
        query['brand'] = { $in: brandArr }
    }

    try {
        const products = await Product.find(query)
            .populate('category')
            .limit(limit)
            .skip((offset - 1) * limit)
            .sort({ [sortField]: sortType })
            .sort({ createdAt: -1 })
            .lean()

        const totalPage = await Product.find(query).count()

        res.status(HTTP_STATUS.OK).json({
            success: true,
            status: HTTP_STATUS.OK,
            products,
            params: {
                limit: limit,
                page: offset,
                totalPage: `${_.ceil(totalPage / _.toInteger(limit))}`,
            },
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
        })
            .populate('category')
            .populate('attribute_product')
            .lean()
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
        attribute_product,
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
        const img = Object.assign({}, images)

        const newProduct = await Product.create({
            code: newCode,
            name: name,
            images: [
                {
                    url: img.url,
                    public_id: img.id,
                },
            ],
            price: price,
            avaiable: avaiable,
            description: description,
            tags: tags,
            brand: brand,
            dimensions: dimensions,
            category: category,
            provider: provider,
            attribute_product: attribute_product,
        })
        if (!newProduct) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                status: HTTP_STATUS.BAD_REQUEST,
                message: 'Your product is not valid',
            })
        }

        return res.status(HTTP_STATUS.CREATED).json({
            success: true,
            status: HTTP_STATUS.CREATED,
            message: 'Create new Product success.',
            newProduct: newProduct,
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

    try {
        const oldProduct = await Product.findOne({
            _id: product_id,
        })
        if (!oldProduct) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                status: HTTP_STATUS.NOT_FOUND,
                message: 'No product found, please try again. ',
            })
        }

        const img = Object.assign({}, images)

        const resultUpdate = await Product.findByIdAndUpdate(
            {
                _id: product_id,
            },
            {
                $set: {
                    name: name,
                    images: [
                        {
                            url: img.url,
                            public_id: img.id,
                        },
                    ],
                    price,
                    avaiable: avaiable,
                    description: description,
                    attribute_product: attribute_product,
                    tags: tags,
                    brand: brand,
                    dimensions: dimensions,
                    category: category,
                    provider: provider,
                    isActive: isActive,
                },
            },
            { new: true }
        )
            .populate('category')
            .populate('attribute_product')
            .lean()
        if (!resultUpdate) {
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
            product: resultUpdate,
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
    getAllProductManagerAdmin,
}
