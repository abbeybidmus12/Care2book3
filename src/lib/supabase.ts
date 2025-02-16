import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

// New function to fetch data from a specific table
export async function fetchData(table: string) {
  const { data, error } = await supabase.from(table).select("*");
  if (error) {
    console.error("Error fetching data:", error);
    return null;
  }
  return data;
}
