import { Client } from 'boardgame.io/react';
import { Local, SocketIO } from 'boardgame.io/multiplayer';
import { GameFlammeRouge } from './Game';
import { BoardFlammeRouge } from './Board';

const ClientFlammeRouge = Client({
    game: GameFlammeRouge,
    board: BoardFlammeRouge,
    multiplayer: SocketIO({ server: 'localhost:8000' }),
});

const App = () => (
    <div>
        <ClientFlammeRouge matchID="0" playerID="0" />
        <ClientFlammeRouge matchID="0" playerID="1" />
    </div>
);

export default App