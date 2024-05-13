const { name } = require('ejs')
const Provider = require('../models/provider.model')
const { HTTP_STATUS } = require('../utils/constant')

/**
 * Create provider
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

async function createProvider(req, res) {
    const newProvider = await Provider.create(req.body)
    return res.status(HTTP_STATUS.CREATED).json({
        success: true,
        status: HTTP_STATUS.CREATED,
        message: 'Create new Provider success.',
        provider: newProvider,
    })
}

/**
 * Get many providers
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function getManyProviders(req, res) {
    const limit = req.query.limit
    const offset = req.query.offset
    const listProvider = await Provider.find(null, null, {
        limit: limit,
        skip: (offset - 1) * limit,
    }).lean()

    res.status(HTTP_STATUS.OK).json({
        success: true,
        status: HTTP_STATUS.OK,
        message: 'Get all list providers success.',
        list: listProvider,
        params: {
            limit: limit,
            page: offset,
            totalProvider: await Provider.countDocuments(),
        },
    })
}

/**
 * Get provider by Id
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

function catchError(notification, error, message) {
    console.log(notification, error)
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: message,
    })
}

async function getProviderById(req, res) {
    try {
        const { providerId } = req.params
        const provider = await Provider.findById(providerId).lean()

        res.status(HTTP_STATUS.OK).json({
            success: true,
            status: HTTP_STATUS.OK,
            message: 'Get provider success.',
            provider: provider,
        })
    } catch (error) {
        catchError(
            '🚀 ~ getProviderById ~ error:',
            error,
            'Failed to query provider'
        )
    }
}

// Update provider
async function updateProviderById(req, res) {
    try {
        const { providerId } = req.params
        const { name, email, phone } = req.body
        const updateProvider = await Provider.findOneAndUpdate(
            { _id: providerId },
            {
                name: name,
                email: email,
                phone: phone,
            }
        ).lean()
        res.status(HTTP_STATUS.CREATED).json({
            success: true,
            status: HTTP_STATUS.CREATED,
            message: 'Update Provider success.',
        })
    } catch (error) {
        catchError(
            '🚀 ~ updateProviderById ~ error:',
            error,
            'Failed to update provider'
        )
    }
}

/**
 * Delete provider
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function deleteProviderById(req, res) {
    try {
        const { providerId } = req.params
        await Provider.deleteOne({ _id: providerId })
        res.status(HTTP_STATUS.CREATED).json({
            success: true,
            status: HTTP_STATUS.CREATED,
            message: 'Delete prodvider success.',
        })
    } catch (error) {
        catchError(
            '🚀 ~ deleteProviderById ~ error:',
            error,
            'Failed to delete provider'
        )
    }
}

module.exports = {
    getManyProviders,
    createProvider,
    getProviderById,
    updateProviderById,
    deleteProviderById,
}
