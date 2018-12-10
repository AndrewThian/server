import http from "http";

export const handleListen = (httpServer: http.Server): void => {
    const address = httpServer.address();
    const bind =
        typeof address === "string"
            ? `pipe ${address}`
            : `port ${address.port}`;
    console.log(`Listening on ${bind}`);
}