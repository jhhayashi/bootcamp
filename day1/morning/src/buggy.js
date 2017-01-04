function returnPerson() {
    return {
        firstName: 'Jordan',
        lastName: 'Hayashi'
    };
}

function greetPerson() {
    var person = returnPerson();
    console.log('Hello, ' + person.firstName);
}

greetPerson();
