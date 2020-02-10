
const bunyan = require('bunyan');

const path = require('path');

const userLog = bunyan.createLogger({

    name: "User Logger",
    streams: [{
        type: 'rotating-file',
        path: path.join(__dirname + "/../../logs.log"),
        period: '1d',
    },
    {
        level: 'info',
        stream: process.stdout
    }]
});

module.exports.userLogger = (req, res, next) => {
    userLog.info({ url: req.originalUrl, requestBody: req.body });
    next();
};