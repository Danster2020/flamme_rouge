import { useEffectListener, useLatestPropsOnEffect } from 'bgio-effects/react';
import { useEffect, useState } from 'react';

export const StateBar = () => {
    const { G, ctx, playerID } = useLatestPropsOnEffect("bikeMoved", "exhaustion");

    const phaseDisplay = () => {

        if (ctx.phase === "gameSetup") {
            return "Cyklistplacering"
        }
        else if (ctx.phase === "energy") {
            return "Kortdragning 🖐️"
        }
        else if (ctx.phase === "slipStream") {
            return "Slipstream ⚡"
        }
        else if (ctx.phase === "movement") {
            return "Förflyttning 🚲"
        }
        else if (ctx.phase === "exhaustion") {
            return "Utmattning 💨"
        }
        else {
            return "Spelet avslutat"
        }
    }

    return (
        <div className="fixed top-0 w-full z-10">
            <div className="relative flex justify-center gap-2">
                <div className="relative text-gray-300 bg-amber-900 border-2 border-amber-950 p-2 text-xl rounded-b-lg shadow-inner">
                    <span className='font-bold'>{phaseDisplay()}</span>
                </div>
            </div>
            <div className="relative flex justify-center">
                <div className='text-sm text-gray-300 bg-amber-900 border-2 border-amber-950 rounded-xl p-y px-3 -m-2 shadow-inner'>Fas</div>
            </div>
        </div>
    )
}
