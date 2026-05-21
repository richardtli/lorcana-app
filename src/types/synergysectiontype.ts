import type { CardType } from "./card"

export type SynergySection =  {
    synergyName: string
    cards: CardType[]
    totalCards: number
    loadAllCards?: () => Promise<CardType[]>
}

export type SynergyCardsResult = {
    cards: CardType[]
    totalCards: number
}
