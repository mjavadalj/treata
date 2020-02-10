const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = mongoose.Schema.Types.ObjectId;

const cart = new Schema({

    _id: {
        type: objectId,
        required: true
    },
    user: { type: objectId, ref: 'User' },
    products: [{ type: objectId, ref: 'Product' }],
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },
})

module.exports = mongoose.model('Cart', cart);