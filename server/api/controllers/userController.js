const bcrypt = require('bcryptjs');
const User = require('../models/user');
const validator = require('../middlewares/validator');
const mongoose = require('mongoose');
require('../middlewares/passportSession');
const mailer = require('../middlewares/mailer');
const randomstring = require("randomstring");

module.exports.signup = (req, res, next) => {
    var confirmationCode = randomstring.generate(5);

    var sendingText = `
    Treata
    از کد زیر برای تایید ثبت نام خود در تریتا استفاده کنید:\n
    ${confirmationCode}
`;
    var subject = `کد تایید ثبت نام در treata`
    validator.signupValidator(req)

        .then(requestBody => {
            User.find({ $or: [{ email: requestBody.email }, { phoneNumber: requestBody.phoneNumber }] })
                .then(findResult => {
                    if (findResult.length > 0) {
                        return res.status(400).json({
                            message: "user already exist"
                        })
                    }
                    else if (findResult.length == 0) {
                        bcrypt.hash(requestBody.password, 10)
                            .then(hashedPassword => {
                                new User({
                                    _id: mongoose.Types.ObjectId(),
                                    password: hashedPassword,
                                    email: requestBody.email,
                                    phoneNumber: requestBody.phoneNumber,
                                    status: 'notVerfied',
                                    confirmationCode,
                                    role: 'normalUser'
                                }).save()
                                    .then((insertResult) => {

                                        if (requestBody.phoneNumber) {
                                            mailer.phoneVerfication(requestBody.phoneNumber, sendingText)
                                            req.login(insertResult, (error) => {
                                                if (error) throw error;
                                                console.log("logged in after signup")
                                                return res.status(200).json({
                                                    message: 'signup successful - sms sent',
                                                    user: insertResult
                                                })
                                            })


                                        }
                                        else if (requestBody.email) {

                                            mailer.emailVerification(requestBody.email, subject, sendingText).then(() => {
                                                req.login(insertResult, (error) => {
                                                    if (error) {
                                                        console.log(error)
                                                        throw error
                                                    }
                                                    console.log("logged in after signup")
                                                    return res.status(200).json({
                                                        message: 'signup successful - email sent',
                                                        user: insertResult
                                                    })
                                                })

                                            }).catch(err => {
                                                return res.status(500).json({
                                                    message: 'signup failed',
                                                    err
                                                })
                                            })
                                        }
                                    })
                                    .catch(saveRecordError => {
                                        return res.status(500).json({
                                            message: "saving record in database failed.(internal error)",
                                            error: saveRecordError
                                        })
                                    })
                            })
                            .catch(hashError => {
                                return res.status(500).json({
                                    message: "hashing password internal error",
                                    error: hashError
                                })
                            })
                    }
                })
                .catch(mongooseError => {
                    return res.status(500).json({
                        message: "mongoose find method internal error",
                        error: mongooseError
                    })
                });
        })
        .catch(validateNotPassed => {
            return res.status(400).json({ errors: validateNotPassed.details })
        });
};


module.exports.confirmSignup = (req, res) => {

    User.find({ $or: [{ email: req.user.email }, { phoneNumber: req.user.phoneNumber }] }).then(users => {
        if (users[0].confirmationCode == req.body.confirmationCode) {
            users[0].status = "verfied";
            users[0].confirmationCode = "";
            users[0].save().then(() => {
                return res.status(200).json({
                    message: "user successfuly confirmed",
                    user: users[0]
                })
            }).catch(err => {
                return res.status(500).json({
                    err
                })
            })

        }
    })

}

module.exports.login = (req, res) => {
    User.find({ $or: [{ email: req.body.email }, { phoneNumber: req.body.phoneNumber }] })
        .then(user => {
            if (user.length < 1) {
                return res.status(400).json({
                    message: "user don't exist"
                });
            }
            else {
                bcrypt.compare(req.body.password, user[0].password)
                    .then(compareResult => {
                        if (compareResult == false) {
                            return res.status(400).json({
                                message: "email or password is wrong"
                            })
                        } else {
                            req.login(user[0], (error) => {
                                if (error) throw error;
                                return res.status(200).json({
                                    message: "login successful",
                                    user: user[0]
                                })
                            })

                        }
                    })
                    .catch(compareError => {
                        return res.status(500).json({
                            message: "comparing passwords failed - internal error",
                            error: compareError
                        })
                    });
            }
        })
        .catch(findUserFailed => {
            return res.status(500).json({
                message: "finding user failed - internal error",
                error: findUserFailed
            })
        });

}

module.exports.disposablePassword = (req, res) => {

    var disposablePassword = randomstring.generate(5);

    var sendingText = `
    Treata
    رمز عبو شما:\n
    ${disposablePassword}
`
    User.find({ phoneNumber: req.body.phoneNumber })
        .then(user => {
            if (user.length < 1) {
                return res.status(400).json({
                    message: "user don't exist"
                });
            }
            else {
                user[0].disposablePassword = disposablePassword;
                user[0].save().then((user) => {

                    mailer.phoneVerfication(requestBody.phoneNumber, sendingText)
                    return res.status(200).json({
                        message: "sms sent !"
                    })

                }).catch(err => {
                    return res.status(500).json({
                        message: "database error ",
                        err
                    })

                });



            }
        })
        .catch(findUserFailed => {
            return res.status(500).json({
                message: "finding user failed - internal error",
                error: findUserFailed
            })
        });

}


module.exports.loginWithSms = (req, res) => {

    User.find({ phoneNumber: req.body.phoneNumber }).then(users => {

        if (user.length < 1) {
            return res.status(400).json({
                message: "user doesn't exist"
            })
        }
        else {
            if (user[0].disposablePassword == req.body.disposablePassword) {

                req.login(user[0], (error) => {
                    if (error) throw error;
                    console.log("logged in after signup")
                    return res.status(200).json({
                        message: 'signup successful - sms sent',
                        user: user[0]
                    })
                })
            }
            else {
                return res.status(400).json({ message: "password incorrect" })
            }
        }

    }).catch(err => { return res.status(500).json({ message: "finding user failed - internal", err }) })

}

module.exports.logout = (req, res) => {
    req.session.destroy(function (err) {
        return res.status(200).json({
            message: "logged out seccessfuly"
        })
    })
}
module.exports.getUser = (req, res) => {
    return res.status(200).json({
        user: req.user
    })
};

