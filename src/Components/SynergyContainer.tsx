import SynergyNameHeader from "./SynergyNameHeader";
import type { SynergySection } from "../types/synergysectiontype";
import type { JSX } from "react";
import CardThumbnail from "./CardThumbnail";


export default function SynergyContainer({synergyName, cards} : SynergySection){

    const cardThumbnailsArray = cards.map((card)=> {
        return(
            <CardThumbnail card={card}/>
        )
    })


    return (
        <>
            <SynergyNameHeader>{synergyName}</SynergyNameHeader>
            <div className="card-display-container">
                {cardThumbnailsArray}
            </div>
            
        </>
    )
}