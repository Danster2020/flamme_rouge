import { Origins, Server } from "boardgame.io/server";
import { GameFlammeRouge } from "./Game";

const server = Server({
    games: [GameFlammeRouge],
    origins: [Origins.LOCALHOST_IN_DEVELOPMENT, "192.168.1.5"],
});

const server_port = 8001;
server.run(server_port, () => console.log("esm server running on port " + server_port));