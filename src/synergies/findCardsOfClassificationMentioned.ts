import type { CardType } from "../types/card";
import type { SynergyCardsResult } from "../types/synergysectiontype";
import { supabase } from "../lib/supabase";
import { lorcana_cards_table } from "../lib/table_names";
import filterQuery from "../utils/filterQuery";

export default async function findCardsOfClassificationMentioned(
  selectedCard: CardType,
  searchParams: URLSearchParams,
  classification: string
): Promise<SynergyCardsResult> {
  const classificationLowerCase = classification.toLowerCase();
  const mentionsClassificationKey = `mentions_${classificationLowerCase}` as keyof CardType;
  const mentionsClassification: boolean =
    Boolean(selectedCard[mentionsClassificationKey]);

        const showLimit = import.meta.env.VITE_SHOW_LIMIT

  if (!mentionsClassification) {
    return { cards: [], totalCards: 0 };
  }

  let query = supabase.from(lorcana_cards_table).select("*", { count: "exact" });

  query = query.contains("classifications", [classification]);

  query = filterQuery(searchParams, query);

      query = query.limit(showLimit)

  const { data, count, error } = await query;


  if (error) {
    console.error(error);
    return { cards: [], totalCards: 0 };
  }

  return { cards: data ?? [], totalCards: count ?? 0 };
}
