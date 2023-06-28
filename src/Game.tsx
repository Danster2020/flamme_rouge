import { INVALID_MOVE } from 'boardgame.io/core';
import { PlayerView } from 'boardgame.io/core';

const startDeckR = [1, 2, 3, 4]
const startDeckS = [1, 2, 3, 4]

export const GameFlammeRouge = {
    setup: () => ({
        cells: Array(9).fill(null),
        players: {
            '0': { name: "Player 1", hand: [], deckR: startDeckR, deckS: startDeckS },
            '1': { name: "Player 2", hand: [], deckR: startDeckR, deckS: startDeckS },
        },
    }),

    playerView: PlayerView.STRIP_SECRETS,



    turn: {
        minMoves: 1,
        maxMoves: 1,
    },


    moves: {
        clickCell: ({ G, playerID }, id) => {
            if (G.cells[id] !== null) {
                return INVALID_MOVE;
            }
            G.cells[id] = playerID;
        }
    },

    endIf: ({ G, ctx }) => {
        if (IsVictory(G.cells)) {
            return { winner: ctx.currentPlayer };
        }
        if (IsDraw(G.cells)) {
            return { draw: true };
        }
    },
};

// Return true if `cells` is in a winning configuration.
function IsVictory(cells) {
    const positions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
        [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];

    const isRowComplete = row => {
        const symbols = row.map(i => cells[i]);
        return symbols.every(i => i !== null && i === symbols[0]);
    };

    return positions.map(isRowComplete).some(i => i === true);
}

// Return true if all `cells` are occupied.
function IsDraw(cells) {
    return cells.filter(c => c === null).length === 0;
}