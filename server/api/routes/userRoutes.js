const router = require('express').Router();
const userController = require('../controllers/userController');
const logger = require('../middlewares/logger');
const authentication = require('../middlewares/authentication');

router.post('/signup', logger.userLogger, userController.signup);
router.post('/confirmsignup', logger.userLogger, userController.confirmSignup);
router.post('/signupwithsms', logger.userLogger, userController.signupWithSms);

router.post('/login', logger.userLogger, userController.login);
// router.post('/disposablePassword', logger.userLogger, userController.disposablePassword);
router.post('/loginwithsms', logger.userLogger, userController.loginWithSms);

router.get('/logout', logger.userLogger, userController.logout);

router.get('/getuser', logger.userLogger, authentication.authenticated, userController.getUser);

router.post('/likenews', logger.userLogger, authentication.authenticated, authentication.verfied, userController.likeNews);
router.post('/unlikenews', logger.userLogger, authentication.authenticated, authentication.verfied, userController.unlikeNews);
router.post('/savenews', logger.userLogger, authentication.authenticated, authentication.verfied, userController.saveNews);
router.post('/unsavenews', logger.userLogger, authentication.authenticated, authentication.verfied, userController.unSaveNews);


module.exports = router;