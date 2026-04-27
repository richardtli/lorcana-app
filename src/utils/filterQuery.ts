import type { PostgrestFilterBuilder } from "@supabase/supabase-js";



export default function filterQuery(searchParams: URLSearchParams, query): PostgrestFilterBuilder{
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

  if (sortValue === "name_asc") {
    query = query.order("full_name", { ascending: true });
  } else if (sortValue === "name_desc") {
    query = query.order("full_name", { ascending: false });
  }
  return query
}