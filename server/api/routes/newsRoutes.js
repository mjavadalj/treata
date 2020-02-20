const router = require('express').Router();
const newsController = require('../controllers/newsController');
const authentication = require('../middlewares/authentication');
const upload = require('../middlewares/uploadMiddleware');
const logger = require('../middlewares/logger');

router.post('/addnews', logger.newsLogger, authentication.authenticated, authentication.isContentCreator, newsController.addNews);

router.post('/removenews', logger.newsLogger, authentication.authenticated, authentication.isContentCreator, newsController.removeNews);
router.post('/uploadpics', logger.newsLogger, authentication.authenticated, authentication.isContentCreator, upload.array('photos', 3), newsController.uploadPic);

router.post('/getnews', logger.newsLogger, newsController.getNews);

router.post('/searchnews', logger.userLogger, newsController.searchNews);  /*authentication.authenticated, authentication.verfied, */
module.exports = router;