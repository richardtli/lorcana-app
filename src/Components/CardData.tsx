import type { CardType } from "../types/card"

type CardDataProps = {
  cardData: CardType;
};

export default function CardData({cardData}: CardDataProps){
    const imagePathBaseURL = import.meta.env.VITE_IMAGE_BUCKET_BASE_URL
    const imagePathFull = `${imagePathBaseURL}/${cardData?.storage_image_path}`

    return (
        <div className='card-page-info-container'>
            <img className='card-page-image' src={imagePathFull} />
            <div className="card-text-info">
                <p className="card-name">{cardData?.full_name}</p>
                <p className="card-body">{cardData?.body_text}</p>
                <p className="card-flavortext">{cardData?.flavor_text}</p>
                <p className="">{cardData?.franchise}</p>
            </div>
        </div>
    )
}