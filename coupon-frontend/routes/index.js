const express = require('express');
const router = express.Router();
const config = require('../app/models/config');

router.get('/', (req, res, next) => {
    return res.render('index', { providers: config.providers });
});

module.exports = router;
