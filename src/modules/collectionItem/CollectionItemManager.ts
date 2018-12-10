import { Collection } from "@entity/Collection";
import { getManager } from "typeorm";
import { Restaurant } from "@entity/Restaurant";

export const CollectionItemManager = {
    add: async(collectionId: number, restaurantId: number) => {
        const collection = await getManager()
            .createQueryBuilder(Collection, "collection")
            .innerJoinAndSelect("collection.restaurants", "restaurant")
            .where("collection.id = :collectionId", { collectionId })
            .andWhere("NOT restaurant.id = :restaurantId", { restaurantId })
            .getOne()
    
        if (collection) {
            const restaurant = await Restaurant.findOne(restaurantId)
            collection.restaurants.push(restaurant)
            console.log(collection.restaurants)
            return Collection.save(collection)
        }
    }
}