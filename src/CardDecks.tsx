import React, { useRef, useState } from 'react'
import { BikerType } from './Game'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { RecDeckDialog } from './RecDeckDialog'

export default function CardDecks({ G, onRslotClick, onSslotClick, playerID }) {

    const deckClass = "w-24 h-36 p-2 rounded-md border-4 border-gray-800 m-4 bg-gray-300"

    const divClass = "p-2 h-full flex items-center justify-center border-2 border-dashed border-gray-800"


    function getRecycleDeck(bikeType) {

        let arr = []

        if (bikeType == BikerType.ROULEUR) {
            G.players[playerID].recyDeckR.forEach(card => {
                arr.push(card)
            });
        } else {
            G.players[playerID].recyDeckS.forEach(card => {
                arr.push(card)
            });
        }

        return arr
    }


    // Dialog
    const [modalContent, setModalContent] = useState(null);

    const dialogRef = useRef(null);

    const handleOpenDialog = (modalText, array) => {
        if (dialogRef.current) {
            setModalContent({ modalText, array });
            dialogRef.current.showModal();
        }
    };

    const handleCloseDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
    };

    return (
        <>
            <RecDeckDialog dialogRef={dialogRef} onClose={handleCloseDialog} modalText={modalContent?.modalText} array={modalContent?.array}></RecDeckDialog>

            <div className="fixed bottom-0 left-0 z-20">
                <div className="relative flex text-3xl">


                    <div className='flex flex-col'>
                        <button className='self-center' onClick={() => handleOpenDialog("Rouleur", getRecycleDeck(BikerType.ROULEUR))}>
                            <FontAwesomeIcon className='text-white text-2xl bg-amber-900 p-2 border-2 rounded-full shadow-2xl' icon={icon({ name: 'clock-rotate-left' })} />
                        </button>
                        <button onClick={() => onRslotClick(BikerType.ROULEUR)} className={deckClass}>
                            <div className={divClass}>
                                R {G.players[playerID].cardR}
                            </div>
                        </button>
                    </div>

                    <div className='flex flex-col'>
                        <button className='self-center' onClick={() => handleOpenDialog("Sprinteur", getRecycleDeck(BikerType.SPRINTEUR))}>
                            <FontAwesomeIcon className='text-white text-2xl bg-amber-900 p-2 border-2 rounded-full shadow-2xl' icon={icon({ name: 'clock-rotate-left' })} />
                        </button>
                        <button onClick={() => onSslotClick(BikerType.SPRINTEUR)} className={deckClass}>
                            <div className={divClass}>
                                S {G.players[playerID].cardS}
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </>

    )
}
