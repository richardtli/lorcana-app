export const LORCANA_KEYWORDS = [
  "Alert",
  "Bodyguard",
  "Challenger",
  "Evasive",
  "Reckless",
  "Resist",
  "Rush",
  "Shift",
  "Sing Together",
  "Singer",
  "Support",
  "Vanish",
  "Ward",
] as const

export type LorcanaKeyword = (typeof LORCANA_KEYWORDS)[number];