import { useEffectListener, useLatestPropsOnEffect } from 'bgio-effects/react';
import { useEffect, useState } from 'react';

export const StateBar = () => {
    const { G, ctx, playerID } = useLatestPropsOnEffect("bikeMoved", "exhaustion");

    const phaseDisplay = () => {

        if (ctx.phase === "gameSetup") {
            return "Placera cyklar"
        }
        else if (ctx.phase === "energy") {
            return "Dra kort 🖐️"
        }
        else if (ctx.phase === "slipStream") {
            return "Slip stream ⚡"
        }
        else if (ctx.phase === "movement") {
            return "Movement 🚲"
        }
        else if (ctx.phase === "exhaustion") {
            return "Exhaustion 💨"
        }
        else {
            return null
        }
    }

    return (
        <div className="fixed top-0 w-full z-10">
            <div className="relative flex justify-center gap-2 mb-4 ">
                <div className="bg-blue-200 p-2 text-xl">Phase: <span className='font-bold'>{phaseDisplay()}</span></div>
            </div>
        </div>
    )
}
