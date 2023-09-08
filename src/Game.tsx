import { INVALID_MOVE, Stage } from 'boardgame.io/core';
import { v4 as uuid } from 'uuid';
import { handOutExhaustionCards, moveFurthestBike, runSlipStream } from './model/Bike';
import { EffectsPlugin } from 'bgio-effects/plugin';
import { Game } from 'boardgame.io';
import { tileHasProperty } from './model/Road';
import { nrOfPlayers } from './gameConfig';

// SETUP

// TESTING
const startDeckR1 = [1, 2, 3, 4]
const startDeckS1 = [1, 2, 3, 4]
const startDeckR2 = [1, 2, 3, 4]
const startDeckS2 = [1, 2, 3, 4]

// REAL DECKS
const startDeckR = [
    3, 4, 5, 6, 7,
    3, 4, 5, 6, 7,
    3, 4, 5, 6, 7
]

const startDeckS = [
    2, 3, 4, 5, 9,
    2, 3, 4, 5, 9,
    2, 3, 4, 5, 9
]

export interface RoadTile {
    lanes: 2,
    bikes: [],
    properties: string[]
}

const roadTile1 = {
    lanes: 2,
    bikes: [],
    properties: []
}

const roadTile2 = {
    lanes: 2,
    bikes: [],
    properties: ["start"]
}

const roadTile3 = {
    lanes: 2,
    bikes: [],
    properties: ["goal"]
}

let road = []
const roadLength = 75
for (let index = 0; index < roadLength; index++) {

    if (index < 5) {
        road.push(roadTile2 as RoadTile)
    } else if (index < roadLength - 5) {
        road.push(roadTile1 as RoadTile)
    } else {
        road.push(roadTile3 as RoadTile)
    }
}
// ------

export interface Player {
    name: string;
    bikeR_ID: string;
    bikeS_ID: string;
    nrOfPlacedBikes: number;
    selectingR: boolean
    selectingS: boolean
    cardR: number
    cardS: number
    hand: number[]; // Replace 'any' with the appropriate type for the hand
    deckR: any[]; // Replace 'any' with the appropriate type for the deckR
    recyDeckR: any[];
    recyDeckS: any[];
    deckS: any[]; // Replace 'any' with the appropriate type for the deckS
}

let gamePlayers = {}

for (let i = 0; i < nrOfPlayers; i++) {
    gamePlayers[i.toString()] = { name: "Spelare " + i, bikeR_ID: uuid(), bikeS_ID: uuid(), nrOfPlacedBikes: 0, selectingR: false, selectingS: false, cardR: null, cardS: null, hand: [], deckR: startDeckR, recyDeckR: [], deckS: startDeckS, recyDeckS: [] } as Player
}

export enum BikerType {
    ROULEUR,
    SPRINTEUR,
}

const configuredEffectsPlugin = {
    effects: {
        bikeMoved: {
            create: (obj) => obj,
            duration: 3,
        },
        refresh: {
            create: null,
            duration: 0.1,
        },
        exhaustion: {
            create: (obj) => obj,
            duration: 2,
        },
    },
};

