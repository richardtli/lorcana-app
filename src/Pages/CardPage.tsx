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
import findCardsLookingForMyClassification from "../synergies/findCardsLookingForMyClassification";
import findCardsOfClassificationMentioned from "../synergies/findCardsOfClassificationMentioned";
import { LORCANA_CLASSIFICATIONS } from "../utils/classificationsArray";


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

const cardsLookingForMyClassificationsToSynergySection = await Promise.all(
  LORCANA_CLASSIFICATIONS.map(async (classification) => {
    const result = await findCardsLookingForMyClassification(
      selectedCard,
      searchParams,
      classification,
    );

    return {
      synergyName: `Cards looking for ${classification}s`,
      cards: result.cards,
      totalCards: result.totalCards,
    };
  }),
);

const cardsOfClassificationsMentionedToSynergySection = await Promise.all(
  LORCANA_CLASSIFICATIONS.map(async (classification) => {
    const result = await findCardsOfClassificationMentioned(
      selectedCard,
      searchParams,
      classification,
    );

    return {
      synergyName: `${classification}s I'm Looking For`,
      cards: result.cards,
      totalCards: result.totalCards,
    };
  }),
);

const sections: SynergySection[] = [
  {
    synergyName: "Shifts Into",
    cards: shiftIntoCards,
    totalCards: shiftIntoCards.length,
  },
  {
    synergyName: "Shifts From",
    cards: shiftFromCards,
    totalCards: shiftFromCards.length,
  },
  {
    synergyName: "Partners",
    cards: partnerCards,
    totalCards: partnerCards.length,
  },
  {
    synergyName: "Songs for Me",
    cards: songsForMeCards,
    totalCards: songsForMeCards.length,
  },
  {
    synergyName: "Singers for Me",
    cards: singersForMeCards,
    totalCards: singersForMeCards.length,
  },
  ...cardsOfClassificationsMentionedToSynergySection,
  ...cardsLookingForMyClassificationsToSynergySection,
  
];

setSynergySectionsArray(sections);
  }

  async function getSelectedCardData(): Promise<CardType | null> {
    const { data, error } = await supabase
      .from(lorcana_cards_table)
      .select("*")
      .eq("unique_id", id)
      .maybeSingle();
    //console.log(data)

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

  const visibleSynergyNames = synergySectionsArray
    .filter((section) => section.cards.length > 0)
    .map((section) => section.synergyName);

  return (
    <div className="card-page-layout">
      <CardData cardData={selectedCard} synergyNames={visibleSynergyNames} />
      <div className="synergies-section">
        <Filters cardData={selectedCard} />
        <SynergiesDisplay synergySectionsArray={synergySectionsArray} />
      </div>
    </div>
  );
}
