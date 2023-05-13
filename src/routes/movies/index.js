const router = require('express').Router();

router.use('/', require('./get.movie[id]'));
router.use('/', require('./get.movies'));
router.use('/', require('./post.movie'));
router.use('/', require('./put.movie'));
router.use('/', require('./patch.rank.movie'));

module.exports = router;
