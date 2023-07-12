import { v4 as uuid } from 'uuid';
import { BikerType, delay } from '../Game';
import { getPlayer } from './Player';
import { getRoadTile, getRoadTileIndex } from './Road';

export function moveBike(G, ctx, bikeID) {
    const currentBikePos = getBikePosition(G, bikeID)
    const currentBikeTile = getRoadTile(G, currentBikePos)
    const currentBikeLane = getBikeLane(G, bikeID)



    const player = getPlayer(G, ctx, bikeID)
    const bikeType = getBikeType(G, ctx, bikeID)
    let cardValue = null

    if (bikeType === BikerType.ROULEUR) {
        cardValue = player.cardR
    } else {
        cardValue = player.cardS
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
                console.log("bike blocked and cant move.");
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


function removeBikefromTile(RoadTile, bikeID: string) {

    let array = RoadTile.bikes

    const index = array.indexOf(bikeID);
    if (index !== -1) {
        // array.splice(index, 1);
        array[index] = null
    }

    return array
}

function placeBikeOnTile(RoadTile, bikeID: string) {
    RoadTile.bikes.push(bikeID)
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



export function moveFurthestBike(G, ctx) {

    const road = G.road

    for (let i = road.length - 1; i >= 0; i--) {
        const roadTile = road[i];
        const nrOfbikesOnTile = roadTile.bikes.length

        // if a bike is on the roadTile
        if (nrOfbikesOnTile > 0) {
            for (let j = 0; j < nrOfbikesOnTile; j++) {
                moveBike(G, ctx, roadTile.bikes[j])
                return
            }
        }

        console.log("roadTile" + i);
    }
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

