const nodemailer = require('nodemailer');
const User = require('../models/schemas/user');
const Coupon = require('../models/schemas/coupon');
const config = require('../models/config');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.emailFromAddress,
        pass: config.emailPassword
    }
});

exports.sendCouponById = function(req, res, next) {
    return res.sendStatus(200);
};

exports.sendAllCouponsToAllUsers = function(req, res, next) {
    return res.sendStatus(200);
};


function buildEmailArray(users) {
    var emails = [];
    for (var i = 0; i < users.length; i++) {
        let u = users[i];
        let email = '';
        if (!u.phoneProvider) continue;
        let providerDomain = getProviderDomain(u.phoneProvider);
        if (!providerDomain) continue;
        if (u.phoneProvider === 'tmobile') email += '1';
        email += u.phone;
        email += providerDomain;
        emails.push(email);
    }
    return emails;
}

function getProviderDomain(provider) {
    for (var i = 0; i < config.providers.length; i++) {
        if (provider === config.providers[i].name)
            return config.providers[i].sms;
    }
    return '';
}
