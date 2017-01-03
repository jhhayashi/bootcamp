// complete the implementation of sum and reduce such that reducing an array
// returns the sum of its values
// [0,1,2,3].fold(sum, 0) === 6

var arr = [0,1,2,3,4];

var sum = function(x, y) { return x + y; };

Array.prototype.reduce = function(f, inital) {
    var acc = initial;
    for (var i = 0; i < this.length; i++) {
        acc = f(acc, this[i]);
    }
    return acc;
};

var total = arr.reduce(sum, 0);
console.log(total);
