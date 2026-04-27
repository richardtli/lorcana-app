import type { CardType } from "../types/card";
import { supabase } from "../lib/supabase";
import { lorcana_cards_table } from "../lib/table_names";

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
    

  const franchise = searchParams.get("franchise");

  if (franchise) {
    query = query.eq("franchise", franchise);
  }

  const selectedColors = searchParams.getAll("color");

  if (selectedColors.length === 1) {
    query = query.contains("color", [selectedColors[0]]);
  }

  if (selectedColors.length > 1) {
    query = query.overlaps("color", selectedColors);
  }

  const sortValue = searchParams.get("sort");

  if (sortValue === "name_asc") {
    query = query.order("full_name", { ascending: true });
  } else if (sortValue === "name_desc") {
    query = query.order("full_name", { ascending: false });
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}