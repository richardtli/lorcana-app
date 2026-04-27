import type { CardType } from "../types/card";
import { supabase } from "../lib/supabase";
import { lorcana_cards_table } from "../lib/table_names";
import filterQuery from "../utils/filterQuery";

export default async function findShiftIntoCards(
  selectedCard: CardType,
  searchParams: URLSearchParams,
): Promise<CardType[]> {

  if(!selectedCard.shiftable){
    return []
  }

  let query = supabase
    .from(lorcana_cards_table)
    .select("*")
    .eq("base_name", selectedCard.base_name)
    .neq("unique_id", selectedCard.unique_id);
    


query = filterQuery(searchParams, query)

  const { data, error } = await query;

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}