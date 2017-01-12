const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../app/models/config');
const auth = require('./auth');

router.get('/', (req, res, next) => {
    return res.render('index', { providers: config.providers });
});

router.post('/', function(req, res, next) {
    request.post(config.apiUrl + '/users', { form: req.body }).pipe(res);
});

router.get('/login', function(req, res, next) {
    return res.render('login');
});

router.post('/login', function(req, res, next) {
    request.post(config.apiUrl + '/auth/token', { form: req.body }).pipe(res);
});

router.get('/admin', auth.adminRequired, function(req, res, next) {
    if (req.user.isAdmin || req.user.isSuperAdmin)
        return res.redirect('/admin/coupons?token=' + req.token);
    return res.render('login');
});

router.get('/admin/coupons', auth.adminRequired, function(req, res, next) {
    return res.render('coupons', {
        token: req.token,
        isAdmin: !!req.user.isAdmin,
        isSuperAdmin: !!req.user.isSuperAdmin
    });
});

module.exports = router;
