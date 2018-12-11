/// <reference types="@types/socket.io" />

declare namespace NodeJS {
    interface Global {
        appRoot: string;
        envConfig: any;
    }
}

declare namespace Express {
    interface Response {
        io?: SocketIO.Server
    }
}