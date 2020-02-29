const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const objectId = mongoose.Schema.Types.ObjectId;

const saveNews = new Schema({
    _id: {
        type: objectId,
        required: true
    },
    user: { type: objectId, ref: 'User' },
    title: {
        type: String
    },
    savedNews: [{
        type: objectId, ref: 'News'
    }]
})
module.exports = mongoose.model('saveNews', saveNews)