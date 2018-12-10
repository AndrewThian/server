import { UserCollectionManager } from "./UserCollectionManager";
import { Router, Request, Response, NextFunction } from "express";
import { AppError, commonErrors } from "@utils/errors";

export class UserCollectionRouter {
    public router: Router
    public manager: typeof UserCollectionManager

    constructor() {
        this.router = Router({ mergeParams: true });
        this.manager = UserCollectionManager
        
        this.routes()
    }

    routes () {
        this.router.get("/", async (req: Request, res: Response, next: NextFunction) => {
            const { id: userId } = req.params
            try {
                const data = await this.manager.all(userId)
                res.status(200).json(data)
            } catch (e) {
                next(e)
            }
        })
        this.router.get("/:collectionId", async (req: Request, res: Response, next: NextFunction) => {
            const { id: userId, collectionId } = req.params
            try {
                const data = await this.manager.one(userId, collectionId)
                res.status(200).json(data)
            } catch (e) {
                next(e)
            }
        })
        this.router.post("/", async (req: Request, res: Response, next: NextFunction) => {
            const { id: userId } = req.params
            const { name } = req.body
            if (!name) {
                return next(new AppError(commonErrors.MissingDataError, "missing name", true))
            }
            try {
                const [code, data] = await this.manager.add(userId, name)
                res.status(code as number).json(data)
            } catch (e) {
                next(e)
            }
        })
    }
}