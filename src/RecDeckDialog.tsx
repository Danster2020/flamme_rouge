import React, { useEffect, useState } from 'react'

export const RecDeckDialog = ({ boolean, cardsArray }) => {

    const [dialogState, setDialogState] = useState(true)

    useEffect(() => {
        setDialogState(boolean);
    }, [boolean]);

    return (
        <dialog open={dialogState} className="fixed bg-white top-1/2 z-50 rounded-md">
            <button className='bg-red-200 p-2 rounded-full' onClick={() => setDialogState(false)}>X</button>
            <div>
                <span className='text-lg font-semibold'>Returlek Rouleur</span>
                <ul>
                    {cardsArray.map((card, index: number) =>
                        <li>{card}</li>
                    )}
                </ul>
            </div>
        </dialog>
    )
}
