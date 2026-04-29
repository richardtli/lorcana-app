import SynergyNameHeader from "./SynergyNameHeader";
import type { SynergySection } from "../types/synergysectiontype";
import CardThumbnail from "./CardThumbnail";
import { getSynergySectionId } from "../utils/synergySectionId";


export default function SynergyContainer({synergyName, cards, totalCards} : SynergySection){

    const cardThumbnailsArray = cards.map((card)=> {
        return(
            <CardThumbnail card={card}/>
        )
    })

    return (
        <section className="synergy-container" id={getSynergySectionId(synergyName)}>
            <SynergyNameHeader count={totalCards}>{synergyName}</SynergyNameHeader>
            <div className="card-display-container">
                {cardThumbnailsArray}
            </div>
        </section>
    )
}
