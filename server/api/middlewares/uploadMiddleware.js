const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${path.join(__dirname + `./../../../files/image`)}`);
    },
    filename: function (req, file, cb) {
        cb(null, Math.floor(Math.random() * 100) + file.originalname);
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    }
});

module.exports = upload