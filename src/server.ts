import { Origins, Server } from "boardgame.io/server";
import { GameFlammeRouge } from "./Game";

// const { protocol, hostname, port } = window.location;

// console.log(hostname);

const server = Server({
    games: [GameFlammeRouge],
    origins: [Origins.LOCALHOST, "game-container", "esm-server-container", "game-app", "esm-server", "http://192.168.1.5"],
    // origins: ["http://game-container"],
});

const server_port = 8001;
server.run(server_port, () => console.log("esm server running on port " + server_port));