import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { supabase } from "./supabase";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fillShiftAddresses() {
  const { data, error } = await supabase.rpc("fill_shift_addresses");
  if (error) throw error;
  return data;
}
