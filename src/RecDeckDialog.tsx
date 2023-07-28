import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

export const RecDeckDialog = ({ dialogRef, onClose, modalText, array }) => {

    const handleDialogButtonClick = () => {
        onClose(); // Call the onClose function to close the dialog
    };


    return (
        <dialog ref={dialogRef} className="fixed w-72 bg-white top-1/6 z-50 p-2 rounded-md">
            <div className='flex justify-between'>
                <span className='text-lg font-semibold ml-4 mr-4 mt-4'>Recirkulerade kort {modalText}</span>
                <button onClick={handleDialogButtonClick}>
                    <FontAwesomeIcon className='bg-blue-200 w-6 h-6 m-2 p-1 rounded-full' icon={icon({ name: 'xmark' })} />
                </button>
            </div>
            <ul className='flex flex-wrap m-4'>
                {array?.length === 0 && <li>Inga kort recirkulerade...</li>}
                {array?.map((card, index: number) =>
                    <li className='bg-gray-200 p-1 m-2 rounded-sm'>{card}</li>
                )}
            </ul>
        </dialog>
    )
}
