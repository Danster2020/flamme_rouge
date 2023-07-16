import { useLatestPropsOnEffect } from 'bgio-effects/react';
import { BikeSprite } from './BikeSprite';



export const RoadTile = (props: { laneIndex, index, moveObj, roadTile, getBikeName }) => {

    const { G, ctx, playerID } = useLatestPropsOnEffect('bikeMoved', "effects:end");

    function displayEffect() {

        if (ctx.phase === "slipStream") {
            return "border-blue-600"
        }

        return "border-yellow-300"
    }

    function displayAnimation() {

        if (ctx.phase === "slipStream") {
            return "animate_slip_stream"
        }

        return "animate_movement"
    }

    return (
        <li key={props.laneIndex} className={`w-20 h-10 border-2 bg-gray-400 text-white
        ${props.moveObj !== null && props.index === props.moveObj.currentBikePos && props.laneIndex === props.moveObj.currentBikeLane ? (
                displayEffect()
            ) : (
                "border-gray-900"
            )} 
        ${props.moveObj !== null && props.index === props.moveObj.targetBikePos && props.laneIndex === props.moveObj.targetBikeLane ? (
                displayAnimation()
            ) : (
                ""
            )}
        `} >
            {props.roadTile.bikes[props.laneIndex] ?
                <BikeSprite G={G} ctx={ctx} bike_ID={props.roadTile.bikes[props.laneIndex]}></BikeSprite>
                :
                ""
            }
        </li>
    )
}
