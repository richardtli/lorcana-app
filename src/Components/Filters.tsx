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

  const sortValue = searchParams.get("sort") ?? "";

  const franchiseSelected = searchParams.get("franchise") === thisFranchise;

function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>) {
  const value = event.target.value;

  setSearchParams((currentParams) => {
    const nextParams = new URLSearchParams(currentParams);

    if (value) {
      nextParams.set("sort", value);
    } else {
      nextParams.delete("sort");
    }

    return nextParams;
  });
}
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
        key={color}
        onClick={() => toggleInk(color)}
        className={classNames("ink-icon", {
          selected: selectedColors.includes(color),
        })}
        data-ink-color={color.toLowerCase()}
        src={inkIconMap[color]}
        alt={`${color} Ink`}
      />
    );
  });

  return (
    <div className="filters-bar">
<button
  className={classNames("filter-button", {
    selected: franchiseSelected,
  })}
  onClick={toggleFranchise}
>
  From this Franchise
</button>
      <div className="ink-buttons-container">{iconElements}</div>
        <select value={sortValue} onChange={handleSortChange}>
            <option value="">Default</option>
            <option value="name_asc">Name A-Z</option>
            <option value="name_desc">Name Z-A</option>
        </select>
    </div>
  );
}
