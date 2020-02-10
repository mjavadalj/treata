const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = mongoose.Schema.Types.ObjectId;

const comment = new Schema({
    _id: {
        type: objectId,
        required: true
    },
    user: [{ type: objectId, ref: 'User' }],
    text: {
        type: String,
        required: true,
    },
    product: {
        type: objectId,
        ref: 'Product'
    }
})

module.exports = mongoose.model('Comment', comment);