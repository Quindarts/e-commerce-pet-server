const { Schema } = require('mongoose')

const attributeProduct = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
    avaiable: {
        type: Number,
        required: true,
    },
})


module.exports = mongoose.model('AttributeProduct', attributeProduct)
