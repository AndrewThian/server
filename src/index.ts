import { createConnection, Connection } from "typeorm";
import { CSV } from "./csv";
import { Restaurant } from "./entity/Restaurant"
import { Schedule } from "./entity/Schedule";
import { User } from "./entity/User";

createConnection().then(async (connection: Connection) => {

    const csv = new CSV("hours.csv")

    csv.transformer.getDataCallback(async (data) => {
        // const restaurant = await Restaurant.createOrUpdate(data.name);

        const result = await connection.query(`INSERT INTO restaurant (name) VALUES (?) ON DUPLICATE KEY UPDATE name=?;`, [data.name, data.name])
        console.log(result)
        
        const restaurant = await Restaurant.findOne({ name: data.name })
        console.log(restaurant)

        for (const dataSchedule of data.schedule) {
            let schedule = new Schedule();
            schedule.dayOfTheWeek = dataSchedule.day;
            schedule.openingHour = dataSchedule.open;
            schedule.closingHour = dataSchedule.close;
            schedule.restaurant = restaurant;

            await connection.manager.save(schedule);
        }
    })
}).catch(err => console.error(err))