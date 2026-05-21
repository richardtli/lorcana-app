import { useState } from "react";
import SynergyNameHeader from "./SynergyNameHeader";
import type { SynergySection } from "../types/synergysectiontype";
import CardThumbnail from "./CardThumbnail";
import { getSynergySectionId } from "../utils/synergySectionId";
import type { CardType } from "../types/card";


export default function SynergyContainer({
    synergyName,
    cards,
    totalCards,
    loadAllCards,
} : SynergySection){
    const [allCards, setAllCards] = useState<CardType[] | null>(null);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [isLoadingAllCards, setIsLoadingAllCards] = useState(false);
    const [loadError, setLoadError] = useState(false);

    const cardThumbnailsArray = cards.map((card)=> {
        return(
            <CardThumbnail key={card.unique_id} card={card}/>
        )
    })

    const hasHiddenCards = totalCards > cards.length && Boolean(loadAllCards);

    async function showAllCards() {
        setIsOverlayOpen(true);

        if (!loadAllCards || allCards || isLoadingAllCards) {
            return;
        }

        setIsLoadingAllCards(true);
        setLoadError(false);

        try {
            setAllCards(await loadAllCards());
        } catch (error) {
            console.error(error);
            setLoadError(true);
        } finally {
            setIsLoadingAllCards(false);
        }
    }

    return (
        <section className="synergy-container" id={getSynergySectionId(synergyName)}>
            <SynergyNameHeader count={totalCards}>{synergyName}</SynergyNameHeader>
            <div className="card-display-container">
                {cardThumbnailsArray}
                {hasHiddenCards && (
                    <button
                        className="show-all-cards-button"
                        type="button"
                        onClick={() => void showAllCards()}
                    >
                        Show all
                    </button>
                )}
            </div>
            {isOverlayOpen && (
                <div
                    className="all-cards-overlay-backdrop"
                    onClick={() => setIsOverlayOpen(false)}
                >
                    <section
                        aria-label={`${synergyName} cards`}
                        className="all-cards-overlay"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <h2 className="all-cards-overlay-heading">
                            {synergyName}
                        </h2>
                        {isLoadingAllCards && (
                            <p className="all-cards-overlay-status">Loading cards...</p>
                        )}
                        {loadError && (
                            <p className="all-cards-overlay-status">
                                Could not load all cards.
                            </p>
                        )}
                        {allCards && (
                            <div className="all-cards-overlay-grid">
                                {allCards.map((card) => (
                                    <CardThumbnail key={card.unique_id} card={card} />
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            )}
        </section>
    )
}
