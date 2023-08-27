import { useLatestPropsOnEffect } from 'bgio-effects/react';
import { useEffect } from 'react';

export const PlayerList = () => {
    const { G, ctx, playerID } = useLatestPropsOnEffect('bikeMoved');

    const doneConditions = ["selectedCards", "hasPlacedBikes"]

    useEffect(() => {
        console.log("playerName:", G.players[playerID].name);
    }, [G])

    function playerColor(index) {
        switch (index) {
            case 0:
                return "bg-red-800"
            case 1:
                return "bg-blue-800"
            default:
                return "bg-gray-400"
        }
    }

    return (
        <>
            <div className='fixed top-0 left-0 z-10'>
                <ul className='relative flex flex-col m-2'>
                    {[...Array(ctx.numPlayers)].map((test, index: number) =>
                        <li className='mb-2 self-start' key={index}>
                            <div className={`flex items-center pl-2 ${playerColor(index)} rounded-md shadow-lg`}>
                                <span className='block w-4 h-4 border-2 border-white bg-green-400 rounded-full'></span>
                                <span className='ml-2 text-white'>{G.players[index].name}</span>

                                {ctx.activePlayers !== null && doneConditions.includes(ctx.activePlayers[index]) ?
                                    <span className='ml-2 py-1 w-7 bg-green-500 border-l-2 border-white text-white text-center rounded-r-md'>✓</span>
                                    :
                                    <span className='ml-2 py-1 w-7 bg-slate-500 border-l-2 border-white text-white text-center rounded-r-md'>-</span>
                                }

                            </div>
                        </li>

                    )}
                </ul>
            </div>
        </>
    )
}
