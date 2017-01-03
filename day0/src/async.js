function printOne() {
    console.log('1');
}

function printTwo() {
    console.log('2');
}

function printThree() {
    console.log('3');
}

setTimeout(printOne, 1000);
setTimeout(printTwo, 0);
printThree();
