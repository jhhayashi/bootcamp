function hang(seconds) {
    var now = new Date().getTime();
    while(new Date().getTime() < now + seconds) {}
}
