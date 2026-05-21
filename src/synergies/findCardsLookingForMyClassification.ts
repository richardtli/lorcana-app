import type { CardType } from "../types/card";
import type { SynergyCardsResult } from "../types/synergysectiontype";
import { supabase } from "../lib/supabase";
import { lorcana_cards_table } from "../lib/table_names";
import filterQuery from "../utils/filterQuery";

export default async function findCardsLookingForMyClassification(
  selectedCard: CardType,
  searchParams: URLSearchParams,
  classification: string,
  limitResults = true,
): Promise<SynergyCardsResult> {

    const isClassification: boolean = selectedCard.classifications?.includes(classification)
    const classificationLowerCase = classification.toLowerCase()
    const showLimit = Number(import.meta.env.VITE_SHOW_LIMIT ?? 15)


    if(!isClassification){
        return { cards: [], totalCards: 0 }
    }

let query = supabase
  .from(lorcana_cards_table)
  .select("*", { count: "exact" });



query = query.eq(`mentions_${classificationLowerCase}`, true);

    query = filterQuery(searchParams, query)

    if (limitResults) {
      query = query.limit(showLimit)
    }


  const { data, count, error } = await query;

  if (error) {
    console.error(error);
    return { cards: [], totalCards: 0 };
  }

  return { cards: data ?? [], totalCards: count ?? 0 };
}
