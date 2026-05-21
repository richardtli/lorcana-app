import type { JSX } from "react";
import SynergyContainer from "./SynergyContainer";
import type { SynergySection } from "../types/synergysectiontype";


type SynergiesDisplayProps = {
    synergySectionsArray: SynergySection[]
};

export default function SynergiesDisplay({ synergySectionsArray }: SynergiesDisplayProps){

const synergySectionsElements = synergySectionsArray
    .filter((section: SynergySection): boolean => section.cards.length > 0)
    .map((section: SynergySection): JSX.Element => {
        const resultKey = section.cards.map((card) => card.unique_id).join("-");

        return (
            <SynergyContainer
                key={`${section.synergyName}-${section.totalCards}-${resultKey}`}
                synergyName={section.synergyName}
                cards={section.cards}
                totalCards={section.totalCards}
                loadAllCards={section.loadAllCards}
            />
        )
    })

    // const cardElementsArray: JSX.Element[]= relatedCardObjects.map((card: CardType) => {
    //         return (<CardThumbnail {...card}/>)
    //     })
    return (
        <>
        {synergySectionsElements}
        </>
    )
}   
