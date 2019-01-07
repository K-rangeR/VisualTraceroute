const WebSocket = require("ws");
const http      = require("http");
const fs        = require("fs");

const webServer = http.createServer(function(request, response) {
    fs.readFile("./index.html", function(err, data) {
        response.writeHead(200, {"Content-Type":"text/html"});
        response.write(data);
        response.end();
    });
});

const server = new WebSocket.Server({server: webServer});
server.on("connection", function conn(ws) {
    ws.on("message", function incoming(msg) {
        console.log(msg);
    });
    for (let i = 0; i < 10; i++) {
        ws.send("hello world");
    }
    ws.close();
});

webServer.listen(8080);
