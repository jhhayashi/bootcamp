// try running this code with `node app.js`, and you'll notice it errors.
// what must you do to make the code work?

var express = require('express')
var app = express();

var students = require('./students');

// use a for loop to create an array with each lowercase letter in the alphabet
// resulting array should be ['a', 'b', ... 'y', 'z']

var letters = [];

// http://stackoverflow.com/questions/12504042/what-is-a-method-that-can-be-used-to-increment-letters
for (var i = 'a'; i <= 'z'; i = String.fromCharCode(i.charCodeAt() + 1))
    letters.push(i);

// use a for loop to generate an app.get function for each endpoint
// callback function should res.send the letter's index in the alphabet
// do not use block scoped variables (let)
// do not use Array.prototype.forEach()
// first endpoint should be:
// app.get('/a', function(req, res) { res.send("1") });

for (var i = 0; i < letters.length; i++) {
    (function(letter, index) {
        return app.get('/' + letter, function(req, res) { res.send(index.toString()); });
    })(letters[i], i + 1)
}




// by the time you get to this point, jordan will have pushed a new commit
// updating ./students.js
// import that array into this file, and write an endpoint at GET /partners
// that randomly pairs students. feel free to use whatever data structure you
// see fit

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

app.get('/partners', function(req, res) {
    var x = assignPairs(randomize(students));
    return res.json(x);
});


app.get('/', function (req, res) {
    res.send('Hello, World!')
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});
