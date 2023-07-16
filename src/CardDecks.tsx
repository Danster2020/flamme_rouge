import React from 'react'
import { BikerType } from './Game'

export default function CardDecks({ G, onRslotClick, onSslotClick, playerID }) {

    const deckClass = "w-24 h-36 p-2 rounded-md border-4 border-gray-800 m-4 bg-gray-300"

    return (
        <div className="fixed bottom-0 left-0 z-20">
            <div className="relative flex text-3xl">
                <button onClick={() => onRslotClick(BikerType.ROULEUR)} className={deckClass}>
                    <div className='p-2 h-full flex items-center justify-center border-2 border-dashed border-gray-800'>
                        R {G.players[playerID].cardR}
                    </div>
                </button>
                <button onClick={() => onSslotClick(BikerType.SPRINTEUR)} className={deckClass}>
                    <div className='p-2 h-full flex items-center justify-center border-2 border-dashed border-gray-800'>
                        S {G.players[playerID].cardS}
                    </div>
                </button>


            </div>
        </div>
    )
}
