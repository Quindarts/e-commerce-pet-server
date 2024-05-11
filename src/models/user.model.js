const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    phone: {
        type: String,
        required: false,
        default: '',
    },
    address: {
        type: ['adressSchema'],
        default: null,
    },
    rewardPoints: {
        type: Number,
        default: 0,
    },
    gender: {
        type: String,
        enum: ['female', 'male', 'other', 'unknown'],
        default: 'unknown',
    },
    avatar: {
        url: {
            type: String,
            default: '',
        },
        public_id: {
            type: String,
            default: '',
        },
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'owner', 'user', 'warehouse', 'mod'],
        default: 'user',
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    },
    idFacebook: {
        type: String,
    },
    idGoogle: {
        type: String,
    },
    dateOfBirth: {
        type: mongoose.Schema.Types.Date,
        default: null,
    },
})
module.exports = mongoose.model('User', userSchema)
