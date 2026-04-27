import type { CardType } from "../types/card";
import { supabase } from "../lib/supabase";
import { lorcana_cards_table } from "../lib/table_names";
import filterQuery from "../utils/filterQuery";

export default async function findMentionsPrincessCards(
  selectedCard: CardType,
  searchParams: URLSearchParams,
): Promise<CardType[]> {

    const mentionsPrincess: boolean = selectedCard.mentions_princess
    const isAPrincess: boolean = selectedCard.classifications?.includes('Princess')

    if(!mentionsPrincess && !isAPrincess){
        return []
    }

let query = supabase
  .from(lorcana_cards_table)
  .select("*");

if (isAPrincess && mentionsPrincess) {
  query = query.or(
    'mentions_princess.eq.true,classifications.cs.{"Princess"}',
  );
} else if (isAPrincess) {
  query = query.eq("mentions_princess", true);
} else if (mentionsPrincess) {
  query = query.contains("classifications", ["Princess"]);
}

    
    query = filterQuery(searchParams, query)


  const { data, error } = await query;

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}