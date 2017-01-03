function makeHelloFunction() {
    var message = 'Hello, world!';
    function logMessage() {
        console.log(message);
    }
    return logMessage;
}

var sayHello = makeHelloFunction();

sayHello();
