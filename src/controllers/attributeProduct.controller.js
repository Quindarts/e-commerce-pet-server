const AttributeProduct = require('../models/attributeProduct.model')
const { HTTP_STATUS } = require('../utils/constant')
const helperCode = require('../helper/randomCode')

//[GET BY ID] GET ATTRIBUTE PRODUCT BY ID /:attribute_product_id
const getAttributeProductById = async (req, res) => {
    const { attribute_product_id } = req.params
    try {
        const OldAttributeProduct = await AttributeProduct.findOne({
            _id: attribute_product_id,
        }).lean()

        if (!OldAttributeProduct) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                status: HTTP_STATUS.NOT_FOUND,
                message: 'No Attribute Product found.',
            })
        }
        res.status(HTTP_STATUS.OK).json({
            success: true,
            status: HTTP_STATUS.CREATED,
            message: 'Get Attribute Product by id success.',
            OldAttributeProduct,
        })
    } catch (error) {
        console.log(
            '🚀 ~ file: AttributeProduct.controller.js:12 ~ getAttributeProductById ~ error:',
            error
        )
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to get Attribute Product by id.',
        })
    }
}

//[GET LIST ATTRIBUTE PRODUCT BY PARAMS ] /get-all-attributeProduct?params
const getAllAttributeProductByParams = async (req, res) => {
    const { limit, offset } = Object.assign({}, req.query)
    try {
        var listAttributeProduct = await AttributeProduct.find()
            .limit(limit)
            .skip((offset - 1) * limit)
            .sort({ createdAt: -1 })
            .lean()

        if (!listAttributeProduct) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                status: HTTP_STATUS.NOT_FOUND,
                message: 'No Attribute Product found.',
            })
        }
        res.status(HTTP_STATUS.OK).json({
            success: true,
            status: HTTP_STATUS.CREATED,
            message: 'Get Attribute Product success.',
            list: listAttributeProduct,
            params: {
                limit: limit,
                page: offset,
            },
        })
    } catch (error) {
        console.log('🚀 ~ getAllAttributeProduct ~ error:', error)
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to get all attribute product.',
        })
    }
}
//[POST] CREATE NEW ATTRIBUTE PRODUCT
const createAttributeProduct = async (req, res) => {
    const { name, value, avaiable } = req.body
    try {
        const oldAttriButeProduct = await AttributeProduct.findOne({
            name: name,
        }).lean()

        if (oldAttriButeProduct) {
            return res.status(HTTP_STATUS.CONFLICT).json({
                success: false,
                status: HTTP_STATUS.CONFLICT,
                message: 'This attribute product already exists. ',
            })
        }
        let newCode = helperCode.generateRandomAttriButeCode(name)

        const newAttributeProduct = await AttributeProduct.create({
            code: newCode,
            name: name,
            value: value,
            avaiable: avaiable,
        })

        if (!newAttributeProduct) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                status: HTTP_STATUS.BAD_REQUEST,
                message: 'Your attribute product is not valid',
            })
        }
        res.status(HTTP_STATUS.CREATED).json({
            success: true,
            status: HTTP_STATUS.CREATED,
            message: 'Create new Attribute Product success.',
            newAttributeProduct,
        })
    } catch (error) {
        console.log('🚀 ~ createAttributeProduct ~ error:', error)
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to create attribute product.',
        })
    }
}
//[PUT] UPDATE ATTRIBUTE PRODUCT BY ID /:attribute_product_id
const updateAttributeProduct = async (req, res) => {
    try {
        const { attribute_product_id } = req.params || req.body
        const { name, value, avaiable } = req.body

        const oldAttributeProduct = await AttributeProduct.findOne({
            _id: attribute_product_id,
        }).lean()

        if (!oldAttributeProduct) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                status: HTTP_STATUS.NOT_FOUND,
                message: 'This Attribute Product already exists. ',
            })
        }

        const updateAttributeProduct = await AttributeProduct.findByIdAndUpdate(
            {
                _id: attribute_product_id,
            },
            {
                $set: {
                    name,
                    value,
                    avaiable,
                },
            },
            { new: true }
        )
        if (!updateAttributeProduct) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                status: HTTP_STATUS.BAD_REQUEST,
                message: 'Update Attribute Product failed.',
            })
        }
        res.status(HTTP_STATUS.CREATED).json({
            success: true,
            status: HTTP_STATUS.CREATED,
            message: 'Update Attribute Product success.',
            AttributeProduct: updateAttributeProduct,
        })
    } catch (error) {
        console.log(
            '🚀 ~ file: AttributeProduct.controller.js:120 ~ updateAttributeProduct ~ error:',
            error
        )
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to update attribute product.',
        })
    }
}
//[DELETE] DELETE ATTRIBUTE PRODUCT BY ID /:attribute_product_id
const deleteAttributeProduct = async (req, res) => {
    try {
        const { attribute_product_id } = req.params

        const deleteAttributeProduct =
            await AttributeProduct.findByIdAndDelete(attribute_product_id)

        if (!deleteAttributeProduct) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                status: HTTP_STATUS.BAD_REQUEST,
                message: 'Delete Failed. No Attribute Product valid.',
            })
        }

        res.status(HTTP_STATUS.OK).json({
            success: true,
            status: HTTP_STATUS.OK,
            message: 'Delete Attribute Product success.',
        })
    } catch (err) {
        console.log(
            '🚀 ~ file: AttributeProduct.controller.js:187 ~ deleteAttributeProduct ~ err:',
            err
        )
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to delete Attribute Product.',
        })
    }
}

module.exports = {
    createAttributeProduct,
    getAttributeProductById,
    updateAttributeProduct,
    deleteAttributeProduct,
    getAllAttributeProductByParams,
}
