import { INVALID_MOVE } from 'boardgame.io/core';
import { PlayerView } from 'boardgame.io/core';
import { v4 as uuid } from 'uuid';


// SETUP
const startDeckR = [1, 2, 3, 4]
const startDeckS = [1, 2, 3, 4]

const roadTile1 = {
    lanes: 2,
    bikes: []
}

let road = []

for (let index = 0; index < 5; index++) {
    road.push(roadTile1)
}
// ------

export interface Player {
    name: string;
    bikeR_ID: string;
    bikeS_ID: string;
    hand: number[]; // Replace 'any' with the appropriate type for the hand
    deckR: any[]; // Replace 'any' with the appropriate type for the deckR
    deckS: any[]; // Replace 'any' with the appropriate type for the deckS
}

export const GameFlammeRouge = {
    setup: () => ({
        cells: Array(9).fill(null),
        road: road,
        players: {
            '0': { name: "P1", bikeR_ID: uuid(), bikeS_ID: uuid(), hand: [], deckR: startDeckR, deckS: startDeckS } as Player,
            '1': { name: "P2", bikeR_ID: uuid(), bikeS_ID: uuid(), hand: [], deckR: startDeckR, deckS: startDeckS } as Player,
        },
    }),

    playerView: PlayerView.STRIP_SECRETS,



    turn: {

        minMoves: 2,
        maxMoves: 2,
        stages: {
            gameSetup: {
                moves: {

                },
                start: true,
                next: 'energy'
            },
            energy: {
                moves: {}
            }
        },
    },


    moves: {
        selectBikeStart: ({ G, playerID, events }, roadTileIndex) => {

            if (playerID === null) {
                console.log("spectating player can't place bike!");
                return
            }

            const roadTile = G.road[roadTileIndex]
            const player = G.players[playerID]

            if (roadTile.bikes.length !== roadTile.lanes) {
                roadTile.bikes.push(player.bikeR_ID)
            }

            events.setActivePlayers({
                all: 'energy',
            });
        },

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

