import { v4 as uuid } from 'uuid';
import { BikerType } from '../Game';
import { getPlayer } from './Player';
import { getBikePosition, getRoadTile, getRoadTileIndex } from './Road';

export function moveBike(G, bikeID) {
    const currentBikePos = getBikePosition(G, bikeID)
    const currentBikeTile = getRoadTile(G, currentBikePos)



    const player = getPlayer(G, bikeID)
    const bikeType = getBikeType(G, bikeID)
    let cardValue = null

    if (bikeType === BikerType.ROULEUR) {
        cardValue = player.cardR
    } else {
        cardValue = player.cardS
    }

    let targetBikeTile = getRoadTile(G, currentBikePos + cardValue)
    const targetBikePos = getRoadTileIndex(G, targetBikeTile)

    // if tile is out of bounds
    if (targetBikeTile === null) {
        console.log("HANDLE"); //TODO
        return
    }

    // if target tile is already full
    if (targetBikeTile.lanes === targetBikeTile.bikes.length) {
        let nrOfblockedSteps = 0
        while (targetBikeTile.lanes === targetBikeTile.bikes.length) {
            targetBikeTile = getRoadTile(G, currentBikePos + cardValue - nrOfblockedSteps)

            if (targetBikeTile === currentBikeTile) {
                console.log("bike blocked and cant move.");
                return
            }

            nrOfblockedSteps++
        }
    }

    placeBikeOnTile(targetBikeTile, bikeID)
    // removeBikefromTile(currentBikeTile, bikeID)
}

export function getBikeType(G, bikeID): BikerType {

    G.players.forEach(player => { // TODO forEach does not worrk on obj
        if (player.bikeR === bikeID) {
            return BikerType.ROULEUR
        }
        else if (player.bikeS === bikeID) {
            return BikerType.SPRINTEUR
        }
    });
    return null
}


function removeBikefromTile(RoadTile, bikeID: string) {

    let array = RoadTile.bikes

    const index = array.indexOf(bikeID);
    if (index !== -1) {
        array.splice(index, 1);
    }
}

function placeBikeOnTile(RoadTile, bikeID: string) {
    RoadTile.bikes.push(bikeID)
}