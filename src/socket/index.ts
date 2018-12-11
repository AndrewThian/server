import socket from "socket.io"
import http from "http"
import express from "express";

export class SocketIO {
    public io: socket.Server;

    constructor(public server: http.Server, app: express.Application) {
        this.io = socket(server);

        this.io.on("connection", (socket) => {
            socket.on("chat message", msg => {
                socket.emit("chat message", msg)
            })
        })

        app.use((_: express.Request, res: express.Response, next: express.NextFunction) => {
            res.io = this.io
            next()
        })
    }
}