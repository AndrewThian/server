import { createConnection, AdvancedConsoleLogger } from "typeorm";
import { CSV } from "./csv";
import { Restaurant } from "./entity/Restaurant"
import { Schedule } from "./entity/Schedule";

(async () => {
    const filename = (process.env.NODE_ENV === "development") ? "hours.csv" : "test.csv"
    const csv = new CSV(filename)
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
    }
    dbConnection.close();
    console.log("Successfully update all restaurants");
})()