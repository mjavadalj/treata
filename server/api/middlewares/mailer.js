'use strict';
const nodemailer = require('nodemailer');
require('dotenv');

const Kavenegar = require('kavenegar');

module.exports.emailVerification = async (email, confirmationCode) => {

    let transporter = nodemailer.createTransport({
        service: process.env.MAILSERVICE,
        secure: false,
        auth: {
            user: process.env.MAIL,
            pass: process.env.MAILPASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    // TODO: fix this
    let info = await transporter
        .sendMail({
            from: process.env.MAIL,
            to: email,
            subject: 'کد تایید ثبت نام در تریتا',
            text: ` از کد زیر برای تایید ثبت نام خود در تریتا استفاده کنید:\n
            ${confirmationCode}
            `
        })
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.log(err);
        });
};
module.exports.phoneVerfication = (phoneNumber, confirmationCode) => {
    const SmsApi = Kavenegar.KavenegarApi({ apikey: process.env.SMS_API_KEY });
    SmsApi.Send(
        {
            message: `
            Treata
            از کد زیر برای تایید ثبت نام خود در تریتا استفاده کنید:\n
            ${confirmationCode}
        `, sender: process.env.SMSSENDER, receptor: phoneNumber
        },
        function (response, status) {
            console.log(response);
            console.log(status);

        }

    );
}