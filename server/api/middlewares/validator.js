const joi = require('@hapi/joi');

const schema = joi.object({
    email: joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com'] }
    }),
    phoneNumber: joi.number(),
    password: joi.string()
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.{4,})")).required(),
    confirmPassword: joi.ref('password'),
    status: joi.string(),
    role: joi.string()
}).with('password', 'confirmPassword').xor('email', 'phoneNumber');


module.exports.signupValidator = (req) => {
    return schema.validateAsync({
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        status: req.body.status,
        role: req.body.role
    });

}