import { CollectionManager } from "./CollectionManager";
import { Router, Request, Response, NextFunction } from "express";
import { AppError, commonErrors } from "@utils/errors";

export class CollectionRouter {
    public router: Router
    public manager: typeof CollectionManager
    
    constructor() {
        this.router = Router();
        this.manager = CollectionManager;

        this.routes()
    }

    routes () {
        this.router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { id }  = req.params
                const data = await this.manager.one(id)
                res.status(200).json(data)
            } catch (e) {
                next(e)
            }
        })
        this.router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { id } = req.params
                const { name } = req.body
                if (!name) {
                    throw new AppError(commonErrors.MissingDataError, "missing name in body", true)
                }
                await this.manager.update(id, name) 
                res.status(201).json({ message: "OK" })
            } catch (e) {
                next(e)
            }
        })
    }
}