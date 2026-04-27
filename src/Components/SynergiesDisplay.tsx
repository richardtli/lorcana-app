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
        return (
            <SynergyContainer
                synergyName={section.synergyName}
                cards={section.cards}
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