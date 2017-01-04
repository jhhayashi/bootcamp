const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

var app = express();
var idTracker = 1;

// log requests
app.use(logger('dev'));
// create req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// call this function to create new ids

function genId() {
    return idTracker++;
}

// create a REST API for your users db, defined below:
var users = [
    {
        id: 0,
        name: 'John Doe',
        email: 'john@doe.com',
        password: 'asdf'
    }
];

// clients should be able to create new users, get all users, get a single user,
// update a user, and delete a user

app.get('/users', (req, res, next) => res.json(users));
app.get('/users/:id', (req, res, next) => {
    for (var i = 0; i < users.length; i++) {
        if (users[i].id === +req.params.id)
            return res.json(users[i]);
    }
    return res.status(404).send('No user with that ID');
});

app.post('/users', (req, res, next) => {
    if (typeof req.body.name !== 'string')
        return res.status(400).send('Missing name');
    if (typeof req.body.email !== 'string')
        return res.status(400).send('Missing email');
    if (typeof req.body.password !== 'string')
        return res.status(400).send('Missing password');

    var newUser = {
        id: genId(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    users.push(newUser);
    return res.sendStatus(200);
});

app.put('/users/:id', (req, res, next) => {
    for (var i = 0; i < users.length; i++) {
        if (users[i].id === +req.params.id) {
            users[i].name = req.body.name || users[i].name;
            users[i].email= req.body.email || users[i].email;
            users[i].password = req.body.password || users[i].password;
            return res.sendStatus(200);
        }
    }
    return res.status(404).send('No user with that ID');
});

app.delete('/users/:id', (req, res, next) => {
    for (var i = 0; i < users.length; i++) {
        if (users[i].id === +req.params.id) {
            users.splice(i, 1);
            return res.sendStatus(200);
        }
    }
    return res.status(404).send('No user with that ID');
});


var server = app.listen(3000);
console.log('Listening at http://localhost:%s in %s mode',
    server.address().port, app.get('env'));

module.exports = app;
