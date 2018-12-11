import http from "http";
import socket from "socket.io";
import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import logger from "morgan";
import { SocketIO } from "./socket"
// db connection
import connections from "@utils/connections";
import { UserRouter } from "@modules/user/UserRouter";
import { RestRouter } from "@modules/restaurant/RestRouter";
import { UserCollectionRouter } from "@modules/userCollection/UserCollectionRouter";
import { CollectionItemRouter } from "@modules/collectionItem/CollectionItemRouter";
import { CollectionRouter } from "@modules/collection/CollectionRouter";

class AppServer {
    public app: express.Application;
    public server: http.Server;
    public io: socket.Server;
    public user: express.Router;
    public restaurant: express.Router;
    public collection: express.Router;
    public userCollection: express.Router;
    public collectionItem: express.Router;

    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = new SocketIO(this.server, this.app).io

        this.config();
        this.connectDB().catch(console.error);

        this.user = new UserRouter().router;
        this.restaurant = new RestRouter().router;
        this.collection = new CollectionRouter().router;
        this.userCollection = new UserCollectionRouter().router;
        this.collectionItem = new CollectionItemRouter().router;

        this.routes();
    }

    async connectDB () {
        await connections.db();
    }

    public config() {
        this.app.use(logger("dev"))
        this.app.use(helmet()) // lightweight header checks
        this.app.use(cors()) // cross-origin-headers
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private routes () {
        this.app.get("/", this.indexRoute.bind(this))
        this.app.use("/users", this.user)
        this.app.use("/users/:id/collections", this.userCollection)
        this.app.use("/collections", this.collection)
        this.app.use("/collections/:id/restaurants", this.collectionItem)
        this.app.use("/restaurants", this.restaurant)
    }

    private async indexRoute (req: Request, res: Response, next: NextFunction) {
        //@ts-ignore
        res.io.emit("chat message", "hi there from index route")
        res.status(200).json({
            app: "restfulrant-api",
            env: `${process.env.NODE_ENV}`,
            time: Date.now()
        })
    }
}

export const server =  new AppServer().server