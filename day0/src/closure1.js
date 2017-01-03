function makeFunctionArray() {
    var arr = [];

    for (var i = 0; i < 5; i++) {
        arr.push( function() {
            console.log(i);
        });
    }

    return arr;
}

var functions = makeFunctionArray();

functions[0]();
// functions.forEach((x) => x());
