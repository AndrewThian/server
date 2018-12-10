import connections from "./utils/connections"
import { CSV } from "./csv";
import { Restaurant } from "./entity/Restaurant"
import { Schedule } from "./entity/Schedule";

(async () => {
    const csv = new CSV("hours.csv")
    const connection = await connections.db();
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
        return connection.close();
    }
    connection.close();
    console.log("Successfully seeded all restaurants and schedules");
})()