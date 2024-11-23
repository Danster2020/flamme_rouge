import { Origins, Server } from "boardgame.io/server";
import { GameFlammeRouge } from "./Game";

import path from 'path';
import serve from 'koa-static';

// const { protocol, hostname, port } = window.location;

// console.log(hostname);

const server = Server({
    games: [GameFlammeRouge],
    // origins: [Origins.LOCALHOST,
    //     "game-container",
    //     "esm-server-container",
    //     "game-app", "esm-server",
    //     "http://192.168.1.5",
    //     "https://flammerouge.dannesteknikhorna.se/",
    //     "http://flammerouge.dannesteknikhorna.se/"
    // ],
    // origins: ["http://game-container"],
});

const PORT = 8001;

// Build path relative to the server.js file
const frontEndAppBuildPath = path.resolve(__dirname, '../');
server.app.use(serve(frontEndAppBuildPath))

server.run(PORT, () => {
    server.app.use(
        async (ctx, next) => await serve(frontEndAppBuildPath)(
            Object.assign(ctx, { path: 'index.html' }),
            next
        )
    )
});