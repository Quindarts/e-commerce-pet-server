const nodeMailer = require('nodemailer')
require('dotenv/config')

const sendMail = (to, subject, htmlContent) => {
    const transport = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'quang82thcspb@gmail.com',
            pass: '',
        },
    })

    const options = {
        from: 'quang82thcspb@gmail.com',
        to: to,
        subject: subject,
        html: htmlContent,
    }
    return transport.sendMail(options)
}
sendMail('ecompetric@gmail.com', 'hilo', 'hehe')
