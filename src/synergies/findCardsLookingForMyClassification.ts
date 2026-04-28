import type { CardType } from "../types/card";
import { supabase } from "../lib/supabase";
import { lorcana_cards_table } from "../lib/table_names";
import filterQuery from "../utils/filterQuery";

export default async function findCardsLookingForMyClassification(
  selectedCard: CardType,
  searchParams: URLSearchParams,
  classification: string
): Promise<CardType[]> {

    const isClassification: boolean = selectedCard.classifications?.includes(classification)
    const classificationLowerCase = classification.toLowerCase()
    const showLimit = import.meta.env.VITE_SHOW_LIMIT


    if(!isClassification){
        return []
    }

let query = supabase
  .from(lorcana_cards_table)
  .select("*");



query = query.eq(`mentions_${classificationLowerCase}`, true);

    query = filterQuery(searchParams, query)
    query = query.limit(showLimit)


  const { data, error } = await query;

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}