const ROUTE = {
    AUTH: '/auth',
    LOGIN: '/login',
    REGISTER: '/register',
    CHANGE_PASSWORD: '/change',
    FORGOT_PASSWORD: '/forgot-password',
    GENERATE_ACCESSTOKEN: '/accessToken-generate',

    //Address
    ADDRESS: '/address',
    CREATE_ADDRESS: '/create',
    GET_ALL_ADDRESS: '/get-all',
    GET_ADDRESS_BY_ID: '/get-by-id/:id',
    UPDATE_ADDRESS_BY_ID: '/:id/update',
    DELETE_ADDRESS_BY_ID: '/delete',

    //Category
    CATEGORY: '/category',
    CREATE_CATEGORY: '/create',
    GET_ALL_CATEGORY: '/get-all',
    GET_CATEGORY_BY_ID: '/get-by-id/:id',
    UPDATE_CATEGORY_BY_ID: '/:id/update',
    DELETE_CATEGORY_BY_ID: '/delete',

    //User
    USER: '/user',
    CREATE_USER: '/create',
    GET_ALL_USER: '/get-all',
    GET_USER_BY_ID: '/get-by-id/:id',
    UPDATE_USER_BY_ID: '/:id/update',
    DELETE_USER_BY_ID: '/delete',
}
module.exports = { ROUTE }
