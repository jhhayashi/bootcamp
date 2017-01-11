const User = require('../models/schemas/user');
const jwt = require('jwt-simple');
const config = require('../models/config');

exports.loginUser = function(req, res, next) {
    if (typeof req.body.email !== 'string')
        return res.status(400).send('Missing email');
    if (typeof req.body.password !== 'string')
        return res.status(400).send('Missing password');

    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) return next(err);
        if (!user) return res.status(400).send('No user with that email');
        if (!user.isAdmin && !user.isSuperAdmin)
            return res.status(403).send('No admin with that email');

        user.comparePassword(req.body.password, function(err, isMatch) {
            if (err) return next(err);
            if (!isMatch) return res.status(401).send('Incorrect password');

            var payload = {
                id: user._id,
                email: user.email,
                companyName: user.companyName
            };

            var token = jwt.encode(payload, config.secret);

            user.token = token;

            user.save(function(err) {
                if (err) return next(err);
                return res.json({token: token});
            });
        });
    });
};

exports.adminRequired = function(req, res, next) {
};

exports.superAdminRequired = function(req, res, next) {
};
