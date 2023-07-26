import { useLatestPropsOnEffect } from 'bgio-effects/react';
import { BikeSprite } from './BikeSprite';

import roadImg from "./assets/img/asphalt.jpg"
import { getRoadTile, tileHasProperty } from './model/Road';

export const RoadTile = (props: { laneIndex, index, moveObj, exhaustionObj, roadTile, getBikeName }) => {

    const { G, ctx, playerID } = useLatestPropsOnEffect('bikeMoved', "exhaustion", "effects:end");

    function displayEffect() {

        if (ctx.phase === "slipStream") {
            return "slip_stream_tile"
        }
        else if (ctx.phase === "movement") {
            return "movement_tile"
        }
        else if (ctx.phase === "exhaustion") {
            return "exhaustion_tile"
        }
        else {
            return null
        }

    }

    function displayAnimation() {

        if (ctx.phase === "slipStream") {
            return "animate_slip_stream"
        }

        return "animate_movement"
    }

    return (
        <>
            <li key={props.laneIndex} style={{ backgroundImage: `url(${roadImg})`, backgroundPosition: 'center', backgroundSize: "170%" }}
                className={`flex w-16 h-6 border-r-2 border-r-white border-b-2 border-b-gray-400 text-white bg-gray-400
                    ${props.moveObj !== null && props.index === props.moveObj.currentBikePos && props.laneIndex === props.moveObj.currentBikeLane ?
                        displayEffect()
                        :
                        "border-gray-900"
                    } 
                    ${props.exhaustionObj !== null && props.exhaustionObj.position === props.index && props.exhaustionObj.lane === props.laneIndex ?
                        displayEffect()
                        :
                        ""
                    }
                    ${props.moveObj !== null && props.index === props.moveObj.targetBikePos && props.laneIndex === props.moveObj.targetBikeLane ?
                        displayAnimation()
                        :
                        ""
                    }
                `} >
                {props.roadTile.bikes[props.laneIndex] ?
                    <BikeSprite G={G} ctx={ctx} bike_ID={props.roadTile.bikes[props.laneIndex]}></BikeSprite>
                    :
                    ""
                }
            </li>
        </>
    )
}
