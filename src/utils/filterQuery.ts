import type { PostgrestFilterBuilder } from "@supabase/supabase-js";

type FilterQueryBuilder = PostgrestFilterBuilder<any, any, any, any>;

function applySort(query: FilterQueryBuilder, sortValue: string | null): FilterQueryBuilder {
  if (sortValue === "name_asc") {
    return query.order("base_name", { ascending: true });
  }

  if (sortValue === "name_desc") {
    return query.order("base_name", { ascending: false });
  }

  if (sortValue === "cost_asc") {
    return query.order("cost", { ascending: true });
  }

  if (sortValue === "cost_desc") {
    return query.order("cost", { ascending: false });
  }

  if (sortValue === "set_num_asc") {
    return query.order("set_num", { ascending: true });
  }

  if (sortValue === "set_num_desc") {
    return query.order("set_num", { ascending: false });
  }

  return query;
}

function getSortCategory(sortValue: string) {
  return sortValue.split("_")[0];
}

export default function filterQuery(searchParams: URLSearchParams, query: FilterQueryBuilder): FilterQueryBuilder{
      const franchise = searchParams.get("franchise");

  if (franchise) {
    query = query.eq("franchise", franchise);
  }

  const selectedColors = searchParams.getAll("color");

  if (selectedColors.length === 1) {
    query = query.contains("color", [selectedColors[0]]);
  }

  if (selectedColors.length > 1) {
    query = query.overlaps("color", selectedColors);
  }

  const sortValue = searchParams.get("sort");
  const secondarySortValue = searchParams.get("secondarySort");
  const tertiarySortValue = searchParams.get("tertiarySort");

  query = applySort(query, sortValue);

  if (
    sortValue &&
    secondarySortValue &&
    getSortCategory(sortValue) !== getSortCategory(secondarySortValue)
  ) {
    query = applySort(query, secondarySortValue);
  }

  if (
    sortValue &&
    secondarySortValue &&
    tertiarySortValue &&
    getSortCategory(tertiarySortValue) !== getSortCategory(sortValue) &&
    getSortCategory(tertiarySortValue) !== getSortCategory(secondarySortValue)
  ) {
    query = applySort(query, tertiarySortValue);
  }
  return query
}
