import socket from "socket.io";
import express from "express";

export const setupSocket = (socket: socket.Server) => 
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.io = socket;
    next();
}