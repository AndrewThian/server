/// <reference types="@types/socket.io" />

declare namespace Express {
    interface Response {
        io?: SocketIO.Server
    }
}