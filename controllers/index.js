const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home');
const dashboard = require('./dashboard');

router.use('/api', apiRoutes);
router.use('/Dashboard', dashboard)
router.use('', homeRoutes);

module.exports = router;
