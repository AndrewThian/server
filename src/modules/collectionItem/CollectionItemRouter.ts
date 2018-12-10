import { Router, Request, Response, NextFunction } from "express";
import { CollectionItemManager } from "./CollectionItemManager";
import { AppError, commonErrors } from "@utils/errors";

export class CollectionItemRouter {
    public router: Router
    public manager: typeof CollectionItemManager

    constructor() {
        this.router = Router({ mergeParams: true });
        this.manager = CollectionItemManager;

        this.routes();
    }

    routes () {
        this.router.post("/", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { id: collectionId } = req.params
                const { restaurantId } = req.body;
                if (!restaurantId) {
                    throw new AppError(commonErrors.MissingDataError, "missing restaurantId", true)
                }
                const item = await this.manager.add(collectionId, restaurantId)
                res.status(201).json(item)
            } catch (e) {
                next(e)
            }
        })
    }
}