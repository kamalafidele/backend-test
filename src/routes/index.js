const router = require('express').Router();

router.use('/movies', require('./movies'));

module.exports = router;
