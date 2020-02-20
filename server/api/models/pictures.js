const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const objectId = mongoose.Schema.Types.ObjectId;

const pictures = new Schema({
    _id: {
        type: objectId,
        required: true
    },
    newsId: { type: objectId, ref: "News" },
    newsTitle: { type: String },
    pictureFile: [String],
})
module.exports = mongoose.model('Pictures', pictures)