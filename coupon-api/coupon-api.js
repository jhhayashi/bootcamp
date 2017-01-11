const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const config = require('./models/config');

const users = require('./controllers/users');
const coupons = require('./controllers/coupons');
const admins = require('./controllers/admins');
const sender = require('./controllers/sender');
const auth = require('./controllers/auth');

// http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;
mongoose.connect(config.dbUrl, {server: {socketOptions: {keepAlive: 120}}});

var app = express();
var router = express.Router();

// log if in dev mode
if (app.get('env') !== 'production') app.use(logger('dev'));
// run init script from init directory
require('./init/init');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//================================================
// Middleware
//================================================
router.param('id', (req, res, next, id) => {
    if (!id.match(/^[0-9a-fA-F]{24}$/))
        return res.status(400).send('Invalid ID');
    next();
});

router.param('phone', (req, res, next, phone) => {
    if (!(+phone) || phone.length !== 10)
        return res.status(400).send('Invalid phone');
    next();
});

//================================================
// Routes
//================================================

router.route('/users')
    .get(auth.superAdminRequired, users.getUsers)
    .post(users.createUser);
router.route('/users/send')
    .post(auth.superAdminRequired, sender.sendAllCouponsToAllUsers);
router.route('/users/:id')
    .get(auth.superAdminRequired, users.getUserById)
    .put(users.updateUser)
    .delete(users.deleteUserById);
router.route('/users/phone/:phone')
    .delete(users.deleteUserByPhone);

router.route('/coupons')
    .get(coupons.getActiveCoupons)
    .post(auth.adminRequired, coupons.createCoupon);
router.route('/coupons/send')
    .post(auth.superAdminRequired, sender.sendAllCouponsToAllUsers);
router.route('/coupons/:id')
    .get(coupons.getCouponById)
    .post(auth.superAdminRequired, coupons.approveCoupon)
    .put(auth.adminRequired, coupons.updateCoupon)
    .delete(auth.adminRequired, coupons.deleteCouponById);
router.route('/coupons/:id/send')
    .post(auth.superAdminRequired, sender.sendCouponById);

router.route('/admins')
    .post(auth.superAdminRequired, admins.createAdmin);
router.route('/admins/coupons')
    .get(auth.superAdminRequired, coupons.getUnapprovedCoupons);


router.route('/auth/token')
    .post(auth.loginUser);

app.use('/', router);

// handle 404
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        console.log(err);
        res.status(err.status || 500).send();
    });
}

// production error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500).send();
});

var server = app.listen(config.port);
console.log('Listening at http://localhost:%s in %s mode',
    server.address().port, app.get('env'));

module.exports = app;
