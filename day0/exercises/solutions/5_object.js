// complete the function such that it returns true if an object or any of its
// subobjects has any falsy values
// HINT: recursion may help here

function hasFalsyValue(obj) {
    if (typeof obj === 'string' && obj) return false;
    if (!obj) return true;
    for (var p in obj) {
        if (hasFalsyValue(obj[p])) return true;
    }
    return false;
}


// tests
console.assert(hasFalsyValue({sadf: false}));
console.assert(hasFalsyValue({
    asdf: {
        asfd: false
    }
}));
console.assert(!hasFalsyValue({
    asdf: {
        asd: []
    },
    a: "asdf",
    b: {
        a: [1,2,3]
    }
}));
console.assert(hasFalsyValue({
    asdf: {
        asd: []
    },
    a: "asdf",
    b: {
        a: [1,2,3,0]
    }
}));
