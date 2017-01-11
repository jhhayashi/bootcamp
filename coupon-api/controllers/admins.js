const User = require('../models/schemas/user');
const bcrypt = require('bcrypt-nodejs');

exports.createAdmin = function(req, res, next) {
    if (typeof req.body.email !== 'string')
        return res.status(400).send('Missing email');
    if (typeof req.body.password !== 'string' && typeof req.body.hash !== 'string')
        return res.status(400).send('Missing password');
    if (typeof req.body.companyName !== 'string')
        return res.status(400).send('Missing companyName');

    var userData = {companyName: req.body.companyName};
    if (req.body.firstName && typeof req.body.firstName === 'string')
        userData.firstName = req.body.firstName;
    if (req.body.lastName && typeof req.body.lastName === 'string')
        userData.lastName = req.body.lastName;
    if (typeof req.body.classYear !== 'undefined' && +req.body.classYear)
        userData.classYear = +req.body.classYear;

    // check phone provider
    // TODO notify webmaster to handle new provider
    if (req.body.phoneProvider && req.body.phoneProvider === 'other') {
        if (typeof req.body['other-provider'] !== 'string')
            return res.status(400).send('Missing other-provider');
        userData.phoneProvider = req.body['other-provider'];
    } else if (req.body.phoneProvider)
        userData.phoneProvider = req.body.phoneProvider;

    // validate phone
    if (req.body.phone) {
        var phone = '';
        for (var i = 0; i < req.body.phone.length; i++) {
            if (!isNaN(req.body.phone[i]) && req.body.phone[i] !== ' ')
                phone += req.body.phone[i];
        }
        if (phone.length !== 10)
            return res.status(400).send('Invalid phone');
        userData.phone = phone;
    }
    
    // validate email
    // http://emailregex.com
    if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(req.body.email)))
        return res.status(400).send('Invalid email');
    else
        userData.email = req.body.email;

    if (req.body.interests)
        userData.interests = req.body.interests;
    if (req.body.isAdmin)
        userData.isAdmin = !!req.body.isAdmin;
    if (req.body.isSuperAdmin)
        userData.isSuperAdmin = !!req.body.isSuperAdmin;
    if (req.body.password)
        userData.hash = req.body.password;
    if (req.body.hash)
        userData.hash = req.body.hash;

    // hash pw, since mongoose findOneAndUpdate bypasses hooks
    // https://github.com/Automattic/mongoose/issues/964
    userData.hash = bcrypt.hashSync(userData.hash);

    if (userData.phone)
        var userQuery = {$or: [{email: userData.email}, {phone: userData.phone}]};
    else
        var userQuery = {email: userData.email};

    User.findOneAndUpdate(userQuery, userData, {upsert:true}, (err, user) => {
        if (err) {
            if (err.code === 11000)
                return res.status(400).send('Email or phone number already registered');    
            return next(err);
        }
        return res.sendStatus(200);
    });
};
