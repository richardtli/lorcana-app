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

const sortOptions = [
  { value: "name_asc", label: "Name: A to Z" },
  { value: "name_desc", label: "Name: Z to A" },
  { value: "cost_asc", label: "Cost: Low to High" },
  { value: "cost_desc", label: "Cost: High to Low" },
  { value: "set_num_asc", label: "Set Number: Low to High" },
  { value: "set_num_desc", label: "Set Number: High to Low" },
];

function getSortCategory(sortValue: string) {
  return sortValue.split("_")[0];
}

function getAvailableSortOptions(selectedSortValues: string[]) {
  const selectedSortCategories = selectedSortValues
    .filter(Boolean)
    .map(getSortCategory);

  return sortOptions.filter(
    (option) => !selectedSortCategories.includes(getSortCategory(option.value)),
  );
}

export default function Filters({ cardData }: CardDataProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedColors = searchParams.getAll("color");

  const thisFranchise = cardData.franchise;

  const sortValue = searchParams.get("sort") ?? "";
  const secondarySortValue = searchParams.get("secondarySort") ?? "";
  const tertiarySortValue = searchParams.get("tertiarySort") ?? "";
  const secondarySortOptions = getAvailableSortOptions([sortValue]);
  const tertiarySortOptions = getAvailableSortOptions([
    sortValue,
    secondarySortValue,
  ]);

  const franchiseSelected = searchParams.get("franchise") === thisFranchise;

function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>) {
  const value = event.target.value;

  setSearchParams((currentParams) => {
    const nextParams = new URLSearchParams(currentParams);

    if (value) {
      nextParams.set("sort", value);

      if (
        getSortCategory(nextParams.get("secondarySort") ?? "") ===
        getSortCategory(value)
      ) {
        nextParams.delete("secondarySort");
      }

      if (
        getSortCategory(nextParams.get("tertiarySort") ?? "") ===
        getSortCategory(value)
      ) {
        nextParams.delete("tertiarySort");
      }
    } else {
      nextParams.delete("sort");
      nextParams.delete("secondarySort");
      nextParams.delete("tertiarySort");
    }

    return nextParams;
  });
}

function handleSecondarySortChange(event: React.ChangeEvent<HTMLSelectElement>) {
  const value = event.target.value;

  setSearchParams((currentParams) => {
    const nextParams = new URLSearchParams(currentParams);

    if (value && nextParams.get("sort")) {
      nextParams.set("secondarySort", value);

      if (
        getSortCategory(nextParams.get("tertiarySort") ?? "") ===
        getSortCategory(value)
      ) {
        nextParams.delete("tertiarySort");
      }
    } else {
      nextParams.delete("secondarySort");
      nextParams.delete("tertiarySort");
    }

    return nextParams;
  });
}

function handleTertiarySortChange(event: React.ChangeEvent<HTMLSelectElement>) {
  const value = event.target.value;

  setSearchParams((currentParams) => {
    const nextParams = new URLSearchParams(currentParams);

    if (value && nextParams.get("sort") && nextParams.get("secondarySort")) {
      nextParams.set("tertiarySort", value);
    } else {
      nextParams.delete("tertiarySort");
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
        <div className="sort-selects-container">
        <select value={sortValue} onChange={handleSortChange}>
            <option value="">{sortValue ? "Remove Primary Sort" : "Primary Sort"}</option>
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
        <select
          value={sortValue ? secondarySortValue : ""}
          onChange={handleSecondarySortChange}
          disabled={!sortValue}
        >
            <option value="">{secondarySortValue ? "Remove Secondary Sort" : "Secondary Sort"}</option>
            {secondarySortOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
        <select
          value={sortValue && secondarySortValue ? tertiarySortValue : ""}
          onChange={handleTertiarySortChange}
          disabled={!sortValue || !secondarySortValue}
        >
            <option value="">{tertiarySortValue ? "Remove Tertiary Sort" : "Tertiary Sort"}</option>
            {tertiarySortOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
        </div>
    </div>
  );
}
