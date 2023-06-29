import { INVALID_MOVE, Stage, TurnOrder } from 'boardgame.io/core';
import { PlayerView } from 'boardgame.io/core';
import { v4 as uuid } from 'uuid';


// SETUP
const startDeckR1 = [1, 2, 3, 4]
const startDeckS1 = [11, 12, 13, 14]

const startDeckR2 = [5, 6, 7, 8]
const startDeckS2 = [25, 26, 27, 28]

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

export enum BikerType {
    ROULEUR,
    SPRINTEUR,
}

export const GameFlammeRouge = {
    setup: () => ({
        cells: Array(9).fill(null),
        road: road,
        discardPile: [],
        players: {
            '0': { name: "P1", bikeR_ID: uuid(), bikeS_ID: uuid(), nrOfPlacedBikes: 0, selectingR: false, selectingS: false, cardR: null, cardS: null, hand: [], deckR: startDeckR1, recyDeckR: [], deckS: startDeckS1, recyDeckS: [] } as Player,
            '1': { name: "P2", bikeR_ID: uuid(), bikeS_ID: uuid(), nrOfPlacedBikes: 0, selectingR: false, selectingS: false, cardR: null, cardS: null, hand: [], deckR: startDeckR2, recyDeckR: [], deckS: startDeckS2, recyDeckS: [] } as Player,
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

                drawForBikeR: ({ G, playerID, events }, type: BikerType) => {

                    const player = G.players[playerID]

                    if (player.hand.length > 0) {
                        console.log("cards already in hand!");
                        return INVALID_MOVE
                    }

                    for (let i = 0; i < 4; i++) {
                        drawCard(G, playerID, type)
                    }

                    if (type == BikerType.ROULEUR) {
                        player.selectingR = true
                        player.selectingS = false
                    } else {
                        player.selectingR = false
                        player.selectingS = true
                    }

                },

                selectCard: ({ G, playerID }, index: number) => {

                    const player = G.players[playerID]

                    const removedCard = removeAtIndex(player.hand, index)

                    G.discardPile.push(removedCard)

                    if (player.selectingR) {
                        player.cardR = removedCard
                        moveCardsToDeck(player.hand, player.recyDeckR)
                        player.selectingR = false
                    } else {
                        player.cardS = removedCard
                        moveCardsToDeck(player.hand, player.recyDeckS)
                        player.selectingS = false
                    }

                },
            },
            endIf: ({ ctx }) => (ctx.turn === ctx.numPlayers + 1),
            next: "energy",
        },
        energy: {
            turn: {
                activePlayers: { all: Stage.NULL },
            },
            moves: {


            }
        },
        movement: {

        },
    },

    turn: {
        minMoves: 2,
        maxMoves: 100,

    },


    moves: {


        clickCell: ({ G, playerID }, id) => {
            if (G.cells[id] !== null) {
                return INVALID_MOVE;
            }
            G.cells[id] = playerID;
        },


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

// draws one card
function drawCard(G: any, playerID, type: BikerType) {
    const player = G.players[playerID];

    let deck = null
    let recyDeck = null
    let hand = player.hand

    if (type === BikerType.ROULEUR) {
        deck = player.deckR
        recyDeck = player.recyDeckR
    } else {
        deck = player.deckS
        recyDeck = player.recyDeckS
    }

    if (deck.length > 0) {
        hand.push(deck.pop())
    }
    else if (recyDeck.length > 0) {

        // for each card in recycle deck
        const dLength = recyDeck.length
        for (let i = 0; i < dLength; i++) {
            deck.push(recyDeck.pop())
        }

        deck = shuffleDeck(deck)


        // hand.push(deck.pop())
    }
    // if the player has run out of cards
    else {
        hand.push(2)
        console.log("Player out of cards");
    }
}

function shuffleDeck(array: []) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function removeAtIndex(array: [], index: number) {
    if (index >= 0 && index < array.length) {
        const removedElement = array.splice(index, 1)[0];
        return removedElement;
    } else {
        return null;
    }
}

function moveCardsToDeck(cards: [], deck: []) {

    const deckLength = cards.length
    for (let i = 0; i < deckLength; i++) {
        deck.push(cards.pop())

    }
}