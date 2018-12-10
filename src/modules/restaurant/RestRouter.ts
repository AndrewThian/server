import { Router, Response, NextFunction } from "express";
import { Request } from "express-serve-static-core";
import { RestManager } from "./RestManager";

export class RestRouter {
    public router: Router
    public manager: typeof RestManager

    constructor() {
        this.router = Router();
        this.manager = RestManager;

        this.routes()
    }

    routes () {
        this.router.get("/", async (req: Request, res: Response, next: NextFunction) => {
            const { name } = req.query
            try {
                if (name) {
                    const data = await this.manager.findByName(name)
                    res.status(200).json([data])
                } else {
                    const data = await this.manager.all()
                    res.status(200).json(data)
                }
            } catch (e) {
                next(e)
            }
        })
    }
}