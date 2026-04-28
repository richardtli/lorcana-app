import type { CardType } from "../types/card";
import { supabase } from "../lib/supabase";
import { lorcana_cards_table } from "../lib/table_names";
import filterQuery from "../utils/filterQuery";

export default async function findMentionsOfClassificationCards(
  selectedCard: CardType,
  searchParams: URLSearchParams,
  classification: string
): Promise<CardType[]> {

    const isClassification: boolean = selectedCard.classifications?.includes(classification)
    const classificationLowerCase = classification.toLowerCase()
    const mentionsClassification: boolean = selectedCard[`mentions_${classificationLowerCase}`]


    if(!mentionsClassification && !isClassification){
        return []
    }

let query = supabase
  .from(lorcana_cards_table)
  .select("*");

if (isClassification && mentionsClassification) {
  query = query.or(
    `mentions_${classificationLowerCase}.eq.true,classifications.cs.{${classification}}`,
  );
} else if (isClassification) {
  query = query.eq(`mentions_${classificationLowerCase}`, true);
} else if (mentionsClassification) {
  query = query.contains("classifications", [classification]);
}

    
    query = filterQuery(searchParams, query)


  const { data, error } = await query;

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}