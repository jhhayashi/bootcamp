// try running this code with `node app.js`, and you'll notice it errors.
// what must you do to make the code work?

var express = require('express')
var app = express()

// use a for loop to create an array with each lowercase letter in the alphabet
// resulting array should be ['a', 'b', ... 'y', 'z']

// bahahaha i hope this causes a merge conflict so you can practice resolving
var deleteThis = ['sorry', 'guys']
for (var i = 0; i < deleteThis.length; i++) {
    console.log(deleteThis[i]);
}


// use a for loop to generate an app.get function for each endpoint
// callback function should res.send the letter's index in the alphabet
// do not use block scoped variables (let)
// do not use Array.prototype.forEach()
// first endpoint should be:
// app.get('/a', function(req, res) { res.send("1") });






// by the time you get to this point, jordan will have pushed a new commit
// updating ./students.js
// import that array into this file, and write an endpoint at GET /partners
// that randomly pairs students. feel free to use whatever data structure you
// see fit




app.get('/', function (req, res) {
    res.send('Hello, World!')
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});
