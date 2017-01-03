// NOTE: this doesn't work as a node script, since they are run as modules
console.log(this);

function whatIsThis() {
    console.log(this);
}

whatIsThis();

// =======================================

var person = {
    firstName: 'Jordan',
    lastName: 'Hayashi',
    greet: function() { console.log('Hi, ' + this.firstName) }
};

person.greet();

// =====================================

var student = {
    firstName: 'John',
    lastName: 'Doe'
};

student.greet = person.greet;

student.greet();

// ====================================

var greetPerson = person.greet;

greetPerson()

var reallyGreetPerson = person.greet.bind(person);
reallyGreetPerson();

person.greet.bind(person)();
person.greet.call(person);

// ====================================

var newPerson = {
    firstName: 'Jordan',
    lastName: 'Hayashi',
    greet: () => console.log('Hi, ' + this.firstName)
};

newPerson.greet();
newPerson.greet.call(person);
