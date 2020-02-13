const router = require('express').Router();
const userController = require('../controllers/userController');
const logger = require('../middlewares/logger');
const authentication = require('../middlewares/authentication');

router.post('/signup', logger.userLogger, userController.signup);
router.post('/confirmsignup', logger.userLogger, userController.confirmSignup);

router.post('/login', logger.userLogger, userController.login);
router.post('/disposablePassword', logger.userLogger, userController.disposablePassword);
router.post('/loginwithsms', logger.userLogger, userController.loginWithSms);

router.get('/logout', logger.userLogger, userController.logout);

router.get('/getuser', logger.userLogger, authentication.authenticated, userController.getUser);


// * just for test
router.get('/get', (req, res) => {

    console.log(req.user);
    console.log("==========================");
    console.log(req.isAuthenticated());
    return res.status(200);
});

module.exports = router;