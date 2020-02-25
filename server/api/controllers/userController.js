const bcrypt = require('bcryptjs');
const User = require('../models/user');
const validator = require('../middlewares/validator');
const mongoose = require('mongoose');
require('../middlewares/passportSession');
const mailer = require('../middlewares/mailer');
const randomstring = require("randomstring");
const News = require('../models/news');
const Ghasedak = require("ghasedak");
const ghasedak = new Ghasedak("fd7ff374fcf488df733aa72b039d2590cf26b01121f00e6896ca4862fb3dd976");
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
                                    role: requestBody.role
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

// module.exports.disposablePassword = (req, res) => {

//     var disposablePassword = randomstring.generate(5);

//     var sendingText = `
//     Treata
//     رمز عبو شما:\n
//     ${disposablePassword}
// `
//     User.find({ phoneNumber: req.body.phoneNumber })
//         .then(user => {
//             if (user.length < 1) {
//                 new User({
//                     _id: mongoose.Types.ObjectId(),
//                     phoneNumber: requestBody.phoneNumber,
//                     status: 'notVerfied'
//                 }).save().then(user => {
//                     mailer.phoneVerfication(requestBody.phoneNumber, sendingText)
//                     return res.status(200).json({
//                         message: "confirmation code sent",
//                         user
//                     })
//                 })
//                     .catch(err => {
//                         return res.status(500).json({
//                             message: "sign up failed",
//                             err
//                         })
//                     })

//             }
//             else {
//                 user[0].disposablePassword = disposablePassword;
//                 user[0].save().then((user) => {

//                     mailer.phoneVerfication(requestBody.phoneNumber, sendingText)
//                     return res.status(200).json({
//                         message: "sms sent !"
//                     })

//                 }).catch(err => {
//                     return res.status(500).json({
//                         message: "database error ",
//                         err
//                     })

//                 });



//             }
//         })
//         .catch(findUserFailed => {
//             return res.status(500).json({
//                 message: "finding user failed - internal error",
//                 error: findUserFailed
//             })
//         });

// }


