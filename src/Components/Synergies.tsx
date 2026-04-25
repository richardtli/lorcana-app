import type { JSX } from "react";
import type { CardType } from "../types/card"
import CardThumbnail from "./CardThumbnail";
type SynergiesProps = {
  relatedCardObjects: CardType[];
};

export default function Synergies({ relatedCardObjects }: SynergiesProps){
    const CardElementsArray: JSX.Element[]= relatedCardObjects.map((card: CardType) => {
            return (<CardThumbnail {...card}/>)
        })
    return (
        <div>
            {CardElementsArray}
        </div>
    )
}