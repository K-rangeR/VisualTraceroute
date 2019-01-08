const WebSocket  = require("ws");
const Traceroute = require("nodejs-traceroute");
const http       = require("http");
const fs         = require("fs");

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
        const tracer = new Traceroute();
        tracer
            .on("hop", function(hop) {
                ws.send(JSON.stringify(hop));
            })
            .on("close", function(code) {
                ws.close();
            });
        tracer.trace(msg.toString());
    });
});
webServer.listen(8080);
