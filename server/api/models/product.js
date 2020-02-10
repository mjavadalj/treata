const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const objectId = mongoose.Schema.Types.ObjectId;

const product = new Schema({
    _id: {
        type: objectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: String,
    comments: [{ type: objectId, ref: 'Comment' }]
})
module.exports = mongoose.model('Product', product)