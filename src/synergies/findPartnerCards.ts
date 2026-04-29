import type { CardType } from "../types/card";
import { supabase } from "../lib/supabase";
import { lorcana_cards_table } from "../lib/table_names";
import filterQuery from "../utils/filterQuery";

export default async function findPartnerCards(
  selectedCard: CardType,
  searchParams: URLSearchParams,
): Promise<CardType[]> {


const mentionedNames = selectedCard.specific_mentions ?? [];

const partnerFilters = [
  ...mentionedNames.map((name) => `base_name.eq."${name}"`),
  `specific_mentions.cs.{"${selectedCard.base_name}"}`,
];

let query = supabase
  .from(lorcana_cards_table)
  .select("*")
  .or(partnerFilters.join(","))
  .neq("unique_id", selectedCard.unique_id);

  query = filterQuery(searchParams, query)

  const { data, error } = await query;

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}