import bike_red_r from "./assets/img/bike_red_r.png"
import bike_red_s from "./assets/img/bike_red_s.png"
import bike_blue_r from "./assets/img/bike_blue_r.png"
import bike_blue_s from "./assets/img/bike_blue_s.png"
import bike_green_r from "./assets/img/bike_green_r.png"
import bike_green_s from "./assets/img/bike_green_s.png"
import bike_yellow_r from "./assets/img/bike_yellow_r.png"
import bike_yellow_s from "./assets/img/bike_yellow_s.png"
import bike_pink_r from "./assets/img/bike_pink_r.png"
import bike_pink_s from "./assets/img/bike_pink_s.png"

import { getPlayerID } from "./model/Player"
import { getBikeType } from "./model/Bike"
import { BikerType } from "./Game"

export const BikeSprite = ({ G, ctx, bike_ID }) => {

    function bikeColor() {

        const playerID = getPlayerID(G, ctx, bike_ID).toString()
        const bikeType = getBikeType(G, ctx, bike_ID)

        if (playerID === "0") {
            if (bikeType === BikerType.ROULEUR) {
                return bike_red_r
            } else {
                return bike_red_s
            }
        }
        if (playerID === "1") {
            if (bikeType === BikerType.ROULEUR) {
                return bike_blue_r
            } else {
                return bike_blue_s
            }
        }
        if (playerID === "2") {
            if (bikeType === BikerType.ROULEUR) {
                return bike_green_r
            } else {
                return bike_green_s
            }
        }
        if (playerID === "3") {
            if (bikeType === BikerType.ROULEUR) {
                return bike_yellow_r
            } else {
                return bike_yellow_s
            }
        }
        if (playerID === "4") {
            if (bikeType === BikerType.ROULEUR) {
                return bike_pink_r
            } else {
                return bike_pink_s
            }
        }
    }

    return (
        <img src={bikeColor()} alt="bike" />
    )
}
