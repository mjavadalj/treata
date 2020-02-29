const router = require('express').Router();
const userController = require('../controllers/userController');
const logger = require('../middlewares/logger');
const authentication = require('../middlewares/authentication');

const teee = require('../middlewares/Trez');
const TrezSmsClient = require("trez-sms-client");
const client = new teee("mjavadalj", "0123456789")
router.post('/sms', logger.userLogger, (req, res) => {
    client.manualSendCode("09379387278", "Verification Code: 595783 \nTrez WebService SMS")
        .then((messageId) => {
            console.log("Sent Message ID: " + messageId);
            return res.status(200).json({
                message: "ok"
            })
        })
        .catch(error => console.log(error))
});


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
router.post('/addpooshe', logger.userLogger, userController.addPooshe);
router.post('/getUserLikes', logger.userLogger, userController.getUserLikes);
router.post('/getUsersaves', logger.userLogger, userController.getUserSaves);
router.post('/getUserpooshe', logger.userLogger, userController.getUserPooshe);
router.post('/deletepooshe', logger.userLogger, userController.deletePooshe);



router.get('/getalluser', logger.userLogger, userController.getAllUser);

module.exports = router;