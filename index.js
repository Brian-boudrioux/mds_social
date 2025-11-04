import http from "http";
import app from "./config/server.js";
import { initSocket } from "./config/socket.js";

const server = http.createServer(app);

initSocket(server);

server.listen(3000, () => console.log("Server running on http://localhost:3000"));