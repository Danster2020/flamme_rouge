import { RoadTile } from "../Game";

export function getRoadTile(G, index) {

    if (index >= G.road.length) {
        console.log("roadTile out of bounds");
        return null
    }

    return G.road[index]
}

export function getRoadTileIndex(G, roadTile): number {

    for (let i = 0; i < G.road.length; i++) {
        const tile = G.road[i];

        if (tile == roadTile) {
            return i
        }
    }
}

export function resetRoadTile(roadTile) {
    roadTile.bikes = []
}

export function tileHasProperty(roadTile: RoadTile, property: string) {
    return roadTile.properties.includes(property)
}

