import { createClient } from "@supabase/supabase-js";

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, key);

export type Reporte = {
  id:          string;
  lat:         number;
  lng:         number;
  descripcion: string;
  categoria:   string;
  created_at:  string;
};
