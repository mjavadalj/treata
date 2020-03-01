const News = require('../models/news');
const Pictures = require('../models/pictures');
const mongoose = require('mongoose');
const config = require('config');
var fs = require('fs');
var path = require('path');

const findInFiles = require('find-in-files');

module.exports.addNews = (req, res) => {

    var letters = req.body.text.split("", 100);
    var short = letters.join("");




    //* maybe make this a middleware !
    // var pictureArray;
    // fs.writeFile(`${path.join(__dirname + `./../../../files/txt/${req.body.title}.txt`)}`,
    // req.body.text, function (err) {
    // if (err) {
    // return res.status(500).json({
    // err
    //     })
    // }
    // Pictures.find({ newsTitle: req.body.title }).then(findedPictures => {
    // console.log(findedPictures[0].pictureFile)
    new News({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        text: req.body.text,
        summary: short,
        color: req.body.color,
        pictures: req.body.picUrls,
        date: new Date()
    }).save().then(news => {
        return res.status(200).json({
            message: "news added",
            news
        })
    }).catch(err => {
        return res.status(500).json({
            message: "adding news failed - internal !?",
            err
        })
    })

    // }).catch(err => {
    //     return res.status(500).json({
    //         message: "finding pictures failed",
    //         err
    //     })
    // })




    // });
}
module.exports.removeNews = (req, res) => {
    News.deleteOne({ $or: [{ title: req.body.title }, { _id: req.body.newsId }] }).then((news) => {
        if (news.deletedCount == 0) {

            return res.status(200).json({
                message: "nothing deleted"
            })
        } else {

            return res.status(200).json({
                message: "news deleted"
            })
        }
    }).catch(err => {
        return res.status(500).json({ message: "deleting failed - internal", err })
    })
}

module.exports.getNews = (req, res) => {

    // fs.readFile(`${path.join(__dirname + `./../../../files/txt/${req.body.title}.txt`)}`, 'utf8', function (err, data) {
    //     if (err) {
    //         return res.status(500).json({
    //             err
    //         })
    //     }

    News.find({ $or: [{ title: { "$regex": `${req.body.title}`, $options: "i" } }, { _id: req.body.newsId }] }).then((news) => {
        console.log(news);

        if (news.length < 1) {
            return res.status(400).json({
                message: "news does not exist"
            })
        }
        else {
            return res.status(200).json({
                message: "successful",
                news: news[0]
            })
        }
    }).catch(err => {
        return res.status(500).json({ message: "finding news failed - internal", err })
    })

    // });


}

module.exports.searchNews = (req, res) => {


    // findInFiles.find(req.body.pattern, `${path.join(__dirname + `./../../../files/txt`)}`, '.txt$')
    //     .then(response => {
    // console.log(Object.keys(response))
    // var titles = [];
    // for (var resp in response) {
    //     var name = resp.split("\\")
    //     var title = name[name.length - 1].split(".")
    //     titles.push(title[0])

    // }
    // console.log(titles);
    News.find({ $or: [{ text: { "$regex": `${req.body.pattern}`, $options: "i" } }, { title: { "$regex": `${req.body.pattern}`, $options: "i" } }] }).then(news => {
        console.log(req.body.pattern);

        if (news.length < 0) {
            return res.status(400).json({
                message: "news not found"
            })
        }
        else {

            return res.status(200).json({
                message: "finding successful",
                news
            })
        }
    }).catch(err => {
        return res.status(500).json({
            message: "finding news failed",
            err
        })
    })
    // }).catch(err => {
    //     return res.status(500).json({
    //         message: "finding files - internal",
    //         err
    //     })
    // })






}

// module.exports.uploadPic = (req, res) => {
//     var picUrls = [];
//     if (req.files.length < 1) {
//         return res.status(400).json({
//             message: "you didnt send files - empty"
//         })
//     }
//     else {

//         req.files.forEach(pic => {
//             picUrls.push(`${config.get('app.webServer.baseUrl')}/files/image/${pic.filename}`)
//         });

//         new Pictures({
//             _id: mongoose.Types.ObjectId(),
//             // newsTitle: req.body.title,
//             pictureFile: picUrls
//         }).save().then(pictures => {
//             return res.status(200).json({
//                 message: "upload succesful",
//                 pictures
//             })
//         }).catch(err => {
//             return res.status(500).json({
//                 message: "saving failed",
//                 err
//             })
//         })
//     }
// }

module.exports.uploadPic = (req, res) => {
    var picUrls = [];
    if (!req.file) {
        return res.status(400).json({
            message: "you didnt send files - empty"
        })
    }
    else {

        // req.files.forEach(pic => {
        //     picUrls.push(`${config.get('app.webServer.baseUrl')}/files/image/${pic.filename}`)
        // });
        picUrls.push(`${config.get('app.webServer.baseUrl')}/files/image/${req.file.filename}`);

        new Pictures({
            _id: mongoose.Types.ObjectId(),
            // newsTitle: req.body.title,
            pictureFile: picUrls
        }).save().then(pictures => {
            return res.status(200).json({
                message: "upload succesful",
                pictures
            })
        }).catch(err => {
            return res.status(500).json({
                message: "saving failed",
                err
            })
        })
    }
}


module.exports.getAllNews = (req, res) => {
    News.find({}).sort('-date').then(news => {
        return res.status(200).json({
            news
        })
    }).catch(err => {
        return res.status(500).json({
            err
        })
    })
}
module.exports.updateNews = (req, res) => {

    News.find({ _id: req.body.newsId }).then((news) => {

        if (news.length < 1) {
            return res.status(400).json({
                message: "news does not exist"
            })
        }
        else {
            if (req.body.title) { news[0].title = req.body.title; }
            if (req.body.text) { news[0].text = req.body.text; }
            if (req.body.picUrls) { news[0].pictures = req.body.picUrls; }
            if (req.body.summary) { news[0].summary = req.body.summary; }
            if (req.body.color) { news[0].color = req.body.color; }

            news[0].save().then(newNews => {

                return res.status(200).json({
                    message: "successful",
                    newNews
                })
            }).catch(err => {
                return res.status(500).json({
                    err
                })
            })
        }
    }).catch(err => {
        return res.status(500).json({ message: "finding news failed - internal", err })
    })

}

module.exports.getCatNews = (req, res) => {
    News.find({ category: req.body.newsCategory }).then(news => {
        if (news.length < 1) {
            return res.status(404).json({
                message: "news not found"
            })
        }
        else {
            return res.status(200).json({
                message: "successful",
                news: news[0]
            })
        }
    }).catch(err => {
        return res.status(500).json({
            message: "finding failed",
            err
        })
    })
}