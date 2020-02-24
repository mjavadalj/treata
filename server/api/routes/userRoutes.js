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

router.post('/likenews', logger.userLogger, userController.likeNews);//authentication.verfied,
router.post('/unlikenews', logger.userLogger, userController.unlikeNews);//authentication.verfied,
router.post('/savenews', logger.userLogger, userController.saveNews);//authentication.verfied,
router.post('/unsavenews', logger.userLogger, userController.unSaveNews);//authentication.verfied,


module.exports = router;