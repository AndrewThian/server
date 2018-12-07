import { createConnection, Connection } from "typeorm";
// import { csv } from "./csv";
import { User } from "./entity/User"

// csv.getDataCallback(data => {
//     console.log(data);
// });

createConnection().then(async (connection: Connection) => {
    // const user = new User();
    // user.username = "new user";
    // await connection.manager.save(user);

    const user = await connection.manager.findOne(User, 1)
    user.username = "1231231";
    user.timestamp.updatedAt = null;
    await connection.manager.save(user)
    console.log("Saved a uypda user with id: " + user.id);
}).catch(err => console.error(err))