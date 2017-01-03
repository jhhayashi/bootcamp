// complete the following such that a new array with only integers
// (while numbers) is returned

var arr = ['hello', 42, true, function() {}, "123", 3.14, 0, [1], {}];

var isInteger = function(x) {
    return typeof x === 'number' && !isNaN(x) && x % 1 === 0;
};

Array.prototype.filter = function(f) {
    var newArr = [];

    for (var i = 0; i < this.length; i++) {
        if ( f(this[i]) ) {
            newArr.push(this[i]);
        }
    }
    return newArr;
};

var newArr = arr.filter(isInteger);
console.log(newArr);
