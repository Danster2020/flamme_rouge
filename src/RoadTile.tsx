import { useLatestPropsOnEffect } from 'bgio-effects/react';
import { BikeSprite } from './BikeSprite';



export const RoadTile = (props: { laneIndex, index, moveObj, roadTile, getBikeName }) => {

    const { G, ctx, playerID } = useLatestPropsOnEffect('bikeMoved', "effects:end");

    function displayEffect() {

        if (ctx.phase === "slipStream") {
            return "bg-blue-600"
        }

        return "bg-yellow-300"
    }

    function displayAnimation() {

        if (ctx.phase === "slipStream") {
            return "animate_slip_stream"
        }

        return "animate_movement"
    }

    return (
        <li key={props.laneIndex} className={`flex w-20 h-10 border-r-2 border-r-white border-b-2 border-b-gray-400 text-white
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
