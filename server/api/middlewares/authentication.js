
const passport = require('passport');

module.exports.authenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    else {
        return res.status(400).json({
            message: "you are not allowed - please login"
        })
    }
}
module.exports.verfied = (req, res, next) => {
    if (req.isAuthenticated() && req.user.status == 'verfied') return next();

    else {
        return res.status(400).json({
            message: "you are not allowed - please verify youre account"
        })
    }
}