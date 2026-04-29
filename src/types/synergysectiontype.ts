import type { CardType } from "./card"

export type SynergySection =  {
    synergyName: string
    cards: CardType[]
    totalCards: number
}

export type SynergyCardsResult = {
    cards: CardType[]
    totalCards: number
}
