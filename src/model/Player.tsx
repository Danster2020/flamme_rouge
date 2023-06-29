import React from 'react'
import { Player } from '../Game';

export function getPlayer(G, bikeID: string) {
    G.players.forEach(player => { // TODO forEach does not worrk on obj
        if (player.bikeR === bikeID || player.bikeS === bikeID) {
            return player
        }
    });
    return null
}