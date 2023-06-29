import { INVALID_MOVE, Stage, TurnOrder } from 'boardgame.io/core';
import { PlayerView } from 'boardgame.io/core';
import { v4 as uuid } from 'uuid';


// SETUP
const startDeckR1 = [1, 2, 3, 4]
const startDeckS1 = [1, 2, 3, 4]

const startDeckR2 = [5, 6, 7, 8]
const startDeckS2 = [5, 6, 7, 8]

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
        discardPile: [],
        players: {
            '0': { name: "P1", bikeR_ID: uuid(), bikeS_ID: uuid(), nrOfPlacedBikes: 0, cardR: null, cardS: null, hand: [], deckR: startDeckR1, deckS: startDeckS1, recyDeckR: [], recyDeckS: [] } as Player,
            '1': { name: "P2", bikeR_ID: uuid(), bikeS_ID: uuid(), nrOfPlacedBikes: 0, cardR: null, cardS: null, hand: [], deckR: startDeckR2, deckS: startDeckS2, recyDeckR: [], recyDeckS: [] } as Player,
        },
    }),

    // playerView: PlayerView.STRIP_SECRETS,

    phases: {
        gameSetup: {
            start: true,
            moves: {
                selectBikeStart: ({ G, playerID, events }, roadTileIndex) => {

                    const roadTile = G.road[roadTileIndex]
                    const player = G.players[playerID]

                    if (playerID === null) {
                        console.log("spectating player can't place bike!");
                        return INVALID_MOVE;
                    }

                    if (roadTile.bikes.length !== roadTile.lanes) {
                        if (player.nrOfPlacedBikes === 0) {
                            roadTile.bikes.push(player.bikeR_ID)
                            console.log("bike R placed");
                        } else {
                            roadTile.bikes.push(player.bikeS_ID)
                            console.log("bike S placed");
                        }
                        player.nrOfPlacedBikes++;
                    }
                },
            },
            endIf: ({ ctx }) => (ctx.turn === ctx.numPlayers + 1),
            next: "energy",
        },
        energy: {
            turn: {
                activePlayers: { all: Stage.NULL },
            }
        },
        movement: {

        },
    },

    turn: {
        minMoves: 2,
        maxMoves: 2,

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

// function PlayCard({ events }) {
//     events.setActivePlayers({ others: 'discard', minMoves: 1, maxMoves: 1 });
//   }