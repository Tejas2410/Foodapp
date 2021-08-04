const userModel = require('../model/userModel')
const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text');
const pug = require('pug');
module.exports = class Email {
    constructor(user, url) {
        this.to = user.email;
        this.from = "'Rajat Kumar' < rajat.mishra1121@gmail.com>";
        this.url = url;
        this.name = user.name
    }
    newNodeMailer() {
        return nodemailer.createTransport({
            host: "smtp.gmail.io",
            service: "gmail",
            port: 2525,
            auth: {
                user: "rajat.mishra1121@gmail.com",
                pass: process.env.pass
            }
        });

    }
    // let s=10;
    async send(template, subject) {
        //1. render pug
        let obj = {
            name: this.name,
            url: this.url
        }
        let html = pug.renderFile(`${__dirname}/../template/${template}.pug`, obj)

        //2. create options
        let emailOptons = {
            from: this.from,
            to: this.to,
            subject: subject,
            text: htmlToText.fromString(html),
            html: html
        }
        //3. sendEmail
        this.newNodeMailer().sendMail(emailOptons);
    }
    async sendWelcome() {
        this.send("welcome", "Welcome to Bon Apetite Family!!!")
    }
    async sendForgot() {
        this.send("resetPassword", "Reset Password")
    }
}
// module.exports = async function sendEmail(options) {
//     var transport = nodemailer.createTransport({
//         host: "smtp.mailtrap.io",
//         port: 2525,
//         auth: {
//             user: "25441608066a9e",
//             pass: "931a02d99689f8"
//         }
//     });

//     let emailOptons = {
//         from: '"Rajat Kumar" <raj@example.com>',
//         to: options.recieeverId,
//         subject: options.subject,
//         text: "Hello Hi Bye Get Lost" + options.token,
//         html: "<h1>fwfowifeowfwomo</h1>"
//     }
//     await transport.sendMail(emailOptons);
// }