import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { Link } from 'react-router-dom'
import Pdf from './assets/files/Flamme_Rouge_rulebook_SWE_web-3.jpg';

export const RuleBook = () => {
    return (
        <div className="fixed bottom-0 right-0 z-20">
            <div className="relative flex text-3xl">
                <div className='flex flex-col'>
                    <a href={Pdf} target="_blank" className='self-center text-white text-2xl bg-blue-900 px-2 m-4 border-2 rounded-full shadow-2xl'>
                        <FontAwesomeIcon className='' icon={icon({ name: 'question' })} />
                    </a>
                </div>
            </div>
        </div>
    )
}
