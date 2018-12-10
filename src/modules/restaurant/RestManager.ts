import { Restaurant } from "@entity/Restaurant";
import { AppError, commonErrors } from "@utils/errors";

export const RestManager = {
    all: async () => {
        try {
            const restaurants = await Restaurant.find({ relations: [ "schedules" ] })
            return restaurants
        } catch (e) {
            console.log(e)
            throw new AppError(commonErrors.DataLayerError, "[Restaurant Manager] #all error", true, e)
        }
    },
    findByName: async (name: string) => {
        try {
            const restaurant = await Restaurant.findOne({ name }, { relations: [ "schedules" ] })
            return restaurant
        } catch (e) {
            throw new AppError(commonErrors.DataLayerError, "[Restaurant Manager] #one error", true, e)
        }
    }
}