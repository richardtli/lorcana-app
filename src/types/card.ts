export type CardType = {
  id: string
  unique_id: string
  set_name: string
  set_id: string
  set_num: number
  card_num: number
  name: string
  full_name: string
  type: string
  color: string
  rarity: string
  artist: string
  franchise: string
  gamemode: string
  classification_text: string
  classifications: string[]
  abilities: any | null
  body_text: string
  flavor_text: string
  cost: number
  inkable: boolean
  lore: number
  strength: number
  willpower: number
  image_url: string
  storage_bucket: string
  storage_image_path: string
  date_added: string
  date_modified: string
}