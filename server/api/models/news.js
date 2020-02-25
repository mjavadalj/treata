const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const objectId = mongoose.Schema.Types.ObjectId;

const news = new Schema({
    _id: {
        type: objectId,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    pictures: [String],
    likes: {
        type: Number,
        default: 0
    },
    text: String,
    summary: String,
    color: {
        type: String
    },
    date: {
        type: Date
    }
})
module.exports = mongoose.model('News', news)