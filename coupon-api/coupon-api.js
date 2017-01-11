const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./models/config');

const users = require('./controllers/users');
const admins = require('./controllers/admins');
const coupons = require('./controllers/coupons');
const auth = require('./controllers/auth');

var app = express();

// mongoose.connect('localhost:5000');
mongoose.connect(config.dbUrl, {server: {socketOptions: {keepAlive: 120}}});

if (app.get('env') === 'development') var dev = true;

// log if in dev mode
if (dev) app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// ==========================================
// More Middleware
// ==========================================

app.param('id', function(req, res, next, id) {
    if (!id.match(/^[0-9a-fA-F]{24}$/))
        return res.status(400).send('Invalid ID');
    next();
});

//================================================
// Routes
//================================================

app.get('/users', users.getUsers);
app.get('/users/:id', users.getUserById);
app.post('/users', users.createUser);
app.put('/users/:id', users.updateUser);
app.delete('/users/:id', users.deleteUserById);

app.post('/admins', admins.createAdmin);

app.get('/coupons', coupons.getAllCoupons);
app.get('/coupons/active', coupons.getActiveCoupons);
app.get('/coupons/unapproved', coupons.getUnapprovedCoupons);
app.put('/coupons/:id/approve', auth.superAdminRequired, coupons.approveCoupon);
app.get('/coupons/:id', coupons.getCouponById);
app.post('/coupons', coupons.createCoupon);
app.put('/coupons/:id', coupons.updateCoupon);
app.delete('/coupons/:id', coupons.deleteCouponById);

app.post('/auth/token', auth.loginUser);

// handle 404
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    // who knows
    err.status = 404;
    next(err);
});

// another errorhandler
app.use(function(err, req, res, next) {
    console.log('oops');
    next(err);
});

app.use(function(err, req, res, next) {
    console.log(err);
    res.status(err.status || 500).send();
});

var server = app.listen(config.port);
console.log('Listening at http://localhost:%s in %s mode',
    server.address().port, app.get('env'));

module.exports = app;
