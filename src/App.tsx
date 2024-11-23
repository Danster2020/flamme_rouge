import { Client } from 'boardgame.io/react';
import { Local, SocketIO } from 'boardgame.io/multiplayer';
import { GameFlammeRouge } from './Game';
import { BoardFlammeRouge } from './Board';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import { EffectsBoardWrapper } from 'bgio-effects/react';
import { Helmet } from "react-helmet";
import { nrOfPlayers } from './gameConfig';

const { protocol, hostname, port } = window.location;

const serverConfig = `${protocol}//${hostname}:${port}`;


const wrappedBoard = EffectsBoardWrapper(BoardFlammeRouge, {
    updateStateAfterEffects: true,
});

function envType() {
    console.log("current ENV: " + process.env.NODE_ENV);
    console.log("current server config:", serverConfig);

    if (process.env.NODE_ENV === 'production') {
        console.log("Running in production");

        return SocketIO({ server: '192.168.1.5:8001' });
    } else {
        // return SocketIO({ server: 'localhost:3000' });
        console.log("Running in development");
        return Local();
    }
}

const ClientFlammeRouge = Client({
    game: GameFlammeRouge,
    board: wrappedBoard,
    numPlayers: nrOfPlayers,
    // multiplayer: Local(),
    multiplayer: envType()
});


const App = () => {

    return (
        <>
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            </Helmet>

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home></Home>} />


                    {[...Array(nrOfPlayers)].map((i, index: number) =>
                        <Route key={index} path={index.toString()} element={<ClientFlammeRouge matchID="0" playerID={index.toString()} />} />
                    )}

                    {/* <Route path="0" element={<ClientFlammeRouge matchID="0" playerID="0" />} />
                    <Route path="1" element={<ClientFlammeRouge matchID="0" playerID="1" />} /> */}
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App