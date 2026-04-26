import type { CardType } from "../types/card";
import { Link, useSearchParams } from "react-router-dom";

type CardThumbnailProps = {
  card: CardType
}

export default function CardThumbnail({card}: CardThumbnailProps){
  const [searchParams] = useSearchParams()

  const imagePathBaseURL = import.meta.env.VITE_IMAGE_BUCKET_BASE_URL
  const imagePathFull = `${imagePathBaseURL}/${card.storage_image_path}`
  return (
    <Link to={`../card/${card.unique_id}?${searchParams.toString()}`}>
      <img className='card-thumbnail' src={imagePathFull} alt="card-image" loading="lazy"
  decoding="async" />
    </Link>
  )
}

