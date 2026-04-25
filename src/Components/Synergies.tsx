import { useEffect, useState, type JSX } from "react"
import type { CardType } from "../types/card"
import { createClient } from "@supabase/supabase-js";
import { useSearchParams } from "react-router-dom";
import CardThumbnail from "./CardThumbnail";

type CardDataProps = {
  cardData: CardType;
};

export default function Synergies({cardData}: CardDataProps){

    const [searchParams, setSearchParams] = useSearchParams()
    const [relatedCardObjects, setRelatedCardObjects] = useState<CardType[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const paramsObject = Object.fromEntries(searchParams.entries());
    const franchise = searchParams.get("franchise");

    async function getCards(){
        const supabase = createClient(
            import.meta.env.VITE_SUPABASE_URL!,
            import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY!,
        );
        setLoading(true);
        const { data, error } = await supabase.from("lorcana_cards").select("*").eq("franchise", franchise);
        if (error) {
            console.error(error);
            setRelatedCardObjects([]);
        } else {
            setRelatedCardObjects(data ?? []);
        }
        setLoading(false);
    }

    useEffect(()=> {
        getCards()
    },[searchParams])

    function toggleFranchiseFilter() {
        setSearchParams((currentParams) => {
            const nextParams = new URLSearchParams(currentParams);

            if (nextParams.get("franchise") === cardData.franchise) {
                nextParams.delete("franchise");
            } else {
                nextParams.set("franchise", cardData.franchise);
            }

            return nextParams;
        });
}


    const CardElementsArray: JSX.Element[]= relatedCardObjects.map((card: CardType) => {
            return (<CardThumbnail {...card}/>)
        })


    if(loading) return null
    return (
        <>
       <button onClick={toggleFranchiseFilter}>
    {franchise === cardData.franchise
        ? `Remove ${cardData.franchise} filter`
        : `Filter by ${cardData.franchise}`}
</button>
            {CardElementsArray}
        </>
    )
}