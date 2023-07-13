import { useLatestPropsOnEffect } from 'bgio-effects/react';

export const StateBar = () => {
    const { G, ctx, playerID } = useLatestPropsOnEffect('bikeMoved');
    return (
        <div className="fixed top-0 w-full z-10">
            <div className="relative flex justify-center gap-2 mb-4 ">
                <div className="bg-blue-200 p-2 text-xl">Phase: <span className='font-bold'>{ctx.phase}</span></div>
            </div>
        </div>
    )
}
