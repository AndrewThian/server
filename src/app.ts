import express from "express";
import helmet from "helmet";
import cors from "cors";
import logger from "morgan";
// db connection
import connections from "./utils/connections";

class AppServer {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config().catch(this.handleError.bind(this))
        this.routes();
    }

    async config () {
        await connections.db();
        this.app.use(logger("dev"))
        this.app.use(helmet()) // lightweight header checks
        this.app.use(cors()) // cross-origin-headers
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(express.json())
    }

    private routes () {
        this.app.get("/", async (_, res) => {
            res.status(200).json({
                app: "restfulrant-api",
                env: `${process.env.NODE_ENV}`,
                time: Date.now()
            })
        })
    }

    private handleError (error: Error) {
        this.app.emit("error", error)
    }
}

export const app = new AppServer().app