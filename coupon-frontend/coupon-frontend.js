const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const config = require('./app/models/config');
const routes = require('./routes/index');

var app = express();
if (app.get('env') === 'development') app.locals.dev = true;

// view engine setup
app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// log requests
if (app.locals.dev) app.use(logger('dev'));

// separate routes to external router
app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
if (app.locals.dev) {
    app.use((err, req, res, next) => {
        if (err.status !== 404) console.log(err);
        res.status(err.status || 500).send();
    });
}

app.use((err, req, res, next) => res.status(err.status || 500).send());

var server = app.listen(config.port);
console.log('Listening at http://localhost:%s in %s mode',
    server.address().port, app.get('env'));

module.exports = app;
