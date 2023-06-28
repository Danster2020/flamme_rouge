import { v4 as uuid } from 'uuid';

export enum BikerType {
    ROULEUR,
    SPRINTEUR,
}

export class Card {
    id: string
    value: number
    type: BikerType

    constructor(value: number, type: BikerType) {
        this.id = uuid()
        this.value = value
        this.type = type
    }
}