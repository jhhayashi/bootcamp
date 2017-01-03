var int1 = 42;
var int2 = int1;
int2 = 50;

console.log('int1: ' + int1);
console.log('int2: ' + int2);

var obj1 = {};
var obj2 = obj1;
obj2.test = 'test';

console.log(JSON.stringify(obj1));

obj2.arr = [];

var x = obj2.arr;
x.push(1);

console.log(JSON.stringify(obj1));
