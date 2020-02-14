
const bunyan = require('bunyan');

const path = require('path');

const userLog = bunyan.createLogger({

    name: "User Logger",
    streams: [{
        type: 'rotating-file',
        path: path.join(__dirname + "/../../logs/userLogs.log"),
        period: '1d',
    },
    {
        level: 'info',
        stream: process.stdout
    }]
});

const newsLog = bunyan.createLogger({

    name: "news Logger",
    streams: [{
        type: 'rotating-file',
        path: path.join(__dirname + "/../../logs/newsLogs.log"),
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
module.exports.newsLogger = (req, res, next) => {
    newsLog.info({ url: req.originalUrl, requestBody: req.body });
    next();
};