import { useEffect, useState } from "react";
import { BikerType, Player } from "./Game";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useEffectListener } from "bgio-effects/dist/react";
import { StateBar } from "./StateBar";
import toast, { Toaster } from "react-hot-toast";
import Confetti from 'react-confetti'
import { PlayerList } from "./PlayerList";
import { RoadTile } from "./RoadTile";

import backgroundImg from "./assets/img/grass.jpg"
import CardDecks from "./CardDecks";
import { Hand } from "./Hand";
import { getRoadTile, tileHasProperty } from "./model/Road";
import { RecDeckDialog } from "./RecDeckDialog";


export function BoardFlammeRouge({ ctx, G, moves, playerID, events }) {

    const onRoadTileClick = (id) => moves.selectBikeStart(id);
    const onRslotClick = (BikerType: BikerType) => moves.drawForBikeR(BikerType);
    const onSslotClick = (BikerType: BikerType) => moves.drawForBikeR(BikerType);
    const onCardClick = (index: number) => moves.selectCard(index);

    const [moveObj, setMoveObj] = useState(null)

    useEffectListener('bikeMoved', (obj) => {
        setMoveObj(obj)

        // required to delay moves
        const timer = setTimeout(() => {
            if (playerID === "0") {
                events.endPhase()
            }

        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffectListener('exhaustion', (obj) => {

        let bikeTypeString = ""
        if (obj.bikeType === BikerType.ROULEUR) {
            bikeTypeString = "Rouleur"
        } else {
            bikeTypeString = "Sprinteur"
        }

        toast("Spelare" + (obj.playerID + 1) + " " + bikeTypeString + " utmattas.", {
            icon: '😥',
        });

    }, []);


    useEffectListener('effects:end', () => {
        setMoveObj(null)
    }, []);

    useEffect(() => {
        console.log("moveObj updated:", moveObj);
    }, [moveObj]);

    function getBikeName(bikeID: string) {
        const players: { [key: string]: Player } = G.players;

        for (const playerID in players) {
            const player = players[playerID];
            if (player.bikeR_ID === bikeID) {
                return `${player.name}_R`;
            } else if (player.bikeS_ID === bikeID) {
                return `${player.name}_S`;
            }
        }

        return null;
    }

    return (
        <>
            {ctx.gameover ? <Confetti /> : null}

            <Toaster position="bottom-center" />




            <StateBar></StateBar>

            <PlayerList></PlayerList>


            <TransformWrapper doubleClick={{ disabled: true }}>
                <TransformComponent>


                    <div className="pt-20 pl-10 w-screen h-screen" style={{ backgroundImage: `url(${backgroundImg})` }}>
                        <div className="flex w-[71rem] flex-wrap mt-2">
                            {G.road.map((roadTile, index: number) =>

                                <>
                                    {tileHasProperty(roadTile, "goal") && !tileHasProperty(getRoadTile(G, index - 1), "goal") ?
                                        <div className="bg-white flex flex-col justify-center rounded-lg mb-8">
                                            <div className="rotate-90 text-center font-semibold tracking-wide w-full">Goal</div>
                                        </div>
                                        :
                                        null
                                    }
                                    <div onClick={() => onRoadTileClick(index)} key={index} className="" >
                                        <ul className="flex flex-col-reverse mb-8 bg-gray-400">
                                            {[...Array(roadTile.lanes)].map((lane, laneIndex: number) =>

                                                <RoadTile laneIndex={laneIndex} index={index} moveObj={moveObj} roadTile={roadTile} getBikeName={getBikeName}></RoadTile>,

                                            )}
                                        </ul>
                                    </div>
                                    {tileHasProperty(roadTile, "start") && !tileHasProperty(getRoadTile(G, index + 1), "start") ?
                                        <div className="bg-white flex flex-col justify-center rounded-lg mb-8">
                                            <div className="rotate-90 text-center font-semibold tracking-wide w-full">Start</div>
                                        </div>
                                        :
                                        null
                                    }


                                </>

                            )}

                        </div>
                    </div>
                </TransformComponent>
            </TransformWrapper>

            <CardDecks G={G} onRslotClick={onRslotClick} onSslotClick={onSslotClick} playerID={playerID} ></CardDecks>

            <Hand G={G} playerID={playerID} onCardClick={onCardClick}></Hand>
        </>
    );
}