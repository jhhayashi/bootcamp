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
    return res.render('partners', { students: students });
});

// TODO add an endpoint called /coldcaller that displays a random student

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
