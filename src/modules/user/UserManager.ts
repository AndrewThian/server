import { User } from "@entity/User";
import { AppError, commonErrors } from "@utils/errors";

export const UserManager = {
    all: async () => {
        try {
            const users = await User.find();
            return users
        } catch (e) {
            throw new AppError(commonErrors.DataLayerError, "[User Manager] #all error", true, e)
        }
    },
    one: async (id: number) => {
        try {
            const user = await User.findOne(id)
            return user
        } catch (e) {
            throw new AppError(commonErrors.DataLayerError, "[User Manager] #one error", true, e)
        }
    },
    add: async (username: string) => {
        try {
            const user = await User.findOne({ username })
            if (user) {
                return [200, user]
            }
            let newUser = User.create({ username })
            return [201, await User.save(newUser)]
        } catch (e) {
            throw new AppError(commonErrors.DataLayerError, "[User Manager] #one error", true, e)
        }
    },
    delete: async (id: number) => {
        try {
            const user = await User.findOne(id)
            if(!user) {
                throw new AppError(commonErrors.DataNotFound, "user not found", true)
            }
            await user.remove()
        } catch (e) {
            throw e
        }
    }
}