// In an alternate universe, coins have a `true` and a `false` side.
// Write code that first gets a user via a getUser() call, then in the callback,
// flips a coin and tells the user whether or not their guess was correct

function coinToss(guess, callback) {
    var result = Math.round(Math.random());
    var didWin = (guess === result);
    callback(didWin);
}

function getUser(callback) {
    var user = {
        firstName: 'John',
        lastName: 'Doe',
        guess: Math.round(Math.random())
    };
    callback(user);
}
