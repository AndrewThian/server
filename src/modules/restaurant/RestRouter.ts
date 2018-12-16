import { Router, Response, NextFunction } from "express";
import { Request } from "express-serve-static-core";
import { RestManager } from "./RestManager";
import { Restaurant } from "@entity/Restaurant";
import { Schedule } from "@entity/Schedule";

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
        this.router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { id } = req.params
                const data = await this.manager.one(id)
                res.status(200).json(data)
            } catch (e) {
                next(e)
            }
        })
        this.router.get("/filter", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { day, hour, name } = req.query;
                let restaurants: Restaurant[] = [];
                if (!day) {
                    restaurants = await this.manager.filterByTime(hour, hour, name)
                } else if (!hour) {
                    restaurants = await this.manager.filterByDay(day, name)
                } else if (day && hour) {
                    restaurants = await this.manager.filter(day, hour, hour, name)
                }
                res.status(200).json(restaurants)
            } catch (e) {
                next(e)
            }
        })
    }
}