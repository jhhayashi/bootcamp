const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const config = require('./app/models/config');
const students = require('./app/models/students');

var app = express();

// https://expressjs.com/en/api.html#app.locals
// "You can access local variables in templates rendered within the application"
if (app.get('env') === 'development') app.locals.dev = true;

// set view engine for template engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'app', 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// log requests
if (app.locals.dev) app.use(logger('dev'));

// ====================================================
// Helpers
// ====================================================

// http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function randomize(arr) {
    var curr = arr.length, temp, rand;

    while (curr) {
        rand = Math.floor(Math.random() * curr);
        curr -= 1;
        temp = arr[curr];
        arr[curr] = arr[rand];
        arr[rand] = temp;
    }

    return arr;
}

function assignPairs(arr) {
    var pairs = [];
    var i = arr.length - 1;

    while (i > 2) {
        var newArr = [arr[i], arr[i - 1]];
        pairs.push(newArr);
        i -= 2;
    }

    pairs.push(arr.slice(0, i + 1));
    return pairs;
}

// ====================================================
// Routes
// ====================================================

app.get('/', function(req, res) {
    var message = "I'm working!";
    return res.render('test', { message: message });
});

// randomizes students and sends students array to the partners template
// TODO randomize students on the server (here) or on the client (within the
// template)
app.get('/partners', function(req, res) {
    var paired = assignPairs(randomize(students));
    return res.render('partners', { students: paired });
});

// TODO add an endpoint called /coldcaller that displays a random student

app.get('/coldcaller', function(req, res) {
    var unluckyStudent = students[Math.floor(Math.random() * students.length)];
    return res.render('coldcaller', { student: unluckyStudent });
});

// TODO if you finish early, add a refresh button at the /partners and 
// /coldcaller pages that will display different parings or a different student
// without actually refreshing the page

// TODO if you finish all of the above early, work on styling the pages using
// stylus

// catch 404 and pass to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
if (app.locals.dev) {
    app.use(function(err, req, res, next) {
        console.log(err.message);
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
