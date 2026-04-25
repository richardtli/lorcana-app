import type { CardType } from "../types/card";
import { Link } from "react-router-dom";

export default function Card(props: CardType){
  const imagePathBaseURL = import.meta.env.VITE_IMAGE_BUCKET_BASE_URL
  const imagePathFull = `${imagePathBaseURL}/${props.storage_image_path}`
  return (
    <Link to={`../card/${props.unique_id}`}>
      <img className='card-thumbnail' src={imagePathFull} alt="card-image"   loading="lazy"
      decoding="async"/>
    </Link>
  )
}

