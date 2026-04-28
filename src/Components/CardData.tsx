import type { CardType } from "../types/card"
import AbilitiesContainer from "./AbilitiesContainer";
import KeywordsContainer from "./KeywordsContainer";

type CardDataProps = {
  cardData: CardType;
};

export default function CardData({cardData}: CardDataProps){
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
                {cardData.keywords && <KeywordsContainer keywords={cardData.keywords}/>}
                {cardData.abilities && <AbilitiesContainer abilities={cardData.abilities}/>}
                <p className="">{cardData.franchise}</p>
            </div>
        </div>
    )
}
