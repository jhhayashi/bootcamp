function one() {
    console.log('one!');
    two();
}

function two() {
    console.log('two!');
    three();
}

function three() {
    throw new Error('Something went wrong in three!');
}

one();
