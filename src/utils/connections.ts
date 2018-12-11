import http from "http";
import { getConnectionOptions, createConnection } from "typeorm";

const connections = new Map();
let nextSocketId = 0;

/**
 * count down to clear all connections
 * @param counter seconds to close
 */
const waitForSocketToClose = (counter: number) => {
    if (counter > 0) {
        console.log(`Waiting ${counter} more ${counter === 1 ? 'seconds' : 'second'} for all connections to close...`);
        return setTimeout(waitForSocketToClose, 1000, counter - 1)
    }

    console.log("Forcing all connections to close now");
    connections.clear();
}

export default {
    db: async () => {
        /**
         * While using the activerecord way of handling entities, typeorm's connection is global. 
         * Thus, it only uses the default connection.
         * Here's a issue from someone dated 28/Aug/2018 https://github.com/typeorm/typeorm/issues/2052,
         * My code isn't the most fantastic but i'll work for now.
         */
        const connectionOptions = await getConnectionOptions(process.env.NODE_ENV)
        return createConnection({ ...connectionOptions, name: "default" });
    }
    // server: () => {
    //     return {
    //         storeConnection: (socket: any) => {
    //             const socketId = nextSocketId++
    //             connections.set(socketId, socket);
    //             return socketId
    //         },
    //         dropConnection: (socketId: number) => {
    //             connections.delete(socketId)
    //         }
    //     }
    // },
    // shutdown: (sec: number, server: http.Server) => {
    //     waitForSocketToClose(sec)

    //     server.close((err: Error) => {
    //         if (err) {
    //             console.error(err)
    //             process.exitCode = 1
    //         }
    //         process.exit();
    //     })       
    // },
    // handleSignal: (server: http.Server) => {
    //     process.on('SIGINT', function onSigint () {
    //         console.info('Got SIGINT (aka ctrl-c in docker). Graceful shutdown ', new Date().toISOString());
    //         this.shutdown(server);
    //     });

    //     process.on('SIGTERM', function onSigterm () {
    //         console.info('Got SIGTERM (docker container stop). Graceful shutdown ', new Date().toISOString());
    //         this.shutdown(server);
    //     })
    // }
}