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
    },
    category: {
        type: String,
        enum: ['all', 'medical', 'treata', 'alzheimer']
    }
})
module.exports = mongoose.model('News', news)