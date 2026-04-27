export type CardType = {
  id: string
  unique_id: string
  set_name: string
  set_id: string
  set_num: number
  card_num: number
  name: string
  full_name: string
  base_name: string
  version_name: string
  type: string
  color: string[]
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
  shiftable: boolean
  shift_cost: number | null
  shift_from: string[] | null
  storage_bucket: string
  storage_image_path: string
  date_added: string
  date_modified: string
  specific_mentions: string[] | null
  is_a_singer: boolean
  sing_number: number | null
  can_sing_together: boolean

  mentions_alien: boolean
  mentions_ally: boolean
  mentions_broom: boolean
  mentions_captain: boolean
  mentions_deity: boolean
  mentions_detective: boolean
  mentions_dinosaur: boolean
  mentions_dragon: boolean
  mentions_dreamborn: boolean
  mentions_fairy: boolean
  mentions_floodborn: boolean
  mentions_gargoyle: boolean
  mentions_ghost: boolean
  mentions_giant: boolean
  mentions_hero: boolean
  mentions_hunny: boolean
  mentions_hyena: boolean
  mentions_illusion: boolean
  mentions_inventor: boolean
  mentions_king: boolean
  mentions_knight: boolean
  mentions_madrigal: boolean
  mentions_mentor: boolean
  mentions_musketeer: boolean
  mentions_pirate: boolean
  mentions_prince: boolean
  mentions_princess: boolean
  mentions_puppy: boolean
  mentions_queen: boolean
  mentions_racer: boolean
  mentions_robot: boolean
  mentions_seven_dwarfs: boolean
  mentions_song: boolean
  mentions_sorcerer: boolean
  mentions_storyborn: boolean
  mentions_super: boolean
  mentions_tigger: boolean
  mentions_titan: boolean
  mentions_villain: boolean
  mentions_whisper: boolean
}