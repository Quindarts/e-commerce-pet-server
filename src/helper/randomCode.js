const crypto = require('crypto')

function generateRandomCategoryCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let code = ''
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        code += characters.charAt(randomIndex)
    }

    return code
}

function generateRandomAttriButeCode(name) {
    const formattedName = name.toLowerCase().replace(/\s/g, '')
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const maxLength = characters.length
    const hash = crypto
        .createHmac('sha256', process.env.SALT)
        .update(formattedName)
        .digest('hex')

    let code = ''

    for (let i = 0; i < 8; i++) {
        const char = hash.charAt(i)
        const charIndex = parseInt(char, 16) % maxLength
        code += characters.charAt(charIndex)
    }

    return code
}

function generateProductCode(name) {
    const formattedName = name.toLowerCase().replace(/\s/g, '')
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const maxLength = characters.length
    const hash = crypto
        .createHmac('sha256', process.env.SALT)
        .update(formattedName)
        .digest('hex')

    let code = ''

    for (let i = 0; i < 8; i++) {
        const char = hash.charAt(i)
        const charIndex = parseInt(char, 16) % maxLength
        code += characters.charAt(charIndex)
    }

    return code
}

function generateOrderCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let code = ''
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        code += characters.charAt(randomIndex)
    }
    return code
}

module.exports = {
    generateRandomCategoryCode,
    generateProductCode,
    generateRandomAttriButeCode,
    generateOrderCode,
}
