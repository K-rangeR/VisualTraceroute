const WebSocket  = require("ws");
const Traceroute = require("nodejs-traceroute");
const http       = require("http");
const fs         = require("fs");

const webServer = http.createServer((request, response) => {
    fs.readFile("./index.html", (err, data) => {
        response.writeHead(200, {"Content-Type":"text/html"});
        response.write(data);
        response.end();
    });
});

const server = new WebSocket.Server({server: webServer});
server.on("connection", (ws) => {
    ws.on("message", (hostname) => {
        const tracer = new Traceroute();
        tracer
            .on("hop", (hop) => {
                if (hop.ip == "*") {
                    return;
                }
                const endpoint = "http://ip-api.com/json/" + hop.ip;
                http.get(endpoint, (resp) => {
                    let loc = "";
                    resp.on("data", (data) => loc += data);
                    resp.on("end", () => ws.send(loc));
                }).on("error", (err) => {
                    console.log("error:", err);
                });
            })
            .on("close", (code) => {
                console.log("trace is done");
                const done = {status: "done",};
                ws.send(JSON.stringify(done));
            });
        tracer.trace(hostname.toString());
    });
});
webServer.listen(8080);