module.exports.loginWithSms = (req, res) => {

    User.find({ phoneNumber: req.body.phoneNumber }).then(users => {

        if (users.length < 1) {
            return res.status(400).json({
                message: "user doesn't exist"
            })
        }
        else {
            if (users[0].disposablePassword == req.body.disposablePassword) {

                req.login(users[0], (error) => {
                    if (error) throw error;
                    console.log("logged in after signup")
                    return res.status(200).json({
                        message: 'login successful',
                        user: users[0]
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
    User.find({ _id: req.user._id }).then(users => {
        if (users.length < 1) {
            return res.satus(400).json({
                message: "user does not exist"
            })
        } else {
            return res.status(200).json({
                message: "finding user successful",
                user: users[0]
            })
        }
    }).catch(err => {
        return res.status(500).json({ message: "cannot found user", err })
    })
};

module.exports.likeNews = (req, res) => {
    News.find({ $or: [{ title: req.body.title }, { _id: req.body.newsId }] }).then(news => {
        if (news.length < 1) {
            return res.status(400).json({
                message: "news not found"
            })
        } else {
            news[0].likes = news[0].likes + 1;
            news[0].save().then(newNews => {

                // User.find({ _id: req.user._id }).then(users => {
                User.find({ _id: req.body.userId }).then(users => {

                    if (!users[0].likedNews.includes(`${newNews._id}`)) {

                        users[0].likedNews.push(newNews._id);
                        users[0].save().then(user => {
                            return res.status(200).json({
                                message: "news liked",
                                newNews
                            })
                        }).catch(err => {
                            return res.status(500).json({
                                message: "updatin user failed - internal",
                                err
                            })
                        })
                    } else {
                        return res.status(400).json({
                            message: "you already like this news"
                        })
                    }
                }).catch(err => {
                    return res.status(400).json({
                        message: "finding this user failed ",
                        err
                    })
                })
            }).catch(err => {
                return res.status(500).json({
                    message: "updating news failed",
                    err
                })
            })
        }
    }).catch(err => {
        return res.status(500).json({
            message: "finding the news failed - internal",
            err
        })
    })
}
module.exports.unlikeNews = (req, res) => {

    // User.find({ _id: req.user._id }).then(users => {
    User.find({ _id: req.body.userId }).then(users => {

        News.find({ $or: [{ title: req.body.title }, { _id: req.body.newsId }] }).then(news => {
            if (users[0].likedNews.includes(`${news[0]._id}`)) {
                users[0].likedNews.splice(users[0].likedNews.indexOf(`${news[0]._id}`), 1);
                users[0].save().then(() => {

                    news[0].likes = news[0].likes - 1;
                    news[0].save().then(newNews => {
                        return res.status(200.).json({
                            message: "news unliked",
                            news: newNews
                        })
                    }).catch(err => {
                        return res.status(500).json({
                            err,
                            message: "saving info failed"
                        })
                    })
                }).catch()
            } else {
                return res.status(400).json({
                    message: "you never liked this news"
                })

            }
        }).catch(err => {
            return res.status(500).json({
                err,
                message: "finding news failed"
            })
        })
    }).catch(err => {
        return res.status(500).json({
            err,
            message: "finding user failed"
        })
    })
}



module.exports.saveNews = (req, res) => {
    // User.find({ _id: req.user._id }).then(users => {

    User.find({ _id: req.body.userId }).then(users => {
        News.find({ $or: [{ title: req.body.title }, { _id: req.body.newsId }] }).then(news => {
            if (!users[0].savedNews.includes(`${news[0]._id}`)) {


                users[0].savedNews = news[0]._id;
                users[0].save().then(user => {
                    return res.status(200).json({
                        message: "news saved successfully",
                        user
                    })
                }).catch(err => {
                    return res.status(500).json({
                        message: "saving info failed",
                        err
                    })
                })
            }
            else {
                return res.status(400).json({
                    message: "you already saved this news"
                })
            }


        }).catch(err => {
            return res.status(500).json({
                message: "finding news failed",
                err
            })
        })
    }).catch(err => {
        return res.status(500).json({
            message: "finding user failed",
            err
        })
    })
}



module.exports.unSaveNews = (req, res) => {
    // User.find({ _id: req.user._id }).then(users => {
    User.find({ _id: req.body.userId }).then(users => {
        News.find({ $or: [{ title: req.body.title }, { _id: req.body.newsId }] }).then(news => {
            if (users[0].savedNews.includes(`${news[0]._id}`)) {
                users[0].savedNews.splice(users[0].savedNews.indexOf(`${news[0]._id}`), 1);

                users[0].savedNews = news[0]._id;
                users[0].save().then(user => {
                    return res.status(200).json({
                        message: "news saved successfully",
                        user
                    })
                }).catch(err => {
                    return res.status(500).json({
                        message: "saving info failed",
                        err
                    })
                })
            }
            else {
                return res.status(400).json({
                    message: "you never saved this news"
                })
            }


        }).catch(err => {
            return res.status(500).json({
                message: "finding news failed",
                err
            })
        })
    }).catch(err => {
        return res.status(500).json({
            message: "finding user failed",
            err
        })
    })
}



module.exports.signupWithSms = (req, res) => {

    var disposablePassword = randomstring.generate(5);

    var sendingText = `
    Treata
    رمز عبو شما:\n
    ${disposablePassword}
`
    User.find({ phoneNumber: req.body.phoneNumber }).then(usersFinded => {
        if (usersFinded.length < 1) {
            new User({
                _id: mongoose.Types.ObjectId(),
                phoneNumber: req.body.phoneNumber,
                status: 'notVerfied'
            }).save().then(userAdded => {
                mailer.phoneVerfication(req.body.phoneNumber, sendingText)
                // ghasedak.send({ message: `${sendingText}`, receptor: `${req.body.phoneNumber}`, lineNumber: "10008566" });
                userAdded.disposablePassword = disposablePassword;
                userAdded.save().then(user => {
                    return res.status(200).json({
                        message: "confirmation code sent",
                        user
                    })

                }).catch(err => {
                    return res.status(500).json({
                        message: "saving changed failed",
                        err
                    })
                })

            }).catch(err => {
                console.log("rrrrr");
                return res.status(500).json({
                    message: "internal error",
                    err
                })
            })
        }
        else {
            mailer.phoneVerfication(usersFinded[0].phoneNumber, sendingText)
            // ghasedak.send({ message: `${sendingText}`, receptor: `${req.body.phoneNumber}`, lineNumber: "10008566" });
            usersFinded[0].disposablePassword = disposablePassword;
            usersFinded[0].save().then(addedUser => {
                return res.status(200).json({
                    message: "confirmation code sent",
                    user: addedUser
                })

            }).catch(err => {
                return res.status(500).json({
                    message: "saving failed - internal",
                    err
                })
            });
        }



    })
        .catch(err => {
            return res.status(500).json({
                message: "sign up failed",
                err
            })
        })
}

