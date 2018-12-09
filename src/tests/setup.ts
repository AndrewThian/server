import { dbConnection } from "../utils/dbConnection";
import { getConnection } from "typeorm";

beforeAll(async () => {
    process.env.NODE_ENV="test"
    await dbConnection();
})

afterAll(async () => {
    await getConnection().close();
})