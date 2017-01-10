fetch('http://projects.jordanhayashi.com/echo')
.then(function(response) {
    return response.json();
}).then(function(json) {
    document.body.innerHTML = json;
})
.catch(function(err) {
    console.log(err);
);
