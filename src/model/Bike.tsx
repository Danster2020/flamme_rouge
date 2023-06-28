import { v4 as uuid } from 'uuid';
import { BikerType } from './Card';

export class Bike {
    id: string
    type: BikerType;

    constructor(type: BikerType) {
        this.id = uuid()
        this.type = type
    }

}