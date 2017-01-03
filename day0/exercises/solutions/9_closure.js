// Uh oh, this doesn't print as expected.
// Use a closure to make this print 0-4

for (var i = 0; i < 5; i++) {
    (function(x) {setTimeout(function() { console.log(x); }, 0);})(i)
}
