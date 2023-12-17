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

function generateProductCode(name) {
    const formattedName = name.toLowerCase().replace(/\s/g, '') // Chuyển tên sản phẩm về in thường và loại bỏ khoảng trắng
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const maxLength = characters.length
    const hash = crypto
        .createHmac('sha256', process.env.SALT)
        .update(formattedName)
        .digest('hex')

    let code = ''

    // Tạo mã sản phẩm từ kết quả băm
    for (let i = 0; i < 8; i++) {
        const char = hash.charAt(i)
        const charIndex = parseInt(char, 16) % maxLength
        code += characters.charAt(charIndex)
    }

    return code
}

module.exports = { generateRandomCategoryCode, generateProductCode }
