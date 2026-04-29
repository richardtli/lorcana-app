import type { CardType } from "../types/card"
import CardAbilitiesContainer from "./CardAbilitiesContainer";
import CardKeywordsContainer from "./CardKeywordsContainer";
import CardSynergiesContainer from "./CardSynergiesContainer";

type CardDataProps = {
  cardData: CardType;
  synergyNames: string[];
};

export default function CardData({cardData, synergyNames}: CardDataProps){
    const imagePathBaseURL = import.meta.env.VITE_IMAGE_BUCKET_BASE_URL
    const imagePathFull = `${imagePathBaseURL}/${cardData.storage_image_path}`

    return (
        <div className='card-page-info-container'>
            <img
                className='card-page-image'
                data-ink-color={cardData.color[0]?.toLowerCase()}
                data-second-ink-color={cardData.color[1]?.toLowerCase()}
                src={imagePathFull}
            />
            <div className="card-text-info">
                <div className="card-name-block" data-ink-color={cardData.color[0]?.toLowerCase()}>
                    <p className="card-main-name">{cardData.base_name}</p>
                    <p className="card-version-name" data-ink-color={cardData.color[0]?.toLowerCase()}>{cardData.version_name}</p>
                </div>
                {(cardData.keywords || cardData.abilities) && (
                    <section className="card-rules-container" data-ink-color={cardData.color[0]?.toLowerCase()}>
                        {cardData.keywords && <CardKeywordsContainer keywords={cardData.keywords} inkColor={cardData.color[0]}/>}
                        {cardData.abilities && <CardAbilitiesContainer abilities={cardData.abilities} inkColor={cardData.color[0]}/>}
                    </section>
                )}
                {synergyNames.length > 0 && <CardSynergiesContainer synergyNames={synergyNames} inkColor={cardData.color[0]}/>}
                
            </div>
        </div>
    )
}
