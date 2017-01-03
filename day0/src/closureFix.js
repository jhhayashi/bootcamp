function makeFunctionArray() {
    var arr = [];

    for (var i = 0; i < 5; i++) {
        arr.push(
            (function(x) {
                return function() {
                    console.log(x);
                }
            })(i)
        );
    }

    return arr;
}

var functions = makeFunctionArray();

functions.forEach((x) => x());
