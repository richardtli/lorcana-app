// src/App.tsx (or any component file)
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState, type JSX } from "react";
import type { CardType } from "../types/card";
import Card from "../Components/Card";

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL!,
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY!,
);



export default function LookAtAllCards() {
    const [cardsArray, setCardsArray] = useState<CardType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchCards = async () => {
        setLoading(true);
        const { data, error } = await supabase.from("lorcana_cards").select("*");
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
        return (<Card {...card}/>)
    })
    
    if (loading) return <div>Loading...</div>;

    return (
        <div>
            {CardElementsArray}
        </div>
    );
}
