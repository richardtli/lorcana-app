import type { CardType } from "../types/card";
import { supabase } from "../lib/supabase";
import { lorcana_cards_table } from "../lib/table_names";
import filterQuery from "../utils/filterQuery";

export default async function findSongsForMeCards(
  selectedCard: CardType,
  searchParams: URLSearchParams,
): Promise<CardType[]> {

    if(!selectedCard.is_a_singer){
        return []
    }
    const selectedCost = selectedCard.cost
    const selectedSingNumber = selectedCard.sing_number


let query = supabase
  .from(lorcana_cards_table)
  .select("*")
  .eq("type", "Action - Song")
  .or(
    `and(can_sing_together.eq.false,cost.gt.${selectedCost},cost.lte.${selectedSingNumber}),and(can_sing_together.eq.true,cost.gt.${selectedCost})`,
  );


    

  query = filterQuery(searchParams, query)

  const { data, error } = await query;

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}