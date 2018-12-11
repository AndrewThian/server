import { server } from "./app";
import { normalizePort } from "./utils/normalizePort"
import { handleListen } from "./utils/handlers"

server.listen(normalizePort(3000));
server.on("listening", () => handleListen(server));