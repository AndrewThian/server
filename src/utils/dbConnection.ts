import { getConnectionOptions, createConnection } from "typeorm";

export const dbConnection = async () => {
    /**
     * While using the activerecord way of handling entities, typeorm's connection is global. 
     * Thus, it only uses the default connection.
     * Here's a issue from someone dated 28/Aug/2018 https://github.com/typeorm/typeorm/issues/2052,
     * My code isn't the most fantastic but i'll work for now.
     */
    const connectionOptions = await getConnectionOptions(process.env.NODE_ENV)
    return createConnection({ ...connectionOptions, name: "default" });
}