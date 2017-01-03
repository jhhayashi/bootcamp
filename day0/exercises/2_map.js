// complete the implementation of triple and map such that
// [0,3,6,9,12] is printed

var arr = [0,1,2,3,4];

var triple = function(x) { return x * 3; };

Array.prototype.map = function(f) {
    var newArr =[];
    
    for (var i = 0; i < this.length; i++) {
        newArr.push(f(this[i]));
    }
    return newArr;
};

var newArr = arr.map(triple);
console.log(newArr);
