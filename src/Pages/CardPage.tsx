import { useEffect, useState, type JSX } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import type { CardType } from "../types/card";
import CardData from "../Components/CardData";
import Synergies from "../Components/Synergies";
import Filters from "../Components/Filters";
import { supabase } from "../lib/supabase";
import { lorcana_cards_table } from "../lib/table_names";

export default function CardPage(): JSX.Element | null {
  const QUERY_LIMIT = 1000;
  const { id } = useParams();
  const [cardData, setCardData] = useState<null | CardType>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [relatedCardObjects, setRelatedCardObjects] = useState<CardType[]>([]);

  async function getCardData() {
    const { data, error } = await supabase
      .from(lorcana_cards_table)
      .select("*")
      .eq("unique_id", id)
      .maybeSingle();
    setCardData(data);
    console.log(data);
  }

  async function getRelatedCards() {
    let query = supabase.from(lorcana_cards_table).select("*");

    const selectedColors = searchParams.getAll("color");

    searchParams.forEach((value, key) => {
      if (key !== "color" && key !== "sort") {
        query = query.eq(key, value);
      }
    });

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

    const { data, error } = await query.limit(QUERY_LIMIT);

    if (error) {
      console.error(error);
      setRelatedCardObjects([]);
    } else {
      setRelatedCardObjects(data ?? []);
    }
  }

  useEffect(() => {
    getRelatedCards();
  }, [searchParams]);

  useEffect(() => {
    getCardData();
  }, [id]);

  if (!cardData) return null;
  if (!relatedCardObjects) return null;
  return (
    <>
      <CardData cardData={cardData} />
      <div className="synergies-section">
        <Filters cardData={cardData} />
        <Synergies relatedCardObjects={relatedCardObjects} />
      </div>
    </>
  );
}
