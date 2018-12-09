import { createConnection } from "typeorm";
import { CSV } from "./csv";
import { Restaurant } from "./entity/Restaurant"
import { Schedule } from "./entity/Schedule";

(async () => {
    const csv = new CSV("test.csv")
    const dbConnection = await createConnection()
    try {
        const dataset = await csv.transformer.getDataPromise()
        for (const row of dataset) {
            const restaurant = await Restaurant.upsert(row.name);
            for (const schedule of row.schedule) {
                await Schedule.upsert(restaurant, schedule);
            }
        }
    } catch (error) {
        console.error(error)
        return dbConnection.close();
    }
    dbConnection.close();
    console.log("Successfully update all restaurants");
})()