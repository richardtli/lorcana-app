import type { CardType } from "../types/card";
import { supabase } from "../lib/supabase";
import { lorcana_cards_table } from "../lib/table_names";
import filterQuery from "../utils/filterQuery";

export default async function findCardsOfClassificationMentioned(
  selectedCard: CardType,
  searchParams: URLSearchParams,
  classification: string
): Promise<CardType[]> {
  const classificationLowerCase = classification.toLowerCase();
  const mentionsClassification: boolean =
    selectedCard[`mentions_${classificationLowerCase}`];

        const showLimit = import.meta.env.VITE_SHOW_LIMIT

  if (!mentionsClassification) {
    return [];
  }

  let query = supabase.from(lorcana_cards_table).select("*");

  query = query.contains("classifications", [classification]);

  query = filterQuery(searchParams, query);

      query = query.limit(showLimit)

  const { data, error } = await query;


  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}
