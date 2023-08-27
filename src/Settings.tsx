import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useRef, useState } from 'react';
import { useEffectListener, useLatestPropsOnEffect } from 'bgio-effects/react';

export const Settings = () => {

    const { G, ctx, playerID, moves } = useLatestPropsOnEffect("effects:end");

    const [playerName, setPlayerName] = useState(G.players[playerID].name);

    const handleNameChange = (e) => {
        setPlayerName(e.target.value)
        moves.updateName({ G, playerID, name: playerName });
    }


    // Dialog
    const dialogRef = useRef(null);

    const handleOpenDialog = () => {
        if (dialogRef.current) {
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
            <div className="fixed top-0 right-10 z-20">
                <div className="relative flex text-3xl">
                    <div className='flex flex-col'>
                        <button onClick={() => handleOpenDialog()} className='self-center text-white text-2xl bg-blue-900 px-1 m-4 border-2 rounded-full shadow-2xl'>
                            <FontAwesomeIcon className='' icon={icon({ name: 'cog' })} />
                        </button>
                    </div>
                </div>
            </div>

            <dialog ref={dialogRef} className="fixed w-72 bg-white top-1/6 z-50 p-2 rounded-md">
                <div className='flex justify-between'>
                    <span className='text-lg font-semibold ml-4 mr-4 mt-4'>Inställningar</span>
                    <button onClick={handleCloseDialog}>
                        <FontAwesomeIcon className='bg-blue-200 w-6 h-6 m-2 p-1 rounded-full' icon={icon({ name: 'xmark' })} />
                    </button>

                </div>
                <ul className='flex flex-wrap m-4'>
                    <li className=''>
                        <div>
                            <label htmlFor="name">Namn</label>
                            {/* FIXME name change doesnt update the playerlist */}
                            <input id="name" className='border-2 border-gray-500 rounded-md' type="text" onChange={(e) => handleNameChange(e)} value={playerName} />
                        </div>
                    </li>
                </ul>

            </dialog>
        </>
    )
}
