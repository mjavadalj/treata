const News = require('../models/news');
const mongoose = require('mongoose');
const config = require('config');
var fs = require('fs');
var path = require('path');

const findInFiles = require('find-in-files');

module.exports.addNews = (req, res) => {
    var picUrls = [];
    req.files.forEach(pic => {
        picUrls.push(`${config.get('app.webServer.baseUrl')}/files/image/${pic.filename}`)
    });
    //* maybe make this a middleware !
    fs.writeFile(`${path.join(__dirname + `./../../../files/txt/${req.body.title}.txt`)}`,
        req.body.text, function (err) {
            if (err) throw err;
            new News({
                _id: mongoose.Types.ObjectId(),
                title: req.body.title,
                textFile: `${config.get('app.webServer.baseUrl')}/files/txt/${req.body.title}.txt`,
                pictureFile: picUrls
            }).save().then(news => {
                return res.status(200).json({
                    message: "news added",
                    news
                })
            }).catch(err => {
                return res.status(500).json({
                    message: "adding news failed - internal !?"
                })
            })
        });
}
module.exports.removeNews = (req, res) => {
    News.deleteOne({ $or: [{ title: req.body.title }, { _id: req.body.newsId }] }).then(() => {
        return res.status(200).json({
            message: "news deleted"
        })
    }).catch(err => {
        return res.status(500).json({ message: "deleting failed - internal", err })
    })
}

module.exports.getNews = (req, res) => {

    fs.readFile(`${path.join(__dirname + `./../../../files/txt/${req.body.title}.txt`)}`, 'utf8', function (err, data) {
        if (err) throw err;

        News.find({ $or: [{ title: req.body.title }, { _id: req.body.newsId }] }).then((news) => {

            if (news.length < 1) {
                return res.status(400).json({
                    message: "news does not exist"
                })
            }
            else {
                return res.status(200).json({
                    message: "successful",
                    news: news[0],
                    text: data
                })
            }
        }).catch(err => {
            return res.status(500).json({ message: "finding news failed - internal", err })
        })

    });


}

module.exports.searchNews = (req, res) => {


    findInFiles.find(req.body.pattern, `${path.join(__dirname + `./../../../files/txt`)}`, '.txt$')
        .then(response => {
            // console.log(Object.keys(response))
            var titles = [];
            for (var resp in response) {
                var name = resp.split("\\")
                var title = name[name.length - 1].split(".")
                titles.push(title[0])

            }
            // console.log(titles);
            News.find({ title: { $in: titles } }).then(news => {
                return res.status(200).json({
                    message: "finding successful",
                    news
                })
            }).catch(err => {
                return res.status(500).json({
                    message: "finding news failed",
                    err
                })
            })
        }).catch(err => {
            return res.status(500).json({
                message: "finding files - internal",
                err
            })
        })
}