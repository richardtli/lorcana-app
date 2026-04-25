import { useEffect, useState, type JSX } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import type { CardType } from "../types/card";
import { createClient } from "@supabase/supabase-js";
import CardData from "../Components/CardData";
import Synergies from "../Components/Synergies";
import Filters from "../Components/Filters";

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL!,
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY!,
);

export default function CardPage(): JSX.Element | null{
    const { id } = useParams()
    const [cardData, setCardData] = useState<null | CardType>(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [relatedCardObjects, setRelatedCardObjects] = useState<CardType[]>([])

    async function getCardData(){
        const { data, error } = await supabase
            .from("lorcana_cards")
            .select("*")
            .eq("unique_id", id)
            .maybeSingle();
        setCardData(data)
    }
    async function getRelatedCards(){
        let query =  supabase.from("lorcana_cards").select("*")
        searchParams.forEach((value, key) => {
        query = query.eq(key, value);
        });
        const { data, error } = await query;

        if (error) {
            console.error(error);
            setRelatedCardObjects([]);
        } else {
            setRelatedCardObjects(data ?? []);
        }
    }
    
    useEffect(()=> {
        getRelatedCards()
    },[searchParams])

    useEffect(() => {
        getCardData()
    },[id])

    if (!cardData) return null;
    if(!relatedCardObjects) return null
    return(
        <>
            <CardData  cardData={cardData} />
            <div className="synergies-section">
                <Filters cardData={cardData}/>
                <Synergies relatedCardObjects={relatedCardObjects} />
            </div>
        </>
        
    )
}