import { useLatestPropsOnEffect } from 'bgio-effects/react';

export const PlayerList = () => {
    const { G, ctx, playerID } = useLatestPropsOnEffect('bikeMoved');

    return (
        <>



            <div className='fixed top-0 left-0 z-10'>
                <ul className='relative flex flex-col m-2'>
                    {[...Array(ctx.numPlayers)].map((test, index: number) =>
                        <li className='mb-2' key={index}>
                            <div className='flex items-center pl-2 bg-white rounded-md shadow-lg'>
                                <span className='block w-4 h-4  bg-green-400 rounded-full'></span>
                                <span className='ml-2'>Player {index}</span>

                                {ctx.activePlayers[index] === "selectedCards" ?
                                    <span className='ml-2 py-1 w-7 bg-green-500 text-white text-center rounded-r-md'>✓</span>
                                    :
                                    <span className='ml-2 py-1 w-7 bg-slate-500 text-white text-center rounded-r-md'>-</span>
                                }

                            </div>
                        </li>

                    )}
                </ul>
            </div>







        </>
    )
}
