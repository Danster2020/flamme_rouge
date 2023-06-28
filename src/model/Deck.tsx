import { BikerType, Card } from './Card';
import { v4 as uuid } from 'uuid';

export class Deck {
    id: string
    cards: Card[]
    type: BikerType

    constructor(type: BikerType) {
        this.id = uuid()
        this.type = type
        this.cards = Array().fill(null)
    }

    addCard(card: Card) {

        if (this.type === card.type) {
            this.cards.push(card)
        } else {
            console.log("Card wrong type when trying to add to deck!");
        }
    }
}