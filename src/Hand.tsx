import React from 'react'

import cardArtNormal from "./assets/img/card_art_normal.png"

export const Hand = ({ G, playerID, onCardClick }) => {
    return (
        <div className="fixed bottom-0 w-full z-10">
            <div className="relative flex justify-center gap-2 mb-8">
                {G.players[playerID]?.hand.map((card, index: number) =>
                    <button onClick={() => onCardClick(index)} key={index}
                        className="flex items-center content-center w-28 h-40 bg-white border-8 border-white text-white text-4xl rounded-lg shadow-md hover:outline hover:outline-2 hover:outline-yellow-400 hover:animate-pulse">
                        <div className="w-full h-full">
                            <div className='flex h-full items-center content-center rounded-md' style={{ backgroundImage: `url(${cardArtNormal})`, backgroundPosition: 'center', backgroundSize: "110%" }}>
                                <div className='mx-auto'>{card}</div>
                            </div>
                        </div>
                    </button>
                )}
            </div>
        </div>
    )
}
