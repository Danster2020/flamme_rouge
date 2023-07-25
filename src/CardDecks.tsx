import React from 'react'
import { BikerType } from './Game'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function CardDecks({ G, onRslotClick, onSslotClick, playerID }) {

    const deckClass = "w-24 h-36 p-2 rounded-md border-4 border-gray-800 m-4 bg-gray-300"

    const divClass = "p-2 h-full flex items-center justify-center border-2 border-dashed border-gray-800"

    return (
        <div className="fixed bottom-0 left-0 z-20">
            <div className="relative flex text-3xl">
                <div className='flex flex-col'>
                    {/* <FontAwesomeIcon className='text-white' icon={icon({ name: 'clock-rotate-left' })} /> */}
                    <button onClick={() => onRslotClick(BikerType.ROULEUR)} className={deckClass}>
                        <div className={divClass}>
                            R {G.players[playerID].cardR}
                        </div>
                    </button>
                </div>

                <div className='relative flex text-3xl'>
                    {/* <FontAwesomeIcon className='text-white' icon={icon({ name: 'clock-rotate-left' })} /> */}
                    <button onClick={() => onSslotClick(BikerType.SPRINTEUR)} className={deckClass}>
                        <div className={divClass}>
                            S {G.players[playerID].cardS}
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}
