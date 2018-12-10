import * as http from "http";
import { app } from "./app";
import socket from "socket.io";
import { normalizePort } from "./utils/normalizePort"
import { handleListen } from "./utils/handlers"

app.on("error", error => {
    console.error(error)
    process.exit(1)
})

const httpServer = http.createServer(app);
const io = socket(httpServer)

httpServer.listen(normalizePort(3000));
httpServer.on("listening", () => handleListen(httpServer));

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});