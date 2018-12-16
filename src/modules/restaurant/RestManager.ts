import { Restaurant } from "@entity/Restaurant";
import { AppError, commonErrors } from "@utils/errors";
import { getConnection } from "typeorm";

export const RestManager = {
    all: async () => {
        try {
            const restaurants = await Restaurant.find({ relations: [ "schedules" ] })
            return restaurants
        } catch (e) {
            throw new AppError(commonErrors.DataLayerError, "[Restaurant Manager] #all error", true, e)
        }
    },
    one: async (id: string) => {
        try {
            const restaurant = await Restaurant.findOne(id, { relations: [ "schedules" ]})
            return restaurant
        } catch (e) {
            throw new AppError(commonErrors.DataLayerError, "[Restaurant Manager] #one error", true, e)
        }
    },
    findByName: async (name: string) => {
        try {
            const restaurant = await Restaurant.findOne({ name }, { relations: [ "schedules" ] })
            return restaurant
        } catch (e) {
            throw new AppError(commonErrors.DataLayerError, "[Restaurant Manager] #one error", true, e)
        }
    },
    filterByDay: async (day: string, name: string = "") => {
        try {
            const restaurants = await getConnection()
                .createQueryBuilder()
                .select("restaurant")
                .addSelect("GROUP_CONCAT(schedule.day_of_week)", "day_of_week")
                .from(Restaurant, "restaurant")
                .innerJoin("restaurant.schedules", "schedule")
                .where("schedule.day_of_week = :day", { day })
                .andWhere("restaurant.name LIKE :name", { name: `%${name}%` })
                .addGroupBy("restaurant.name")
                .getMany()

            console.log("RESTAURANTS", restaurants)
            return restaurants
        } catch (e) {
            throw new AppError(commonErrors.DataLayerError, "[Restaurant Manager] #filter", true, e)
        }
    },
    filterByTime: async (start: string, end: string, name: string = "") => {
        try {
            const restaurants = await getConnection()
                .createQueryBuilder()
                .select("restaurant")
                .addSelect("GROUP_CONCAT(schedule.open_hour)", "opening")
                .addSelect("GROUP_CONCAT(schedule.close_hour)", "closing")
                .from(Restaurant, "restaurant")
                .innerJoin("restaurant.schedules", "schedule")
                .where("schedule.open_hour < :start", { start })
                .andWhere("schedule.close_hour > :end", { end })
                .andWhere("restaurant.name LIKE :name", { name: `%${name}%` })
                .addGroupBy("restaurant.name")
                .getMany()
            return restaurants
        } catch (e) {
            throw new AppError(commonErrors.DataLayerError, "[Restaurant Manager] #filter", true, e)
        }
    },
    filter: async (day: string, start: string, end: string, name: string = "") => {
        try {
            const restaurants = await getConnection()
                .createQueryBuilder()
                .select("restaurant")
                .addSelect("GROUP_CONCAT(schedule.day_of_week)", "day_of_week")
                .addSelect("GROUP_CONCAT(schedule.open_hour)", "opening")
                .addSelect("GROUP_CONCAT(schedule.close_hour)", "closing")
                .from(Restaurant, "restaurant")
                .innerJoin("restaurant.schedules", "schedule")
                .where("schedule.day_of_week = :day", { day })
                .andWhere("schedule.open_hour < :start", { start })
                .andWhere("schedule.close_hour > :end", { end })
                .andWhere("restaurant.name LIKE :name", { name: `%${name}%` })
                .addGroupBy("restaurant.name")
                .getMany()
            return restaurants
        } catch (e) {
            throw new AppError(commonErrors.DataLayerError, "[Restaurant Manager] #filter", true, e)
        }
    }
}