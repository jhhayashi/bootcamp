fetch('asdf', function(err, result) {
    if (err) return console.log(err);
    result.extractJSON(function(err, json) {
        if (err) return console.log(err);
        document.body.innerHTML = json;
    });
});
