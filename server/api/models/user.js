const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = mongoose.Schema.Types.ObjectId;

const user = new Schema({
    _id: {
        type: objectId,
        required: true
    },
    email: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    address: [{
        type: String
    }],
    password: {
        type: String
    },
    disposablePassword: {
        type: String,
    },
    status: {
        type: String,
        required: true,
        enum: ['notVerfied', 'verfied'],
        default: 'notVerfied'
    },
    confirmationCode: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ['normalUser', 'admin', 'sender', 'contentCreator'],
        default: 'normalUser'
    },
    cart: { type: objectId, ref: 'Cart' },
    likedNews: [{ type: objectId, ref: "News" }],
    savedNews: [{ type: objectId, ref: "News" }]

});

module.exports = mongoose.model('User', user);