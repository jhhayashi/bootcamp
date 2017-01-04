var express = require('express');
var app = express();

var coinState = true;

app.get('/', function (req, res) {
    res.send('Hello, World!');
});

app.get('/hello', function (req, res) {
    console.log('hello');
    res.send('hello');
});

app.get('/coin', function(req, res) {
    var randomNumber = Math.random();
    if (randomNumber > .5) {
        var coin = 'Heads';
    } else {
        var coin = 'Tails';
    }

    res.send(coin);
});

app.get('/getcoinstate', function(req, res) {
    if (coinState) {
        res.send('Heads');
    } else {
        res.send('Tails');
    }
});

app.get('/flipcoin', function(req, res) {
    coinState = !!Math.round(Math.random())
    res.send();
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
