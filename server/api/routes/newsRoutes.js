const router = require('express').Router();
const newsController = require('../controllers/newsController');
const authentication = require('../middlewares/authentication');
const upload = require('../middlewares/uploadMiddleware');
const logger = require('../middlewares/logger');

router.post('/addnews', logger.newsLogger, newsController.addNews);// authentication.authenticated, authentication.isContentCreator,

router.post('/removenews', logger.newsLogger, newsController.removeNews);// authentication.authenticated, authentication.isContentCreator,
router.post('/uploadpics', logger.newsLogger, upload.array('photos', 3), newsController.uploadPic);// authentication.authenticated, authentication.isContentCreator,
// router.post('/updatenews', logger.newsLogger, newsController.updateNews);
router.post('/getnews', logger.newsLogger, newsController.getNews);
router.get('/news', logger.newsLogger, newsController.getAllNews);

router.post('/searchnews', logger.userLogger, newsController.searchNews);  /*authentication.authenticated, authentication.verfied, */
module.exports = router;