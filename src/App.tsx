import { Client } from 'boardgame.io/react';
import { GameFlammeRouge } from './Game';
import { TicTacToeBoard } from './Board';

const App = Client({
    game: GameFlammeRouge,
    board: TicTacToeBoard,
});

export default App