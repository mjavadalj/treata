const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const objectId = mongoose.Schema.Types.ObjectId;

const purchase = new Schema({
    _id: {
        type: objectId,
        required: true
    },
    cart: {
        type: objectId,
        required: true,
        ref: 'Cart'
    },
    status: {
        type: String,
        enum: ['notPaid', 'paid', 'sent', 'gived'],
        default: 'notPaid'
    },
    address: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['online', 'inPerson'],
        default: 'online'
    }
    //* zarin pal info 
})
module.exports = mongoose.model('Purchase', purchase)