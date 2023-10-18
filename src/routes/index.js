const { ROUTE } = require('../utils/Routes')
const auth = require('./auth.route')

function router(app) {
    app.use(ROUTE.AUTH, auth)
    console.log("🚀 ~ file: index.js:6 ~ router ~ auth:", auth)
}

module.exports = router
    