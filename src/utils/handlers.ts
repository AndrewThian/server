import http from "http";

export const handleListen = (server: http.Server): void => {
    const address = server.address();
    const bind =
        typeof address === "string"
            ? `pipe ${address}`
            : `port ${address.port}`;
    console.log(`Listening on ${bind}`);
}