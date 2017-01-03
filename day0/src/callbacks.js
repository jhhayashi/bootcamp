function getUserFromDatabase(callback) {
    // simulates getting data from db
    setTimeout(() => callback({ firstName: 'Jordan', lastName: 'Hayashi'}), 1000);
}

function greetUser() {
    getUserFromDatabase(function(user) {
        console.log('Hi, ' + user.firstName);
    });
}

greetUser();
