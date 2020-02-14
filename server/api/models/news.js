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
    textFile: {
        type: String,
        required: true
    },
    pictureFile: [String],
    likes: {
        type: Number,
        default: 0
    }
})
module.exports = mongoose.model('News', news)