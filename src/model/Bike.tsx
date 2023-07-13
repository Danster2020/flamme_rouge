import { v4 as uuid } from 'uuid';
import { BikerType, Player, delay } from '../Game';
import { getPlayer, getPlayerID } from './Player';
import { getRoadTile, getRoadTileIndex, resetRoadTile } from './Road';

export function moveBike(G, ctx, bikeID) {
    const currentBikePos = getBikePosition(G, bikeID)
    const currentBikeTile = getRoadTile(G, currentBikePos)
    const currentBikeLane = getBikeLane(G, bikeID)

    const player = getPlayer(G, ctx, bikeID)
    const bikeType = getBikeType(G, ctx, bikeID)
    let cardValue = null


    if (bikeType === BikerType.ROULEUR) {

        if (player.cardR === null) {
            return null // bike has already been moved
        }

        cardValue = player.cardR
        discardSelectedCard(G, player, BikerType.ROULEUR)

    } else {

        if (player.cardS === null) {
            return null // bike has already been moved
        }

        cardValue = player.cardS
        discardSelectedCard(G, player, BikerType.SPRINTEUR)
    }

    let targetBikeTile = getRoadTile(G, currentBikePos + cardValue)

    // if tile is out of bounds
    targetBikeTile = ifTileNull(G, targetBikeTile)

    // if target tile is already full
    if (targetBikeTile.lanes === targetBikeTile.bikes.length) {
        let nrOfblockedSteps = 0
        while (targetBikeTile.lanes === targetBikeTile.bikes.length) {
            targetBikeTile = getRoadTile(G, currentBikePos + cardValue - nrOfblockedSteps)

            targetBikeTile = ifTileNull(G, targetBikeTile)

            if (targetBikeTile === currentBikeTile) {
                console.log("bike blocked and can't move.");
                return null
            }

            nrOfblockedSteps++
        }
    }

    placeBikeOnTile(targetBikeTile, bikeID)
    removeBikefromTile(currentBikeTile, bikeID)
    const targetBikeLane = getBikeLane(G, bikeID)

    const targetBikePos = getRoadTileIndex(G, targetBikeTile)
    return { currentBikePos: currentBikePos, targetBikePos: targetBikePos, currentBikeLane: currentBikeLane, targetBikeLane: targetBikeLane }
}

export function moveBikeIfSlipStream(G, bikeID) {
    const currentBikePos = getBikePosition(G, bikeID)
    const currentBikeTile = getRoadTile(G, currentBikePos)
    const currentBikeLane = getBikeLane(G, bikeID)

    let oneAheadBikeTile = getRoadTile(G, currentBikePos + 1)
    let twoAheadBikeTile = getRoadTile(G, currentBikePos + 2)

    if (oneAheadBikeTile === null || twoAheadBikeTile === null) {
        return null
    }

    // if oneAheadBikeTile contains a bike
    if (oneAheadBikeTile.bikes.length > 0) {
        return null
    }

    // if twoAheadBikeTile tile is empty
    if (twoAheadBikeTile.bikes.length === 0) {
        return null
    }

    placeBikeOnTile(oneAheadBikeTile, bikeID)
    removeBikefromTile(currentBikeTile, bikeID)
    const targetBikeLane = getBikeLane(G, bikeID)

    const targetBikePos = getRoadTileIndex(G, oneAheadBikeTile)
    return { currentBikePos: currentBikePos, targetBikePos: targetBikePos, currentBikeLane: currentBikeLane, targetBikeLane: targetBikeLane }
}

export function handOutExhaustionCards(G, ctx, effects) {

    const road = G.road

    for (let i = road.length - 1; i >= 0; i--) {
        const roadTile = road[i];
        const nrOfbikesOnTile = roadTile.bikes.length

        // if a bike is on the roadTile
        if (nrOfbikesOnTile > 0) {
            for (let j = 0; j < nrOfbikesOnTile; j++) {

                const bikeID = roadTile.bikes[j]
                const currentBikePos = getBikePosition(G, bikeID)
                const nextBikeTile = getRoadTile(G, currentBikePos + 1)
                const player = getPlayer(G, ctx, bikeID)
                const playerID = getPlayerID(G, ctx, bikeID)
                const bikeType = getBikeType(G, ctx, bikeID)

                if (nextBikeTile !== null && nextBikeTile.bikes.length === 0) {

                    if (bikeType === BikerType.ROULEUR) {
                        player.deckR.push(2)
                    } else {
                        player.deckS.push(2)
                    }

                    effects.exhaustion({ playerID: playerID, bikeType: bikeType })
                }
            }
        }
    }
}

