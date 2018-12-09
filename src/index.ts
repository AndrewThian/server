import { dbConnection } from "./utils/dbConnection";

(async () => {
    await dbConnection()
})()