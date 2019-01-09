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
server.on("connection", function(ws) {
    ws.on("message", function(hostname) {
        const tracer = new Traceroute();
        tracer
            .on("hop", function(hop) {
                ws.send(JSON.stringify(hop));
            })
            .on("close", function(code) {
                console.log("trace is done");
                ws.close();
            });
        tracer.trace(hostname.toString());
    });
});
webServer.listen(8080);
