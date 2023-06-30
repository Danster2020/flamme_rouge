import { Client } from 'boardgame.io/react';
import { Local, SocketIO } from 'boardgame.io/multiplayer';
import { GameFlammeRouge } from './Game';
import { BoardFlammeRouge } from './Board';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import { EffectsBoardWrapper } from 'bgio-effects/react';


const wrappedBoard = EffectsBoardWrapper(BoardFlammeRouge, {
    updateStateAfterEffects: true,
});
const ClientFlammeRouge = Client({
    game: GameFlammeRouge,
    board: wrappedBoard,
    multiplayer: Local(),
    // multiplayer: SocketIO({ server: 'localhost:8000' }),
});


const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="0" element={<ClientFlammeRouge matchID="0" playerID="0" />} />
            <Route path="1" element={<ClientFlammeRouge matchID="0" playerID="1" />} />
        </Routes>
    </BrowserRouter>
);

export default App