const router = require('express').Router();
const userRoutes = require('./api/routes/userRoutes');
const newsRoutes = require('./api/routes/newsRoutes');
router.use('/user', userRoutes);
router.use('/news', newsRoutes);
router.use('/test', (req, res) => {
    return res.status(200).json({
        message: "ok",
        text: req.body.text
    })
});

module.exports = router;