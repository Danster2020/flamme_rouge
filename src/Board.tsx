import { useEffect, useState } from "react";
import { BikerType, Player } from "./Game";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useEffectListener } from "bgio-effects/dist/react";
import { StateBar } from "./StateBar";
import toast, { Toaster } from "react-hot-toast";
import Confetti from 'react-confetti'
import { PlayerList } from "./PlayerList";
import { RoadTile } from "./RoadTile";

import roadImg from "./assets/img/road.jpg"
import backgroundImg from "./assets/img/grass.jpg"
import CardDecks from "./CardDecks";


export function BoardFlammeRouge({ ctx, G, moves, playerID, events }) {

    const onRoadTileClick = (id) => moves.selectBikeStart(id);
    const onRslotClick = (BikerType: BikerType) => moves.drawForBikeR(BikerType);
    const onSslotClick = (BikerType: BikerType) => moves.drawForBikeR(BikerType);
    const onCardClick = (index: number) => moves.selectCard(index);

    const [moveObj, setMoveObj] = useState(null)

    const [testPhase, setTestPhase] = useState("")

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

                    <CardDecks G={G} onRslotClick={onRslotClick} onSslotClick={onSslotClick} playerID={playerID} ></CardDecks>

                    <div className="pt-20 pl-10 w-screen h-screen" style={{ backgroundImage: `url(${backgroundImg})` }}>
                        <div className="flex m-2">
                            {G.road.map((roadTile, index: number) =>

                                <div onClick={() => onRoadTileClick(index)} key={index} className="w-20 h-10" >
                                    <ul className="flex flex-col-reverse" style={{ backgroundImage: `url(${roadImg})`, backgroundPosition: 'center', backgroundSize: "200%" }}>
                                        {[...Array(roadTile.lanes)].map((lane, laneIndex: number) =>

                                            <RoadTile laneIndex={laneIndex} index={index} moveObj={moveObj} roadTile={roadTile} getBikeName={getBikeName}></RoadTile>

                                        )}
                                    </ul>
                                </div>

                            )}

                        </div>
                    </div>
                </TransformComponent>
            </TransformWrapper>



            <div className="fixed bottom-0 w-full z-10">
                <div className="relative flex justify-center gap-2 mb-4">
                    {G.players[playerID]?.hand.map((card, index: number) =>
                        <button onClick={() => onCardClick(index)} key={index} className="block w-24 h-36 bg-gray-400 rounded-lg text-white shadow-md">
                            <span className="ml-2">{card}</span>
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}