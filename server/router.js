const router = require('express').Router();
const userRoutes = require('./api/routes/userRoutes');

router.use('/user', userRoutes);

module.exports = router;