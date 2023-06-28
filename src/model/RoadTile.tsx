import { Bike } from "./Bike";
import { BikerType } from "./Card";

export class RoadTile {
    nrOfLanes: number
    rotation: number
    bikes: Bike[]

    constructor() {
        this.nrOfLanes = 2
        this.rotation = 0
        this.bikes = []
    }

    // returns true if succesful
    addBike(bike: Bike) {
        if (this.nrOfLanes !== this.bikes.length) {
            this.bikes.push(bike)
            return true
        } else {
            return false
        }
    }

    setNrOfLanes(nr: number) {
        this.nrOfLanes = nr
    }
}