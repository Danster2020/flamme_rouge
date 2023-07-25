import { useEffectListener, useLatestPropsOnEffect } from 'bgio-effects/react';

import cardArtNormal from "./assets/img/card_art_normal.png"
import { getBikeType } from './model/Bike'

export const Hand = ({ playerID, onCardClick }) => {

    const { G } = useLatestPropsOnEffect("bikeMoved", "exhaustion");

    const cardType = () => {

        let letter = ""

        if (G.players[playerID].selectingR) {
            letter = "R"
        } else {
            letter = "S"
        }

        return (
            <>
                <div className='absolute text-3xl px-1 rounded-b-md text-white border-x-2 border-b-2 border-black bg-rose-800 italic top-0 right-2'>{letter}</div>
            </>
        )

    }

    return (
        <div className="fixed bottom-0 w-full z-20">
            <div className="relative flex justify-center gap-2 mb-8">
                {G.players[playerID]?.hand.map((card, index: number) =>
                    <button onClick={() => onCardClick(index)} key={index}
                        className="flex hover:card_animation items-center content-center w-28 h-40 bg-white border-8 border-white text-white text-4xl rounded-lg shadow-md hover:outline hover:outline-2 hover:outline-yellow-400">
                        <div className="w-full h-full">
                            <div className='relative flex h-full items-center content-center rounded-md' style={{ backgroundImage: `url(${cardArtNormal})`, backgroundPosition: 'center', backgroundSize: "110%" }}>
                                {cardType()}
                                <div className='mx-auto'>{card}</div>
                            </div>
                        </div>
                    </button>
                )}
            </div>
        </div>
    )
}