export const GameFlammeRouge: Game<any, any, any> = {

    name: "Flamme_Rouge",

    plugins: [EffectsPlugin(configuredEffectsPlugin)],

    setup: () => ({
        road: road,
        discardPile: [],
        nrOfMovedBikes: 0,
        players: gamePlayers
    }),

    // playerView: PlayerView.STRIP_SECRETS,

    ai: {
        enumerate: (G, ctx) => {
            let moves = [];
            for (let i = 0; i < 9; i++) {
                if (G.cells[i] === null) {
                    moves.push({ move: 'clickCell', args: [i] });
                }
            }
            return moves;
        },
    },

    phases: {

        gameSetup: {
            start: true,
            turn: {
                activePlayers: { all: "placingBikes" },

                stages: {
                    placingBikes: {
                        moves: {
                            selectBikeStart: ({ G, ctx, playerID, events, effects }, roadTileIndex) => {

                                const roadTile = G.road[roadTileIndex]
                                const player = G.players[playerID]

                                if (playerID === null) {
                                    console.log("spectating player can't place bike!");
                                    return INVALID_MOVE;
                                }

                                if (!tileHasProperty(roadTile, "start")) {
                                    console.log("can't place bike outside start area!");
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

                                if (player.nrOfPlacedBikes === 2) {
                                    events.setStage("hasPlacedBikes")
                                }
                            },
                        },

                        next: "hasPlacedBikes"
                    },
                    hasPlacedBikes: {},
                },
            },

            endIf: ({ G, ctx }) => (allBikesPlaced(G, ctx)),
            next: "energy",
        },

        energy: {
            onBegin: ({ G, ctx, effects, events }) => {

                if (isGameOver(G)) {
                    events.endGame();
                }

            },
            turn: {
                activePlayers: { all: "selectingCards" },

                stages: {
                    selectingCards: { next: "selectedCards" },
                    selectedCards: {},
                },


            },
            moves: {
                drawForBikeR: ({ G, playerID, events }, type: BikerType) => {


                    const player = G.players[playerID]

                    if (player.hand.length > 0) {
                        console.log("cards already in hand!");
                        return INVALID_MOVE
                    }

                    if ((player.cardR !== null && type === BikerType.ROULEUR) || (player.cardS !== null && type === BikerType.SPRINTEUR)) {
                        console.log("card already chosen for this bike");
                        return INVALID_MOVE
                    }

                    for (let i = 0; i < 4; i++) {
                        drawCard(G, playerID, type)
                    }

                    if (type === BikerType.ROULEUR) {
                        player.selectingR = true
                        player.selectingS = false
                    } else {
                        player.selectingR = false
                        player.selectingS = true
                    }

                },

                selectCard: ({ G, ctx, events, playerID }, index: number) => {

                    const player = G.players[playerID]

                    const removedCard = removeAtIndex(player.hand, index)

                    // G.discardPile.push(removedCard)

                    if (player.selectingR) {
                        player.cardR = removedCard
                        moveCardsToDeck(player.hand, player.recyDeckR)
                        player.selectingR = false
                    } else {
                        player.cardS = removedCard
                        moveCardsToDeck(player.hand, player.recyDeckS)
                        player.selectingS = false
                    }

                    if (player.cardR !== null && player.cardS !== null) {
                        events.setStage("selectedCards")
                    }

                },

            },
            endIf: ({ G, ctx }) => (PlayersHaveSelectedCards(G, ctx)),
            next: "movement"
        },

        movement: {
            turn: {
                activePlayers: { all: Stage.NULL },
            },
            onBegin: ({ G, ctx, effects, events }) => {

                if (PlayersHaveEmptySelectedCards(G, ctx)) {
                    events.setPhase("slipStream")
                }

                moveFurthestBike(G, ctx, effects)

            },
            next: "movement"

        },

        slipStream: {
            turn: {
                activePlayers: { all: Stage.NULL },
            },
            onBegin: ({ G, ctx, effects, events }) => {

                effects.refresh()

                if (!runSlipStream(G, ctx, effects)) {
                    events.setPhase("exhaustion")
                }
            },
            next: "slipStream"
        },

        exhaustion: {
            turn: {
                activePlayers: { all: Stage.NULL },
            },
            onBegin: ({ G, ctx, effects, events }) => {

                effects.refresh()

                handOutExhaustionCards(G, ctx, effects)
                // events.endPhase()
            },
            next: "energy"
        },
    },

    turn: {
        minMoves: 2,
        maxMoves: 2,
    },

    moves: {

        updateName: ({ G, ctx, playerID, name }) => {
            G.players[playerID].name = name;
        }
    },
};


// draws one card
// FIXME player gets less cards than 4 even tough there are cards left
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
        deck = shuffleDeck(deck)
        hand.push(deck.pop())
    }
    // if there are cards in recycle deck
    else if (recyDeck.length > 0) {

        // add all recycled cards back to deck
        const dLength = recyDeck.length
        for (let i = 0; i < dLength; i++) {
            deck.push(recyDeck.pop())
        }

        // shuffle the deck
        deck = shuffleDeck(deck)

        // draw card from deck
        hand.push(deck.pop())
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

function PlayersHaveSelectedCards(G, ctx): boolean {


    for (let i = 0; i < ctx.numPlayers; i++) {
        const player = G.players[i];
        if (player.cardR === null) {
            return false
        }
        if (player.cardS === null) {
            return false
        }
    }
    return true
}

function PlayersHaveEmptySelectedCards(G, ctx): boolean {

    for (let i = 0; i < ctx.numPlayers; i++) {
        const player = G.players[i];
        if (player.cardR !== null) {
            return false
        }
        if (player.cardS !== null) {
            return false
        }
    }
    return true
}

function allBikesPlaced(G, ctx) {

    if (ctx.activePlayers === null) {
        return false
    }

    for (let i = 0; i < ctx.numPlayers; i++) {
        const playerStage = ctx.activePlayers[i];

        if (playerStage !== "hasPlacedBikes") {
            return false
        }
    }
    return true
}

function isGameOver(G) {

    const road = G.road

    for (let i = 0; i < road.length; i++) {
        const tile = road[i];
        if (tile.bikes.length > 0 && tileHasProperty(tile, "goal")) {
            return true
        }
    }
    return false
}
