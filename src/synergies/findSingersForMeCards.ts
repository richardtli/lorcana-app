import type { CardType } from "../types/card";
import { supabase } from "../lib/supabase";
import { lorcana_cards_table } from "../lib/table_names";
import filterQuery from "../utils/filterQuery";

export default async function findSingersForMeCards(
  selectedCard: CardType,
  searchParams: URLSearchParams,
): Promise<CardType[]> {

    if(selectedCard.type !== 'Action - Song'){
        return []
    }
    const selectedCost = selectedCard.cost


let query = supabase
  .from(lorcana_cards_table)
  .select("*")
  .eq("is_a_singer", true);

if (!selectedCard.can_sing_together) {
  query = query
    .lt("cost", selectedCost)
    .gte("sing_value", selectedCost);
}
    


    

query = filterQuery(searchParams, query)

  const { data, error } = await query;

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}