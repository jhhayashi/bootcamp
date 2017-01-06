const User = require('../models/schemas/user');

module.exports.createUser = function(req, res) {
    // validate input
    
    // create actual user
    var data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        createdDate: new Date()
    };

    var newUser = new User(data);

    newUser.save(function(err, user) {
        return res.send('it worked!!!');
    });
}

module.exports.getUsers = function(req, res, next) {
    User.find({}, function(uhoh, anarrayofusers) {
        if (uhoh) return next(uhoh);
        return res.json(anarrayofusers);
    });
}

module.exports.getUserById = function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
        if (err) return next(err);
        if (!user)
            return res.status(404).send('user not found');
        return res.json(user);
    });
}

module.exports.updateUser = function(req, res, next) {
    User.findOneAndUpdate(req.params.id, req.body,
            { new: true }, function(err, user) {
        if (err) return next(err);
        if (!user) return res.status(404).send('No user with that ID');
        return res.json(user);
    });
}

module.exports.deleteUserById = function(req, res, next) {
    User.findOneAndRemove(req.params.id, function(err, user) {
        if (err) return next(err);
        if (!user)
            return res.status(404).send('No user with that ID');
        return res.sendStatus(200);
    });
}
