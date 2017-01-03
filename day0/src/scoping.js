thisShouldWork();
console.log("typeof butNotThis: " + typeof butNotThis);

if (true) {
    var doIExist = variableLife;
}

doIExist();

var x = function howAboutMe() {
    console.log("sorry to disappoint");
};

console.log("typeof howAboutMe: " + typeof howAboutMe);
x();


// =======================================================


function thisShouldWork() {
    console.log("functions are hoisted");
}

var butNotThis = function() {
    console.log("but variables aren't");
};

function variableLife() {
    console.log("\n");
    console.log("variables exist from when they are created");
    console.log("to when the function terminates");
    console.log("\n");
}
