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
    CATEGORY_BY_ID: '/:category_id',
    DELETE_CATEGORY_BY_ID: '/:category_id',
    CATEGORY_CHILD_BY_PATH_PARENT: '/children/:path',
    CATEGORY_ROOT: '/root_category',
    CATEGORY_TREE: '/tree_category',
    CHANGE_ACTIVE_CATEGORY_BY_ID: '/:category_id/active',
    CATEGORY_QUERY: '/search',

    //Product
    PRODUCT: '/products',
    PRODUCT_BY_ID: '/:product_id',
    PRODUCT_CHANGE_STATUS: '/status/:product_id',
    PRODUCT_FILTER: '/filter',
    PRODUCT_QUERY: '/search',
    PRODUCT_QUERY_BY_CATEGORY: '/category/:category_id',

    //AttributeProduct
    ATTRIBUTE_PRODUCT: '/attributeProducts',
    ATTRIBUTE_PRODUCT_BY_ID: '/:attribute_product_id',
    ATTRIBUTE_PRODUCT_FILTER: '/:',
    ATTRIBUTE_PRODUCT_QUERY: '/:',

    //User
    USER: '/users',
    USER_BY_ID: '/:user_id',
    USER_CHANGE_ACTIVE: '/change_active/:user_id',

    //Cart
    CART: '/carts',
    CART_BY_USER_ID: '/:user_id',
    CART_UPDATE_BY_USER_ID: '/:user_id/update',
    CART_UPDATE_BY_PRODUCT_ID: '/:user_id/change/:product_id',
    // CART_UPDATE_BY_PRODUCT_ID: '/:user_id/product/:product_id',

    //Order
    ORDER: '/orders',
    ORDER_BY_ID: '/:order_id',
    ORDER_BY_PARAMS: '/params',
    ORDER_BY_USER_ID: '/user/:user_id',
    ORDER_BY_ID_CREATE_PAYMENT_ONLINE: '/:order_id/payment_online',
}
module.exports = { ROUTE }
