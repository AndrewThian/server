import { AppError, commonErrors } from "@utils/errors";
import { Collection } from "@entity/Collection";
import { User } from "@entity/User";

export const UserCollectionManager = {
    all: async (userId: number) => {
        try {
            const user = await User.findOne(userId, {
                relations: [ "collections" ]
            })
            return user.collections
        } catch (e) {
            throw new AppError(commonErrors.DataLayerError, "[Collection Manager] #all error", true, e)
        }
    },
    one: async (userId: number, collectionId: number) => {
        try {
            const user = await User.findOne(userId)
            const collection = await Collection.findOne({ user, id: collectionId }, {
                relations: [ "restaurants" ]
            })
            return collection
        } catch (e) {
            throw new AppError(commonErrors.DataLayerError, "[Collection Manager] #one error", true, e)
        }
    },
    add: async (userId: number, name: string) => {
        try {
            const user = await User.findOne(userId)
            const collection = await Collection.findOne({ user, name })

            if (collection) {
                // return collection
                return [200, collection]
            } else {
                // add to database
                const newCollection = new Collection();
                newCollection.name = name;
                newCollection.user = user;
                return [201, await Collection.save(newCollection)];
            }
        } catch (e) {
            throw new AppError(commonErrors.DataLayerError, "[Collection Manager] #add error", true, e)
        }
    }
}