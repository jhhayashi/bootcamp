var o = new Object();
o.firstName = 'Jordan';
o.lastName = 'Hayashi';
o.isTeachingRn = true;
o.age = 22;
o.greet = function() { console.log('Hello!'); };

console.log(JSON.stringify(o));

var o2 = {};
o2['firstName'] = 'Jordan';
var a = 'lastName';
o2[a] = 'Hayashi';

var o3 = {
    firstName: 'Jordan',
    lastName: 'Hayashi',
    greet: function() {
        console.log('hi');
    },
    address: {
        street: "Main st.",
        number: '111'
    }
};
