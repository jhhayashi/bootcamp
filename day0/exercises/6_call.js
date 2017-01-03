// The variable arguments is a object that contains the parameters passed to a
// function. It is not an array, but it has an array-link structure.
// Use call() and Array.prototype.reduce() to output "Hello, world!"

var notArr;

function populateNotArr() {
    notArr = arguments;
}

populateNotArr('Hello', ',', ' ', 'world', '!')

console.log(notArr);
