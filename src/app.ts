import express from "express";
import helmet from "helmet";
import cors from "cors";
import logger from "morgan";
// db connection
import connections from "@utils/connections";
import { UserRouter } from "@modules/user/UserRouter";
import { RestRouter } from "@modules/restaurant/RestRouter";
import { UserCollectionRouter } from "@modules/userCollection/UserCollectionRouter";
import { CollectionItemRouter } from "@modules/collectionItem/CollectionItemRouter";
import { CollectionRouter } from "@modules/collection/CollectionRouter";

class AppServer {
    public app: express.Application;
    public user: express.Router;
    public restaurant: express.Router;
    public collection: express.Router;
    public userCollection: express.Router;
    public collectionItem: express.Router;

    constructor() {
        this.app = express();

        this.user = new UserRouter().router;
        this.restaurant = new RestRouter().router;
        this.collection = new CollectionRouter().router;
        this.userCollection = new UserCollectionRouter().router;
        this.collectionItem = new CollectionItemRouter().router;

        this.connectDB().catch(this.handleError.bind(this))
        this.config();
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
        this.app.get("/", async (_, res) => {
            res.status(200).json({
                app: "restfulrant-api",
                env: `${process.env.NODE_ENV}`,
                time: Date.now()
            })
        })

        this.app.use("/users", this.user)
        this.app.use("/users/:id/collections", this.userCollection)
        this.app.use("/collections", this.collection)
        this.app.use("/collections/:id/restaurants", this.collectionItem)
        this.app.use("/restaurants", this.restaurant)
    }

    private handleError (error: Error) {
        this.app.emit("error", error)
    }
}

export const app = new AppServer().app