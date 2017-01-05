var userDb = [];
var idCounter = 0;

userDb.insertUser = function(user, callback) {
    user.id = idCounter;
    idCounter++;
    this.push(user);

    callback();
};

userDb.getUserById = function(id, callback) {
    for (var i = 0; i < this.length; i++) {
        if (+id === this[i].id) {
            callback(this[i]);
        }
    }
};

module.exports.createUser = function(req, res) {
    // validate input
    
    // create actual user
    var newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        createdDate: new Date()
    };

    // store the user
    userDb.insertUser(newUser, function() {
        return res.send('it worked!!!!!');
    });
}

module.exports.getUsers = function(req, res) {
    return res.send(userDb);
}

module.exports.getUserById = function(req, res) {
    userDb.getUserById(req.params.id, function(user) {
        return res.json(user);
    });
}
