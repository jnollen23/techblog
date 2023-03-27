const router = require('express').Router();

const loginRoutes = require('./login');
const postRoutes = require('./posts');

router.use('/login', loginRoutes);
router.use('/posts', postRoutes);

module.exports = router;
