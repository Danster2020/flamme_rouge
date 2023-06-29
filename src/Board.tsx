import { BikerType, Player } from "./Game";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export function BoardFlammeRouge({ ctx, G, moves, playerID, events }) {

    const onClick = (id) => moves.clickCell(id);

    const onRoadTileClick = (id) => moves.selectBikeStart(id);
    const onRslotClick = (BikerType: BikerType) => moves.drawForBikeR(BikerType);
    const onSslotClick = (BikerType: BikerType) => moves.drawForBikeR(BikerType);
    const onCardClick = (index: number) => moves.selectCard(index);


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


    let winner;
    if (ctx.gameover) {
        winner =
            ctx.gameover.winner !== undefined ? (
                <div id="winner">Winner: {ctx.gameover.winner}</div>
            ) : (
                <div id="winner">Draw!</div>
            );
    }

    const cellStyle = {
        border: '1px solid #555',
        width: '50px',
        height: '50px',
        lineHeight: '50px',
    };

    let tbody = [];
    for (let i = 0; i < 3; i++) {
        let cells = [];
        for (let j = 0; j < 3; j++) {
            const id = 3 * i + j;
            cells.push(
                <td key={id}>
                    {G.cells[id] ?
                        <div style={cellStyle}>{G.cells[id]}</div>
                        :
                        <button style={cellStyle} onClick={() => onClick(id)} />
                    }
                </td>
            );
        }
        tbody.push(<tr key={i}>{cells}</tr>);
    }

    return (
        <>

            <div className="fixed top-0 w-full z-10">
                <div className="relative flex justify-center gap-2 mb-4">
                    <div>player: {playerID} Phase: {ctx.phase}</div>
                </div>
            </div>

            <div>
                <table id="board">
                    <tbody>{tbody}</tbody>
                </table>
                {winner}
            </div>

            <TransformWrapper doubleClick={{ disabled: true }}>
                <TransformComponent>
                    <div className="bg-green-100 w-screen h-screen">
                        <div className="flex m-2">
                            {G.road.map((roadTile, index: number) =>

                                <div onClick={() => onRoadTileClick(index)} key={index} className="w-20 h-10">
                                    <ul className="flex flex-col-reverse">
                                        {[...Array(roadTile.lanes)].map((lane, laneIndex: number) =>

                                            <li key={laneIndex} className="w-20 h-10 border-2 border-gray-900 bg-gray-400 text-white">
                                                {roadTile.bikes[laneIndex] ? <span>{getBikeName(roadTile.bikes[laneIndex])}</span> :
                                                    <span>-</span>

                                                }
                                            </li>

                                        )}
                                    </ul>
                                </div>

                            )}

                        </div>
                    </div>
                </TransformComponent>
            </TransformWrapper>



            <div className="fixed bottom-0 left-0 z-20">
                <div className="relative flex">
                    <button onClick={() => onRslotClick(BikerType.ROULEUR)} className="w-24 h-36 border-2 border-gray-400 m-4">
                        R {G.players[playerID].cardR}
                    </button>
                    <button onClick={() => onSslotClick(BikerType.SPRINTEUR)} className="w-24 h-36 border-2 border-gray-400 m-4">
                        S {G.players[playerID].cardS}
                    </button>
                </div>
            </div>

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