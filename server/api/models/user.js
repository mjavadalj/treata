const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = mongoose.Schema.Types.ObjectId;

const user = new Schema({
    _id: {
        type: objectId,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    phoneNumber: {
        type: String,
        unique: true
    },
    address: [{
        type: String
    }],
    password: {
        type: String,
        required: [true, 'password is required']
    },
    disposablePassword: {
        type: String,
    },
    status: {
        type: String,
        required: true,
        enum: ['notVerfied', 'verfied'],
    },
    confirmationCode: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ['normalUser', 'admin', 'sender', 'contentCreator'],
    },
    cart: { type: objectId, ref: 'Cart' },
    likedNews: [{ type: objectId, ref: "News" }],
    savedNews: [{ type: objectId, ref: "News" }]

});

module.exports = mongoose.model('User', user);