import { useEffect, useState, type JSX } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import type { CardType } from "../types/card";
import CardData from "../Components/CardData";
import SynergiesDisplay from "../Components/SynergiesDisplay";
import Filters from "../Components/Filters";
import { supabase } from "../lib/supabase";
import { lorcana_cards_table } from "../lib/table_names";
import type { SynergySection } from "../types/synergysectiontype";
import findShiftIntoCards from "../synergies/findShiftIntoCards";
import findShiftFromCards from "../synergies/findShiftFromCards";
import findPartnerCards from "../synergies/findPartnerCards";
import findSongsForMeCards from "../synergies/findSongsForMeCards";
import findSingersForMeCards from "../synergies/findSingersForMeCards";
import findMentionsPrincessCards from "../synergies/findMentionsPrincessCards";

export default function CardPage(): JSX.Element | null {
  const { id } = useParams();
  const [selectedCard, setSelectedCard] = useState<null | CardType>(null);
  const [searchParams] = useSearchParams();
  const [synergySectionsArray, setSynergySectionsArray] = useState<
    SynergySection[]
  >([]);

  async function getAllCards() {
    const card = await getSelectedCardData();

    if (card) {
      await getAllSynergySections(card);
    }
  }

  async function getAllSynergySections(selectedCard: CardType) {
    const shiftIntoCards = await findShiftIntoCards(selectedCard, searchParams);
    const shiftFromCards = await findShiftFromCards(selectedCard, searchParams)
    const partnerCards = await findPartnerCards(selectedCard, searchParams)
    const songsForMeCards = await findSongsForMeCards(selectedCard, searchParams)
    const singersForMeCards = await findSingersForMeCards(selectedCard, searchParams)
    const mentionsPrincessCards = await findMentionsPrincessCards(selectedCard, searchParams)



    const sections: SynergySection[] = [
      {
        synergyName: "Shifts Into",
        cards: shiftIntoCards,
      },
      {
        synergyName: 'Shifts From',
        cards: shiftFromCards
      },
      {
        synergyName: 'Partners',
        cards: partnerCards
      },
      {
        synergyName: 'Songs for Me',
        cards: songsForMeCards
      },
      {
        synergyName: 'Singers for Me',
        cards: singersForMeCards
      },
      {
        synergyName: 'Princess Power',
        cards: mentionsPrincessCards
      }

    ];

    setSynergySectionsArray(sections);
  }

  async function getSelectedCardData(): Promise<CardType | null> {
    const { data, error } = await supabase
      .from(lorcana_cards_table)
      .select("*")
      .eq("unique_id", id)
      .maybeSingle();
    console.log(data)

    if (error || !data) {
      console.error(error);
      setSelectedCard(null);
      return null;
    }

    setSelectedCard(data);
    return data;
  }

  useEffect(() => {
    getAllCards();
  }, [id, searchParams]);

  if (!selectedCard || !synergySectionsArray) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <CardData cardData={selectedCard} />
      <div className="synergies-section">
        <Filters cardData={selectedCard} />
        <SynergiesDisplay synergySectionsArray={synergySectionsArray} />
      </div>
    </>
  );
}
