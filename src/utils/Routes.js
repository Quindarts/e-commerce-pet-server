const ROUTE = {
    AUTH: '/auth',
    LOGIN: '/login',
    REGISTER: '/register',
    CHANGE_PASSWORD: '/change',
    FORGOT_PASSWORD: '/forgot-password',
    GENERATE_ACCESSTOKEN: '/accessToken-generate',

    //Address
    ADDRESS: '/addresses',
    GET_ADDRESS_BY_ID: '/:address_id',

    //Category
    CATEGORY: '/categorys',
    GET_CATEGORY_BY_ID: '/:category_id',
    // DELETE_CATEGORY_BY_ID: '/:category_id',

    //Product
    PRODUCT: '/products',
    PRODUCT_BY_ID: '/:product_id',
    PRODUCT_CHANGE_STATUS: '/status/:product_id',
    PRODUCT_FILTER: '/:',
    PRODUCT_QUERY: '/:',

    //User
    USER: '/users',
    USER_BY_ID: '/:user_id',
    USER_CHANGE_ACTIVE: '/change_active/:user_id',

    //Cart
    CART: '/carts',
    CART_BY_USER_ID: '/:user_id',
    CART_UPDATE_BY_USER_ID: 'update/:user_id',
}
module.exports = { ROUTE }
