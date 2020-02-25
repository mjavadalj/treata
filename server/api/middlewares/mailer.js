'use strict';
const nodemailer = require('nodemailer');

const config = require('config');
const Kavenegar = require('kavenegar');
module.exports.emailVerification = async (email, subject, sendingText) => {

    let transporter = nodemailer.createTransport({
        service: config.get('app.mail.mailService'),
        secure: false,
        auth: {
            user: config.get('app.mail.mail'),
            pass: config.get('app.mail.mailPassword')
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    // TODO: fix this
    let info = await transporter
        .sendMail({
            from: config.get('app.mail.mail'),
            to: email,
            subject: subject,
            text: sendingText
        })
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.log(err);
        });
};
module.exports.phoneVerfication = (phoneNumber, sendingText) => {
    const SmsApi = Kavenegar.KavenegarApi({ apikey: config.get('app.mail.sms_api_key') });
    SmsApi.Send(
        {
            message: sendingText,
            sender: config.get('app.mail.sms_sender'), receptor: phoneNumber
        },
        function (response, status) {
            console.log(response);
            console.log(status);

        }

    );
}

