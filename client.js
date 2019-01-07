document.getElementById("btn").addEventListener("click", function() {
    var heading = document.getElementById("url");
    var results = document.getElementById("results");
    var socket = new WebSocket("ws://localhost:8080/");

    socket.onopen = function(event) {
        heading.innerHTML = event.currentTarget.url;
    };

    socket.onerror = function(error) {
        heading.innerHTML = error;
    };

    socket.onmessage = function(event) {
        results.innerHTML += "<li>" + event.data + "</li>";
    };

    socket.onclose = function(event) {
        heading.innerHTML = "Connection is closed";
    };
});
