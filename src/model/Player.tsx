import React from 'react'
import { Player } from '../Game';

export function getPlayer(G, ctx, bikeID: string) {


    for (let i = 0; i < ctx.numPlayers; i++) {
        const player = G.players[i];
        if (player.bikeR_ID === bikeID || player.bikeS_ID === bikeID) {
            return player
        }
    }
    return null
}