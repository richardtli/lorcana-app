import { useEffect, useState, type JSX } from "react";
import { data, useParams } from "react-router-dom";
import type { CardType } from "../types/card";
import { createClient } from "@supabase/supabase-js";
import CardData from "../Components/CardData";
import Synergies from "../Components/Synergies";

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL!,
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY!,
);

export default function CardPage(): JSX.Element | null{
    const { id } = useParams()
    const [cardData, setCardData] = useState<null | CardType>(null)

    async function getCardData(){
        const { data, error } = await supabase
            .from("lorcana_cards")
            .select("*")
            .eq("unique_id", id)
            .maybeSingle();
        setCardData(data)
    }

    useEffect(() => {
        getCardData()
    },[id])

    if (!cardData) return null;
    return(
        <>
            <CardData  cardData={cardData} />
            <Synergies cardData={cardData}/>
        </>
        
    )
}