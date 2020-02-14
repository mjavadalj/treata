const router = require('express').Router();
const userRoutes = require('./api/routes/userRoutes');
const newsRoutes = require('./api/routes/newsRoutes');
router.use('/user', userRoutes);
router.use('/news', newsRoutes);

module.exports = router;