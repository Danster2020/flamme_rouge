import { Origins, Server } from "boardgame.io/server";
import { GameFlammeRouge } from "./Game";

const server = Server({
    games: [GameFlammeRouge],
    origins: [Origins.LOCALHOST],
});

server.run(8000);


// const { Server, Origins } = require('boardgame.io/server');
// const { GameFlammeRouge } = require('./Game');

// const server = Server({
//     games: [GameFlammeRouge],
//     origins: [Origins.LOCALHOST],
// });

// server.run(8000);
// export { }