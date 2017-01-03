function login(req, res, callback) {

    User.findOne({email: req.body.email}).exec()
    .then(function(user) {
        return user.comparePassword(req.body.password);
    }).then(function(isMatch) => {
        if (!isMatch)
            return res.status(401).send('Incorrect password');

        // add relevant data to token
        var payload = {
            id: user._id,
            email: user.email,
            companyName: user.companyName,
        };

        return jwt.sign(payload, config.secret, {})
    }).then(function(token) {
        user.token = token;
        return user.save().then(function() { res.json(token) });
    }).catch(function(err) { return callback(err) })
};
