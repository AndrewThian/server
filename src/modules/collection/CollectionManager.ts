import { Collection } from "@entity/Collection";
import { commonErrors, AppError } from "@utils/errors";

export const CollectionManager = {
    one: async (collectionId: number) => {
        try {
            const collection = await Collection.findOne(collectionId, {
                relations: [ "restaurants", "restaurants.schedules" ]
            })
            if (!collection) {
                throw new AppError(commonErrors.DataNotFound, "collection not found", true)
            }
            return collection
        } catch (e) {
            throw e
        }
    },
    update: async (collectionId: number, name: string) => {
        try {
            const collection = await Collection.findOne(collectionId)
            if (!collection) {
                throw new AppError(commonErrors.DataNotFound, "collection not found", true)
            }
            await Collection.update(collection, { name })
        } catch (e) {
            throw e
        }
    },
    delete: async (collectionId: number) => {
        try {
            const collection = await Collection.findOne(collectionId)
            if(!collection) {
                throw new AppError(commonErrors.DataNotFound, "collection not found", true)
            }
            await collection.remove()
        } catch (e) {
            throw e
        }
    },   
}