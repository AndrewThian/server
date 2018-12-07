import { createConnection, Connection } from "typeorm";
import { csv } from "./csv";
import { Restaurant } from "./entity/Restaurant"
import { Schedule } from "./entity/Schedule";

// csv.getDataCallback(data => {
//     console.log(data);
// });

createConnection().then(async (connection: Connection) => {

    csv.getDataCallback(async (data) => {
        console.log(data)
    })

    // csv.getDataCallback(async (data) => {
    //     let restaurant = new Restaurant();
    //     restaurant.name = data.name
    //     await connection.manager.save(restaurant);

    //     for (const dataSchedule of data.schedule) {
    //         let schedule = new Schedule();
    //         schedule.dayOfTheWeek = dataSchedule.day.toUpperCase();
    //     }
    // })    

    // const user = new User();
    // user.username = "new user";
    // await connection.manager.save(user);

    // const user = await connection.manager.findOne(User, 1)
    // user.username = "1231231";
    // user.timestamp.updatedAt = null;
    // await connection.manager.save(user)
    // console.log("Saved a uypda user with id: " + user.id);

    // const rest = new Restaurant()
    // rest.name = "KFC"
    // await connection.manager.save(rest)
    // console.log("saved KFC")
    // let restaurant = await connection.manager.findOne(Restaurant, 1)
    
    // let schedule: Schedule
    // schedule = new Schedule();
    // schedule.dayOfTheWeek = "SUN"
    // schedule.closingHour = "05:00"
    // schedule.openingHour = "03:00"
    // schedule.restaurant = restaurant

    // connection.manager.save(schedule);

    // console.log(new Date('2007-02-03').getDay())
}).catch(err => console.error(err))