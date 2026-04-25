import classNames from "classnames";
import { useSearchParams } from "react-router-dom";
import type { CardType } from "../types/card";
import amberInk from "../assets/ink-icons/amber-ink.png";
import amethystInk from "../assets/ink-icons/amethyst-ink.png";
import emeraldInk from "../assets/ink-icons/emerald-ink.png";
import rubyInk from "../assets/ink-icons/ruby-ink.png";
import sapphireInk from "../assets/ink-icons/sapphire-ink.png";
import steelInk from "../assets/ink-icons/steel-ink.png";

type CardDataProps = {
  cardData: CardType;
};

const inkColors = [
  "Amber",
  "Amethyst",
  "Emerald",
  "Ruby",
  "Sapphire",
  "Steel",
] as const;
const inkIconMap = {
  Amber: amberInk,
  Amethyst: amethystInk,
  Emerald: emeraldInk,
  Ruby: rubyInk,
  Sapphire: sapphireInk,
  Steel: steelInk,
};

export default function Filters({ cardData }: CardDataProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedColors = searchParams.getAll("color");

  const thisFranchise = cardData.franchise;
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

  function toggleInk(color: string) {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);
      const currentColors = nextParams.getAll("color");

      if (currentColors.includes(color)) {
        nextParams.delete("color");

        currentColors
          .filter((currentColor) => currentColor !== color)
          .forEach((remainingColor) =>
            nextParams.append("color", remainingColor),
          );
      } else {
        nextParams.append("color", color);
      }

      return nextParams;
    });
  }
  const iconElements = inkColors.map((color) => {
    return (
      <img
        onClick={() => toggleInk(color)}
       className={classNames("ink-icon", {
        selected: selectedColors.includes(color),
      })}
        src={inkIconMap[color]}
        alt={`${color} Ink`}
      />
    );
  });

  return (
    <div className="filters-bar">
      <button className="filter-button" onClick={toggleFranchise}>
        From this Franchise
      </button>
      <div className="ink-buttons-container">{iconElements}</div>
    </div>
  );
}
