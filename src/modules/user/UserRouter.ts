import { Request, Router, Response, NextFunction } from "express";
import { UserManager } from "./UserManager";
import { commonErrors, AppError } from "@utils/errors";

/**
 * users/{:userId}
 */

export class UserRouter {
    public router: Router
    public manager: typeof UserManager

    constructor() {
        this.router = Router();
        this.manager = UserManager;

        this.routes()
    }

    routes () {
        this.router.get("/", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const data = await this.manager.all();
                res.status(200).json(data)
            } catch (e) {
                next(e)
            }
        })
        this.router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
            const { id } = req.params
            try {
                const data = await this.manager.one(id)
                res.status(200).json(data)
            } catch (e) {
                next(e)
            }
        })
        this.router.post("/", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { email } = req.body
                if (!email) {
                    return next(new AppError(commonErrors.MissingDataError, "missing email", true))
                }
                const [code, data] = await this.manager.add(email)
                res.status(code as number).json(data)
            } catch (e) {
                next(e)
            }
        })
        this.router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
            const { id } = req.params
            try {
                await this.manager.delete(id)
                res.status(200).json({ message: "OK" })
            } catch (e) {
                next(e)
            }
        })
    }
}