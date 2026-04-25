import { useSearchParams } from "react-router-dom";
import type { CardType } from "../types/card";

type CardDataProps = {
  cardData: CardType;
};


export default function Filters({cardData}: CardDataProps){

    const [searchParams, setSearchParams] = useSearchParams()

    const thisFranchise = cardData.franchise
    function toggleFranchise() {
        setSearchParams((currentParams) => {
        const nextParams = new URLSearchParams(currentParams);

        if (nextParams.get("franchise") === thisFranchise) {
            nextParams.delete("franchise");
        } else {
            nextParams.set("franchise", thisFranchise);
        }

        return nextParams;
    });
  }
    return (<>
        <button className='filter-button'onClick={toggleFranchise}>From this Franchise</button>
    </>)
}