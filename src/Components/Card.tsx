import type { CardType } from "../types/card";
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY!
)

export default function Card(props: CardType){
    const [src, setSrc] = useState<string | null>(null)
    useEffect(() => {
        const path = props.storage_image_path
        const { data } = supabase.storage.from('card-images').getPublicUrl(path)
        setSrc(data.publicUrl)
  }, [])

  if (!src) return null
  return <img className='card-thumbnail' src={src} alt="From bucket"   loading="lazy"
  decoding="async"/>
}

