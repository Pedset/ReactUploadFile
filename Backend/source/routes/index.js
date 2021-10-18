const router = require('express').Router();

router.use('/', require('./user.routers'));

module.exports = router;