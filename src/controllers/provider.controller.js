const Provider = require('../models/provider.model')
const { HTTP_STATUS } = require('../utils/constant')

/**
 * Create provider
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

async function createProvider(req, res) {
    const provider = await Provider.create(req.body)
    res.json(provider)
}

/**
 * Get many providers
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function getManyProviders(req, res) {
    const items = await Provider.find(null, null, {
        skip: req.query.offset,
        limit: req.query.limit,
    })

    const count = await Provider.countDocuments()

    res.json({
        success: true,
        status: HTTP_STATUS.OK,
        message: 'Get list provider success.',
        providers: items,
        totalItem: count,
    })
}

/**
 * Get provider by Id
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

async function getProviderById(req, res) {
    const { providerId } = req.params
    const provider = await Provider.findById(providerId)
    if (!provider) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
            success: false,
            status: HTTP_STATUS.NOT_FOUND,
            message: 'Provider is not existed',
        })
    }
    res.json(provider)
}

// Update provider
async function updateProvider(req, res) {
    const { providerId } = req.params
    const { name, email, phone } = req.body
    
    const provider = await Provider.findOneAndUpdate(
        { _id: providerId },
        {
            name: name,
            email: email,
            phone: phone,
        }
    )
    res.json({
        _id: providerId,
        message: 'Update provider successed',
    })
}

/**
 * Delete provider
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function deleteProviderById(req, res) {
    const { providerId } = req.params
    const deleteProvider = await Provider.deleteOne({ _id: providerId })
    if (deleteProvider.deletedCount === 0) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
            success: false,
            status: HTTP_STATUS.NOT_FOUND,
            message: 'Provider is not existed',
        })
    }
    res.json({
        message: 'Delete provider successed',
    })
}

module.exports = {
    getManyProviders,
    createProvider,
    getProviderById,
    updateProvider,
    deleteProviderById,
}
