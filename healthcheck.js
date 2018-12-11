var http = require("http");

var options = {
    timeout: 2000,
    host: "localhost",
    port: process.env.PORT || 3000,
    path: "/health"
}

var request = http.request(options, res => {
    console.log("STATUS: " + res.statusCode)
    process.exitCode = (res.statusCode === 200) ? 0 : 1
    process.exit();
})

request.on("error", err => {
    console.log("ERROR: " + err);
    process.exit(1)
})

request.end();