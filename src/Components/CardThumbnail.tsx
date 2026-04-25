import type { CardType } from "../types/card";
import { Link, useSearchParams } from "react-router-dom";

export default function Card(props: CardType){
  const [searchParams] = useSearchParams()

  const imagePathBaseURL = import.meta.env.VITE_IMAGE_BUCKET_BASE_URL
  const imagePathFull = `${imagePathBaseURL}/${props.storage_image_path}`
  return (
    <Link to={`../card/${props.unique_id}?${searchParams.toString()}`}>
      <img className='card-thumbnail' src={imagePathFull} alt="card-image" />
    </Link>
  )
}

