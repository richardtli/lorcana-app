// src/App.tsx (or any component file)
import { useEffect, useState, type JSX } from "react";
import type { CardType } from "../types/card";
import CardThumbnail from "../Components/CardThumbnail";
import { supabase } from "../lib/supabase";
import { lorcana_cards_table } from "../lib/table_names";



export default function LookAtAllCards() {
    const [cardsArray, setCardsArray] = useState<CardType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchCards = async () => {
        setLoading(true);
        const { data, error } = await supabase.from(lorcana_cards_table).select("*");
        if (error) {
            console.error(error);
            setCardsArray([]);
        } else {
            setCardsArray(data ?? []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCards();
    }, []);



    const CardElementsArray: JSX.Element[]= cardsArray.map((card: CardType) => {
        return (<CardThumbnail card={card}/>)
    })
    
    if (loading) return <div>Loading...</div>;

    return (
        <div className='cards-display-container'>
            {CardElementsArray}
        </div>
    );
}
