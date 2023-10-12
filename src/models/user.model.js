const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minLength: 8,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    name: {
        type: String,
        index: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    address: ['adressSchema'],
    rewardPoints: {
        type: number,
        default: 0,
    },
    gender: {
        type: String,
        enum: ['female', 'male'],
        required: true,
    },
    avatar: {
        url: {
            type: String,
            required: true,
        },
        public_id: {
            type: String,
        },
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'owner', 'user', 'warehouse', 'mod'],
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    },
    idFacebook: {
        type: String,
        unique: true,
    },
    idGoogle: {
        type: String,
        unique: true,
    },
    dateOfBirth: {
        type: mongoose.Schema.Types.Date,
        required: true,
    },
})
