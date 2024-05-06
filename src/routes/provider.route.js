const express = require('express')
const router = express.Router()
const {
    getManyProviders,
    createProvider,
    getProviderById,
    deleteProviderById,
    updateProviderById,
} = require('../controllers/provider.controller')

const {
    isValidGetManyQueryParams,
    isValidCreateProviderRequest,
    isValidUpdateProviderRequest,
    isValidProviderId,
} = require('../middlewares/provider.validation')
const { ROUTE } = require('../utils/Routes')

router.post('/', isValidCreateProviderRequest, createProvider)
router.get('/', isValidGetManyQueryParams, getManyProviders) // get many providers
router.get(ROUTE.PROVIDER_BY_ID, isValidProviderId, getProviderById) // provider by id
router.put(
    ROUTE.PROVIDER_BY_ID,
    isValidProviderId,
    isValidUpdateProviderRequest,
    updateProviderById
) // update one
router.delete(ROUTE.PROVIDER_BY_ID, isValidProviderId, deleteProviderById) // delete by id

module.exports = router
