import { Origins, Server } from "boardgame.io/server";
import { GameFlammeRouge } from "./Game";

const server = Server({
    games: [GameFlammeRouge],
    origins: ["http://esm-server-container"],
});

const server_port = 8001;
server.run(server_port, () => console.log("esm server running on port " + server_port));