export function getBikeType(G, ctx, bikeID): BikerType {

    for (let i = 0; i < ctx.numPlayers; i++) {
        const player = G.players[i];

        if (player.bikeR_ID === bikeID) {
            console.log("type: " + BikerType.ROULEUR);
            return BikerType.ROULEUR
        }
        else if (player.bikeS_ID === bikeID) {
            console.log("type: " + BikerType.SPRINTEUR);
            return BikerType.SPRINTEUR
        }
    }
    return null
}


function removeBikefromTile(roadTile, bikeID: string) {

    let array = roadTile.bikes

    const index = array.indexOf(bikeID);
    if (index !== -1) {
        // array.splice(index, 1);
        array[index] = null
    }

    // if all elements are null after removal
    if (array.every(element => element === null)) {
        resetRoadTile(roadTile)
    }

    return array
}

function discardSelectedCard(G: any, player: Player, bikeType: BikerType) {

    if (bikeType === BikerType.ROULEUR) {
        G.discardPile.push(player.cardR)
        player.cardR = null

    } else {
        G.discardPile.push(player.cardS)
        player.cardS = null
    }
}

function placeBikeOnTile(roadTile, bikeID: string) {
    roadTile.bikes.push(bikeID)
}



export function moveBikes(G, ctx, effects) {

    const road = G.road

    for (let i = road.length - 1; i >= 0; i--) {
        const roadTile = road[i];
        const nrOfbikesOnTile = roadTile.bikes.length

        // if a bike is on the roadTile
        if (nrOfbikesOnTile > 0) {
            for (let j = 0; j < nrOfbikesOnTile; j++) {
                const posFromTo = moveBike(G, ctx, roadTile.bikes[j])

                if (posFromTo !== null) {
                    effects.bikeMoved(posFromTo)

                }
            }
        }

        console.log("roadTile" + i);
    }
}



export function moveFurthestBike(G, ctx, effects) {

    const road = G.road

    for (let i = road.length - 1; i >= 0; i--) {
        const roadTile = road[i];
        const nrOfbikesOnTile = roadTile.bikes.length

        // if a bike is on the roadTile
        if (nrOfbikesOnTile > 0) {
            for (let j = 0; j < nrOfbikesOnTile; j++) {

                let posFromTo = null
                if (roadTile.bikes[j] !== null) {
                    posFromTo = moveBike(G, ctx, roadTile.bikes[j])
                }

                if (posFromTo !== null) {
                    effects.bikeMoved(posFromTo)
                    return
                }
            }
        }
    }
}

export function runSlipStream(G, ctx, effects) {
    const road = G.road

    let slipStreamOccured = false

    for (let i = 0; i < road.length; i++) {
        const roadTile = road[i];
        const nrOfbikesOnTile = roadTile.bikes.length

        // if a bike is on the roadTile
        if (nrOfbikesOnTile > 0) {
            for (let j = 0; j < nrOfbikesOnTile; j++) {

                let posFromTo = null
                if (roadTile.bikes[j] !== null) {
                    posFromTo = moveBikeIfSlipStream(G, roadTile.bikes[j])
                }

                if (posFromTo !== null) {
                    effects.bikeMoved(posFromTo)
                    slipStreamOccured = true
                    return slipStreamOccured
                }
            }
        }
    }

    return slipStreamOccured
}

export function getBikePosition(G, bikeID): number {

    const road = G.road

    let roadIndex = 0

    for (let j = 0; j < road.length; j++) {
        const roadTile = road[j];

        for (let i = 0; i < roadTile.bikes.length; i++) {
            const bike = roadTile.bikes[i];
            if (bike === bikeID) {
                return roadIndex
            }
        }

        roadIndex++
    }

    return null
}

export function getBikeLane(G, bikeID) {
    const road = G.road

    for (let j = 0; j < road.length; j++) {
        const roadTile = road[j];

        let laneIndex = 0

        for (let i = 0; i < roadTile.bikes.length; i++) {
            const bike = roadTile.bikes[i];
            if (bike === bikeID) {
                return laneIndex
            }
            laneIndex++

        }

    }

    return null
}

// changes the tile if null to be the last tile on road
function ifTileNull(G, roadTile) {
    if (roadTile === null) {
        console.log("bike move is out of bounds");
        return getRoadTile(G, G.road.length - 1)
    }

    return roadTile
}

